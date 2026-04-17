/**
 * Mass Schedule Store
 *
 * Stores 4 arrays — sundayMass, dailyMass, confession, adoration —
 * each an array of [dayKey, time] tuples.
 *
 * If present in localStorage, overrides the static data on MassTimes page.
 */

const STORAGE_KEY = "stdom_schedule";

export const CATEGORIES = [
  { key: "sundayMass", label: "Sunday Mass" },
  { key: "dailyMass", label: "Daily Mass" },
  { key: "confession", label: "Confession" },
  { key: "adoration", label: "Adoration" },
];

export const DAY_KEYS = [
  "sunday",
  "sundayEspanol",
  "monday",
  "tuesday",
  "tuesdayEveningPrayer",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "saturdayVigil",
];

export const DAY_LABELS = {
  sunday: "Sunday",
  sundayEspanol: "Sunday (Español)",
  monday: "Monday",
  tuesday: "Tuesday",
  tuesdayEveningPrayer: "Tuesday (Evening Prayer)",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  saturdayVigil: "Saturday (Vigil)",
};

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

export function saveCategory(key, rows) {
  const current = getAll() || {};
  current[key] = rows;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return current;
}

export function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Load merged data: admin overrides if present, else fallback.
 * fallback is an object with the 4 arrays.
 */
export function getMerged(fallback) {
  const stored = getAll();
  if (!stored) return fallback;
  return {
    sundayMass: stored.sundayMass || fallback.sundayMass,
    dailyMass: stored.dailyMass || fallback.dailyMass,
    confession: stored.confession || fallback.confession,
    adoration: stored.adoration || fallback.adoration,
  };
}
