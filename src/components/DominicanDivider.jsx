import { T } from "../constants/theme";

/**
 * DominicanDivider — a decorative SVG section divider.
 *
 * Renders an ornamental Cross Flory (cross with fleur-de-lis tips, traditional
 * to the Dominican Order) flanked by elegant scroll flourishes.
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

        {/* ── Center: Cross Flory (Dominican cross with fleur-de-lis tips) ── */}
        <g transform="translate(120, 26)">
          {/* Cross body — slightly tapered arms */}
          <path
            d="M-3 -14 L3 -14 L3 -3 L14 -3 L14 3 L3 3 L3 14 L-3 14 L-3 3 L-14 3 L-14 -3 L-3 -3 Z"
            fill={color} opacity="0.85"
          />

          {/* Top fleur-de-lis */}
          <path d="M0 -14 C-4 -18, -6.5 -20, -5 -22 C-3.5 -24, 0 -21, 0 -19 C0 -21, 3.5 -24, 5 -22 C6.5 -20, 4 -18, 0 -14Z" fill={color} opacity="0.75" />
          {/* Bottom fleur-de-lis */}
          <path d="M0 14 C-4 18, -6.5 20, -5 22 C-3.5 24, 0 21, 0 19 C0 21, 3.5 24, 5 22 C6.5 20, 4 18, 0 14Z" fill={color} opacity="0.75" />
          {/* Left fleur-de-lis */}
          <path d="M-14 0 C-18 -4, -20 -6.5, -22 -5 C-24 -3.5, -21 0, -19 0 C-21 0, -24 3.5, -22 5 C-20 6.5, -18 4, -14 0Z" fill={color} opacity="0.75" />
          {/* Right fleur-de-lis */}
          <path d="M14 0 C18 -4, 20 -6.5, 22 -5 C24 -3.5, 21 0, 19 0 C21 0, 24 3.5, 22 5 C20 6.5, 18 4, 14 0Z" fill={color} opacity="0.75" />

          {/* Center jewel — small circle */}
          <circle cx="0" cy="0" r="2" fill={color} opacity="0.5" />
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
