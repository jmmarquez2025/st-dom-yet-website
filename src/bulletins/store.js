/**
 * Bulletin Store
 *
 * localStorage-based store for the admin-managed bulletin system.
 *
 * Manages two things:
 *  1. Current bulletin URL — the FlipHTML5 embed for the iframe on the Bulletin page.
 *  2. Archive — ordered list of past bulletins { id, date, label, url }.
 *
 * Priority on the public Bulletin page:
 *  - If localStorage has data, it is used (admin-managed, most current).
 *  - Otherwise, falls back to Google Sheets CMS or static file.
 */

const ARCHIVE_KEY = "stdom_bulletin_archive";
const CURRENT_URL_KEY = "stdom_bulletin_current_url";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/* ── Current bulletin URL ── */

/** Get the admin-set current bulletin URL, or null if not set. */
export function getCurrentUrl() {
  try {
    return localStorage.getItem(CURRENT_URL_KEY) || null;
  } catch {
    return null;
  }
}

/** Save the current bulletin URL. Pass empty string to clear it. */
export function setCurrentUrl(url) {
  try {
    if (url && url.trim()) {
      localStorage.setItem(CURRENT_URL_KEY, url.trim());
    } else {
      localStorage.removeItem(CURRENT_URL_KEY);
    }
  } catch {
    /* ignore */
  }
}

/* ── Archive CRUD ── */

/** Get all archive entries, sorted newest-first by date. */
export function getArchive() {
  try {
    const raw = JSON.parse(localStorage.getItem(ARCHIVE_KEY)) || [];
    return raw.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    return [];
  }
}

/** Returns true if the admin has ever saved any archive entries. */
export function hasArchive() {
  try {
    const raw = JSON.parse(localStorage.getItem(ARCHIVE_KEY));
    return Array.isArray(raw) && raw.length > 0;
  } catch {
    return false;
  }
}

function persistArchive(list) {
  localStorage.setItem(ARCHIVE_KEY, JSON.stringify(list));
}

/**
 * Create or update an archive entry.
 * If entry.id exists, updates; otherwise creates a new one.
 * Returns the updated archive sorted newest-first.
 */
export function saveEntry(entry) {
  const list = JSON.parse(localStorage.getItem(ARCHIVE_KEY) || "[]");
  const now = new Date().toISOString();
  const idx = list.findIndex((b) => b.id === entry.id);

  if (idx >= 0) {
    list[idx] = { ...list[idx], ...entry, updatedAt: now };
  } else {
    list.push({
      id: generateId(),
      date: "",
      label: "",
      url: "",
      createdAt: now,
      updatedAt: now,
      ...entry,
    });
  }

  persistArchive(list);
  return list.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Delete an archive entry by id. Returns updated archive. */
export function removeEntry(id) {
  const list = JSON.parse(localStorage.getItem(ARCHIVE_KEY) || "[]").filter(
    (b) => b.id !== id
  );
  persistArchive(list);
  return list.sort((a, b) => (a.date < b.date ? 1 : -1));
}
