import { T } from "../constants/theme";
import { CROSS_PATTEE } from "../constants/crossPaths";

/**
 * DominicanDivider — a decorative SVG section divider.
 *
 * Renders an authentic Dominican Cross Flory (cross with fleur-de-lis tips,
 * traditional to the Dominican Order) flanked by elegant scroll flourishes.
 *
 * The cross is derived from the public-domain Wikimedia Commons
 * "Dominican cross basic" SVG.
 *
 * Props:
 *   color   — stroke/fill color (default gold)
 *   width   — total width in px (default 200)
 *   style   — additional wrapper styles
 */
export default function DominicanDivider({
  color = T.gold,
  width = 200,
  style,
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 0",
        ...style,
      }}
    >
      <svg
        width={width}
        height={width * 0.22}
        viewBox="0 0 240 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Left scroll flourish ── */}
        <path
          d="M6 26 C6 26, 14 18, 26 20 C34 21.5, 36 26, 36 26"
          stroke={color} strokeWidth="0.8" fill="none" opacity="0.7"
        />
        <path
          d="M6 26 C6 26, 14 34, 26 32 C34 30.5, 36 26, 36 26"
          stroke={color} strokeWidth="0.8" fill="none" opacity="0.7"
        />
        <circle cx="4" cy="26" r="1.5" fill={color} opacity="0.5" />
        {/* Left thin line */}
        <line x1="36" y1="26" x2="90" y2="26" stroke={color} strokeWidth="0.6" opacity="0.5" />
        {/* Left diamond accent */}
        <path d="M88 26 L93 21.5 L98 26 L93 30.5 Z" stroke={color} strokeWidth="0.7" fill="none" opacity="0.6" />

        {/* ── Center: Dominican Cross Pattée ── */}
        <g transform="translate(104, 10)">
          <svg viewBox={CROSS_PATTEE.viewBox} width="32" height="32">
            <path d={CROSS_PATTEE.d} fill={color} opacity="0.85" />
          </svg>
        </g>

        {/* ── Right diamond accent ── */}
        <path d="M142 26 L147 21.5 L152 26 L147 30.5 Z" stroke={color} strokeWidth="0.7" fill="none" opacity="0.6" />
        {/* Right thin line */}
        <line x1="150" y1="26" x2="204" y2="26" stroke={color} strokeWidth="0.6" opacity="0.5" />

        {/* ── Right scroll flourish ── */}
        <path
          d="M234 26 C234 26, 226 18, 214 20 C206 21.5, 204 26, 204 26"
          stroke={color} strokeWidth="0.8" fill="none" opacity="0.7"
        />
        <path
          d="M234 26 C234 26, 226 34, 214 32 C206 30.5, 204 26, 204 26"
          stroke={color} strokeWidth="0.8" fill="none" opacity="0.7"
        />
        <circle cx="236" cy="26" r="1.5" fill={color} opacity="0.5" />
      </svg>
    </div>
  );
}
