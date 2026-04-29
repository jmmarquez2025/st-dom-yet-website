const DAY_BY_KEY = {
  sunday: 0,
  sundayEspanol: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  saturdayVigil: 6,
};

const MASS_TIME_RE = /\b\d{1,2}(?::\d{2})?\s*(?:AM|PM)\b/gi;

export function parseMassTime(str) {
  const match = String(str || "").match(/\b(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\b/i);
  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2] || 0);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return { hours, minutes };
}

export function extractMassTimes(text) {
  return String(text || "").match(MASS_TIME_RE) || [];
}

export function expandMassSchedule(schedule) {
  const rows = [
    ...(schedule?.sundayMass || []),
    ...(schedule?.dailyMass || []),
  ];
  const seen = new Set();
  const masses = [];

  rows.forEach(([dayKey, timeText]) => {
    const day = DAY_BY_KEY[dayKey];
    if (day === undefined) return;

    extractMassTimes(timeText).forEach((timeStr) => {
      const parsed = parseMassTime(timeStr);
      if (!parsed) return;

      const key = `${dayKey}:${timeStr}`;
      if (seen.has(key)) return;
      seen.add(key);

      masses.push({ day, dayKey, timeStr, ...parsed });
    });
  });

  return masses.sort((a, b) => a.day - b.day || (a.hours * 60 + a.minutes) - (b.hours * 60 + b.minutes));
}

export function getNextMassFromSchedule(schedule, now = new Date()) {
  const masses = expandMassSchedule(schedule);
  if (masses.length === 0) return null;

  const currentDay = now.getDay();
  for (let offset = 0; offset < 8; offset += 1) {
    const targetDay = (currentDay + offset) % 7;
    const dayMasses = masses.filter((mass) => mass.day === targetDay);

    for (const mass of dayMasses) {
      const massDate = new Date(now);
      massDate.setDate(massDate.getDate() + offset);
      massDate.setHours(mass.hours, mass.minutes, 0, 0);

      if (massDate > now) {
        return { date: massDate, label: mass.dayKey, timeStr: mass.timeStr };
      }
    }
  }

  return null;
}
