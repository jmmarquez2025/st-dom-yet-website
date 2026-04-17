/**
 * Events Store
 *
 * localStorage-based store for admin-managed events.
 * If entries exist, the public Events page uses these; otherwise
 * it falls back to the Google Sheets CMS or the bundled static data.
 *
 * Shape: { id, date, title, description, category, time, location, createdAt, updatedAt }
 * Categories: mass | sacrament | education | social | prayer | other
 */

const STORAGE_KEY = "stdom_events";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getAll() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return raw.sort((a, b) => (a.date < b.date ? -1 : 1));
  } catch {
    return [];
  }
}

export function hasAny() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(raw) && raw.length > 0;
  } catch {
    return false;
  }
}

function persist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function save(entry) {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const now = new Date().toISOString();
  const idx = list.findIndex((e) => e.id === entry.id);

  if (idx >= 0) {
    list[idx] = { ...list[idx], ...entry, updatedAt: now };
  } else {
    list.push({
      id: generateId(),
      date: "",
      title: "",
      description: "",
      category: "other",
      time: "",
      location: "",
      createdAt: now,
      updatedAt: now,
      ...entry,
    });
  }

  persist(list);
  return list.sort((a, b) => (a.date < b.date ? -1 : 1));
}

export function remove(id) {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]").filter(
    (e) => e.id !== id
  );
  persist(list);
  return list;
}

export const CATEGORIES = [
  { value: "mass", label: "Mass" },
  { value: "sacrament", label: "Sacrament" },
  { value: "education", label: "Education" },
  { value: "social", label: "Social" },
  { value: "prayer", label: "Prayer" },
  { value: "other", label: "Other" },
];
