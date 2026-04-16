/**
 * Announcement Store
 *
 * Pure JS module for CRUD operations and visibility logic.
 * All data lives in localStorage under `stdom_announcements`.
 *
 * Recurrence types:
 *  - "none"           → visible every day within date range
 *  - "weekly"         → visible on specific weekdays (days: [0–6], 0 = Sunday)
 *  - "first-friday"   → first Friday of each month (day ≤ 7 && weekday === 5)
 *  - "first-saturday" → first Saturday of each month (day ≤ 7 && weekday === 6)
 */

const STORAGE_KEY = "stdom_announcements";
const DISMISSED_KEY = "stdom_dismissed_popups"; // sessionStorage

/* ── Helpers ── */

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/** Parse "YYYY-MM-DD" as a local-midnight Date. */
function parseDate(str) {
  if (!str) return null;
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Today at midnight (no time component). */
function today() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/* ── CRUD ── */

export function getAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function persist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/**
 * Create or update an announcement.
 * If `ann.id` exists in the store, updates it; otherwise creates a new entry.
 */
export function save(ann) {
  const list = getAll();
  const now = new Date().toISOString();
  const idx = list.findIndex((a) => a.id === ann.id);

  if (idx >= 0) {
    list[idx] = { ...list[idx], ...ann, updatedAt: now };
  } else {
    list.push({
      id: generateId(),
      title: "",
      body: "",
      type: "banner",
      linkUrl: "",
      linkText: "Learn More",
      active: true,
      priority: list.length,
      startDate: "",
      endDate: "",
      recurrence: { type: "none", days: [] },
      createdAt: now,
      updatedAt: now,
      ...ann,
    });
  }

  persist(list);
  return list;
}

/** Delete by id. */
export function remove(id) {
  const list = getAll().filter((a) => a.id !== id);
  persist(list);
  return list;
}

/** Re-order by an array of ids (index = new priority). */
export function reorder(orderedIds) {
  const list = getAll();
  const byId = Object.fromEntries(list.map((a) => [a.id, a]));
  const reordered = orderedIds
    .map((id, i) => (byId[id] ? { ...byId[id], priority: i } : null))
    .filter(Boolean);
  // Append any items not in orderedIds (shouldn't happen, but safety)
  const seen = new Set(orderedIds);
  list.forEach((a) => {
    if (!seen.has(a.id)) reordered.push({ ...a, priority: reordered.length });
  });
  persist(reordered);
  return reordered;
}

/* ── Visibility ── */

/**
 * Check if a single announcement should be visible right now.
 * @param {object} ann - announcement object
 * @param {Date} [date] - override for "now" (defaults to today)
 */
export function isVisible(ann, date) {
  if (!ann.active) return false;

  const d = date || today();
  const start = parseDate(ann.startDate);
  const end = parseDate(ann.endDate);

  if (start && d < start) return false;
  if (end && d > end) return false;

  const rec = ann.recurrence || { type: "none", days: [] };

  switch (rec.type) {
    case "none":
      return true;
    case "weekly":
      return Array.isArray(rec.days) && rec.days.includes(d.getDay());
    case "first-friday":
      return d.getDay() === 5 && d.getDate() <= 7;
    case "first-saturday":
      return d.getDay() === 6 && d.getDate() <= 7;
    default:
      return true;
  }
}

/**
 * Get currently-visible announcements, sorted by priority (lower = first).
 * @param {"banner"|"popup"} [type] - filter by display type
 * @param {Date} [date] - override for "now"
 */
export function getVisible(type, date) {
  return getAll()
    .filter((a) => isVisible(a, date))
    .filter((a) => !type || a.type === type)
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
}

/* ── Popup dismiss (sessionStorage) ── */

export function getDismissedPopups() {
  try {
    return JSON.parse(sessionStorage.getItem(DISMISSED_KEY)) || [];
  } catch {
    return [];
  }
}

export function dismissPopup(id) {
  const dismissed = getDismissedPopups();
  if (!dismissed.includes(id)) {
    dismissed.push(id);
    sessionStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissed));
  }
}

/**
 * Get the top popup that should currently display (not yet dismissed).
 */
export function getActivePopup(date) {
  const dismissed = new Set(getDismissedPopups());
  const visible = getVisible("popup", date);
  return visible.find((a) => !dismissed.has(a.id)) || null;
}

/**
 * Get the top banner that should currently display.
 */
export function getActiveBanner(date) {
  const visible = getVisible("banner", date);
  return visible[0] || null;
}

/* ── Status helpers (for admin dashboard) ── */

/**
 * Returns a human-readable status for an announcement.
 */
export function getStatus(ann) {
  if (!ann.active) return "inactive";
  const d = today();
  const start = parseDate(ann.startDate);
  const end = parseDate(ann.endDate);

  if (start && d < start) return "scheduled";
  if (end && d > end) return "expired";
  if (isVisible(ann)) return "live";
  // In date range but recurrence hides it today
  return "scheduled";
}

/**
 * Human-readable recurrence description.
 */
export function describeRecurrence(rec) {
  if (!rec) return "Every day";
  switch (rec.type) {
    case "none":
      return "Every day in range";
    case "weekly": {
      const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayNames = (rec.days || []).sort().map((d) => names[d]);
      return dayNames.length ? `Every ${dayNames.join(", ")}` : "No days selected";
    }
    case "first-friday":
      return "First Friday of each month";
    case "first-saturday":
      return "First Saturday of each month";
    default:
      return "Every day";
  }
}
