import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";

/**
 * Parse a 12-hour time string like "8:00 AM" or "12:00 PM" into
 * { hours24, minutes } for today's Date construction.
 */
function parseTime(str) {
  const [time, period] = str.trim().split(/\s+/);
  let [h, m] = time.split(":").map(Number);
  if (period.toUpperCase() === "PM" && h !== 12) h += 12;
  if (period.toUpperCase() === "AM" && h === 12) h = 0;
  return { hours: h, minutes: m };
}

/**
 * Full weekly Mass schedule. Each entry: [dayOfWeek (0=Sun), timeStr, labelKey]
 * dayOfWeek follows JS Date convention: 0=Sun, 1=Mon … 6=Sat
 */
const SCHEDULE = [
  // Saturday Vigil
  [6, "5:00 PM", "saturdayVigil"],
  // Saturday morning
  [6, "8:00 AM", "saturday"],
  // Sunday
  [0, "8:00 AM", "sunday"],
  [0, "10:30 AM", "sunday"],
  [0, "1:00 PM", "sundayEspanol"],
  // Mon–Fri
  [1, "8:00 AM", "monday"],
  [1, "12:00 PM", "monday"],
  [2, "8:00 AM", "tuesday"],
  [2, "12:00 PM", "tuesday"],
  [3, "8:00 AM", "wednesday"],
  [3, "12:00 PM", "wednesday"],
  [4, "8:00 AM", "thursday"],
  [4, "12:00 PM", "thursday"],
  [5, "8:00 AM", "friday"],
  [5, "12:00 PM", "friday"],
];

/**
 * Find the next upcoming Mass from right now.
 * Returns { date: Date, label: string, timeStr: string }
 */
function getNextMass() {
  const now = new Date();
  const currentDay = now.getDay();

  // Check every day for the next 8 days (covers full week + same day next week)
  for (let offset = 0; offset < 8; offset++) {
    const targetDay = (currentDay + offset) % 7;
    const masses = SCHEDULE.filter(([d]) => d === targetDay)
      .sort((a, b) => {
        const pa = parseTime(a[1]);
        const pb = parseTime(b[1]);
        return pa.hours * 60 + pa.minutes - (pb.hours * 60 + pb.minutes);
      });

    for (const [, timeStr, label] of masses) {
      const { hours, minutes } = parseTime(timeStr);
      const massDate = new Date(now);
      massDate.setDate(massDate.getDate() + offset);
      massDate.setHours(hours, minutes, 0, 0);

      if (massDate > now) {
        return { date: massDate, label, timeStr };
      }
    }
  }
  // Fallback — shouldn't happen with a full week
  return null;
}

function formatCountdown(ms) {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const digitStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: 56,
};
const numStyle = {
  fontSize: "clamp(28px, 5vw, 40px)",
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 700,
  lineHeight: 1,
  color: "#fff",
};
const unitStyle = {
  fontSize: 10,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: T.goldLight,
  marginTop: 4,
};
const separatorStyle = {
  fontSize: "clamp(24px, 4vw, 36px)",
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 300,
  color: "rgba(255,255,255,0.3)",
  alignSelf: "flex-start",
  paddingTop: 2,
};

export default function NextMass() {
  const { t } = useTranslation();
  const [next, setNext] = useState(getNextMass);
  const [countdown, setCountdown] = useState(() =>
    next ? formatCountdown(next.date - Date.now()) : null
  );

  useEffect(() => {
    const tick = setInterval(() => {
      let mass = next;
      // If current mass time has passed, recalculate
      if (!mass || mass.date <= Date.now()) {
        mass = getNextMass();
        setNext(mass);
      }
      if (mass) {
        setCountdown(formatCountdown(mass.date - Date.now()));
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [next]);

  if (!next || !countdown) return null;

  const dayLabel = t(`schedule.${next.label}`);

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "24px 32px",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: T.goldLight,
          fontWeight: 600,
        }}
      >
        {t("home.nextMass.label")}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {countdown.days > 0 && (
          <>
            <div style={digitStyle}>
              <span style={numStyle}>{String(countdown.days).padStart(2, "0")}</span>
              <span style={unitStyle}>{t("home.nextMass.days")}</span>
            </div>
            <span style={separatorStyle}>:</span>
          </>
        )}
        <div style={digitStyle}>
          <span style={numStyle}>{String(countdown.hours).padStart(2, "0")}</span>
          <span style={unitStyle}>{t("home.nextMass.hours")}</span>
        </div>
        <span style={separatorStyle}>:</span>
        <div style={digitStyle}>
          <span style={numStyle}>{String(countdown.minutes).padStart(2, "0")}</span>
          <span style={unitStyle}>{t("home.nextMass.min")}</span>
        </div>
        <span style={separatorStyle}>:</span>
        <div style={digitStyle}>
          <span style={numStyle}>{String(countdown.seconds).padStart(2, "0")}</span>
          <span style={unitStyle}>{t("home.nextMass.sec")}</span>
        </div>
      </div>

      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
        {dayLabel} · {next.timeStr}
      </div>
    </div>
  );
}
