/**
 * Ministries Store
 *
 * Array of { id, icon, key, title, description }.
 * If stored, overrides src/data/ministries.js on the public GetInvolved page.
 *
 * title/description are optional overrides — if not provided, the i18n key
 * is used (for backward compatibility with the existing default ministries).
 */

const STORAGE_KEY = "stdom_ministries";

function generateId() {
  return "min-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
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

export function saveAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return list;
}

export function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
}

export function createEmpty() {
  return { id: generateId(), icon: "Heart", key: "", title: "", description: "" };
}
