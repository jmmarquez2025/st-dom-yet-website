import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";

/**
 * Dominican and Catholic quotes that rotate daily.
 * Uses a deterministic rotation based on the day of the year.
 */
const QUOTES = [
  { text: "home.quotes.q1", src: "home.quotes.s1" },
  { text: "home.quotes.q2", src: "home.quotes.s2" },
  { text: "home.quotes.q3", src: "home.quotes.s3" },
  { text: "home.quotes.q4", src: "home.quotes.s4" },
  { text: "home.quotes.q5", src: "home.quotes.s5" },
  { text: "home.quotes.q6", src: "home.quotes.s6" },
  { text: "home.quotes.q7", src: "home.quotes.s7" },
];

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / 86400000);
}

export default function DailyQuote() {
  const { t } = useTranslation();
  const quote = useMemo(() => QUOTES[dayOfYear() % QUOTES.length], []);

  return (
    <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
      <div
        style={{
          fontSize: 11,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: T.gold,
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        {t("home.quotes.label")}
      </div>
      <blockquote
        style={{
          fontSize: "clamp(20px, 3.5vw, 28px)",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          color: T.softBlack,
          lineHeight: 1.5,
          marginBottom: 12,
        }}
      >
        &ldquo;{t(quote.text)}&rdquo;
      </blockquote>
      <cite
        style={{
          fontSize: 13,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: T.warmGray,
          fontStyle: "normal",
        }}
      >
        &mdash; {t(quote.src)}
      </cite>
    </div>
  );
}
