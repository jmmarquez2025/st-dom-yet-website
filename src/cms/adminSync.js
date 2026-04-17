/**
 * Admin Sync
 * ───────────
 * Two-way sync between localStorage (fast in-browser cache) and a shared
 * Google Sheet via the admin-cms.gs web app.
 *
 *  - pullAll()          — fetch every section from the sheet and hydrate
 *                         localStorage. Called on app mount so a visitor
 *                         on any device sees the latest admin edits.
 *  - push(section)      — debounced, fire-and-forget upload of one section.
 *                         Stores reuse this after they write to localStorage.
 *  - clearRemote()      — wipe every managed section on the sheet.
 *  - getStatus()        — { lastPulledAt, lastPushedAt, pending, error }
 *  - subscribe(fn)      — notify listeners when status changes.
 *
 * Writes require a passphrase token — the same one used to unlock the
 * Staff Dashboard. It's read from sessionStorage "stdom_staff_auth" if
 * present, otherwise the caller can pass it explicitly.
 */

import { CONFIG } from "../constants/config";
import { MANAGED_KEYS } from "../admin/dataManager";

const STATUS_KEY = "stdom_admin_sync_status";
const TOKEN_KEY = "stdom_staff_auth";
const DEBOUNCE_MS = 1500;

const listeners = new Set();
const pushTimers = new Map();
let status = loadStatus();

function loadStatus() {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { lastPulledAt: null, lastPushedAt: null, pending: [], error: null };
}

function saveStatus(patch) {
  status = { ...status, ...patch };
  try {
    localStorage.setItem(STATUS_KEY, JSON.stringify(status));
  } catch {}
  listeners.forEach((fn) => {
    try { fn(status); } catch {}
  });
}

export function getStatus() {
  return status;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function isConfigured() {
  return Boolean(CONFIG.adminCmsUrl);
}

function getToken(explicit) {
  if (explicit) return explicit;
  try {
    return sessionStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

/**
 * Pull every managed section from the sheet and write it to localStorage.
 * Safe to call on every page load — falls back silently if the backend
 * isn't configured or unreachable. Returns the number of sections hydrated.
 */
export async function pullAll() {
  if (!isConfigured()) return 0;
  try {
    const res = await fetch(CONFIG.adminCmsUrl, { method: "GET" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.json();
    if (body.error) throw new Error(body.error);
    const sections = body.sections || {};
    let hydrated = 0;
    Object.entries(sections).forEach(([key, record]) => {
      if (!MANAGED_KEYS.includes(key)) return;
      const data = record && record.data;
      if (typeof data === "string" && data.length > 0) {
        try {
          localStorage.setItem(key, data);
          hydrated += 1;
        } catch {}
      }
    });
    saveStatus({ lastPulledAt: new Date().toISOString(), error: null });
    // Let stores/hooks know fresh data arrived
    try { window.dispatchEvent(new Event("stdom:admin-synced")); } catch {}
    return hydrated;
  } catch (err) {
    saveStatus({ error: `Pull failed: ${err.message || err}` });
    return 0;
  }
}

/**
 * Push one section to the sheet. Debounced per-section so rapid edits
 * collapse into a single network call. Fire-and-forget — the response is
 * not awaited (Apps Script + mode:"no-cors" means the browser can't read
 * it anyway). If the backend isn't configured, this is a no-op.
 */
export function push(section, token) {
  if (!isConfigured()) return;
  if (!MANAGED_KEYS.includes(section)) return;

  // Mark as pending immediately so the UI can show "saving…"
  const pending = Array.from(new Set([...(status.pending || []), section]));
  saveStatus({ pending });

  if (pushTimers.has(section)) clearTimeout(pushTimers.get(section));
  const timer = setTimeout(() => {
    pushTimers.delete(section);
    doPush(section, getToken(token));
  }, DEBOUNCE_MS);
  pushTimers.set(section, timer);
}

/** Flush every pending debounce timer immediately. */
export function flush(token) {
  pushTimers.forEach((timer, section) => {
    clearTimeout(timer);
    pushTimers.delete(section);
    doPush(section, getToken(token));
  });
}

async function doPush(section, token) {
  // null means "deleted locally" — upload empty string so remote matches
  const data = localStorage.getItem(section) ?? "";
  try {
    await fetch(CONFIG.adminCmsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ token, section, data }),
    });
    const remaining = (status.pending || []).filter((s) => s !== section);
    saveStatus({ lastPushedAt: new Date().toISOString(), pending: remaining, error: null });
  } catch (err) {
    saveStatus({ error: `Push failed (${section}): ${err.message || err}` });
  }
}

/** Wipe every managed section on the sheet. */
export async function clearRemote(token) {
  if (!isConfigured()) return { ok: false, reason: "not-configured" };
  try {
    await fetch(CONFIG.adminCmsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ token: getToken(token), action: "clear" }),
    });
    saveStatus({ lastPushedAt: new Date().toISOString(), pending: [], error: null });
    return { ok: true };
  } catch (err) {
    saveStatus({ error: `Clear failed: ${err.message || err}` });
    return { ok: false, reason: err.message };
  }
}

/**
 * Intercept localStorage writes on managed keys so every section store
 * (events, schedule, staff, ministries, settings, bulletins, announcements)
 * automatically syncs without needing to know about this module. Stores
 * keep writing to localStorage exactly as before — we just observe.
 */
let installed = false;
export function installAutoSync() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  const origSet = Storage.prototype.setItem;
  const origRemove = Storage.prototype.removeItem;

  Storage.prototype.setItem = function (key, value) {
    origSet.call(this, key, value);
    if (this === window.localStorage && MANAGED_KEYS.includes(key)) {
      push(key);
    }
  };

  Storage.prototype.removeItem = function (key) {
    origRemove.call(this, key);
    if (this === window.localStorage && MANAGED_KEYS.includes(key)) {
      // Signal a deletion — doPush will send an empty string upstream
      push(key);
    }
  };
}

// Flush any pending writes before the tab closes
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    pushTimers.forEach((timer, section) => {
      clearTimeout(timer);
      pushTimers.delete(section);
      // Use sendBeacon for reliability during unload
      const data = localStorage.getItem(section) ?? "";
      try {
        const payload = JSON.stringify({ token: getToken(), section, data });
        navigator.sendBeacon(CONFIG.adminCmsUrl, payload);
      } catch {}
    });
  });
}
