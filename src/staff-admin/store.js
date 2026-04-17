/**
 * Staff Directory Store
 *
 * Stores { friars: [...], staff: [...] } — each entry { id, name, role, photo }.
 * `role` is either an i18n key (matching defaults) or plain text.
 * If stored, overrides `src/data/staff.js` on the public Staff page.
 */

const STORAGE_KEY = "stdom_staff_directory";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

export function hasAny() {
  return getAll() !== null;
}

export function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
}

export function upsert(group, entry) {
  const current = getAll() || { friars: [], staff: [] };
  const list = [...(current[group] || [])];
  const idx = list.findIndex((e) => e.id === entry.id);
  if (idx >= 0) list[idx] = { ...list[idx], ...entry };
  else list.push({ id: generateId(), name: "", role: "", photo: "", ...entry });
  current[group] = list;
  return saveAll(current);
}

export function remove(group, id) {
  const current = getAll() || { friars: [], staff: [] };
  current[group] = (current[group] || []).filter((e) => e.id !== id);
  return saveAll(current);
}

export function getMerged(fallbackFriars, fallbackStaff) {
  const stored = getAll();
  if (!stored) return { friars: fallbackFriars, staff: fallbackStaff };
  return {
    friars: stored.friars || fallbackFriars,
    staff: stored.staff || fallbackStaff,
  };
}
