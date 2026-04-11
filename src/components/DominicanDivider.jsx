import { T } from "../constants/theme";

/**
 * DominicanDivider — a decorative SVG section divider.
 *
 * Renders an ornamental cross with flourishes, styled in the parish gold.
 * Use between content sections for visual breathing room.
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
        height={width * 0.18}
        viewBox="0 0 200 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left flourish line */}
        <line x1="0" y1="18" x2="72" y2="18" stroke={color} strokeWidth="1" />
        <line x1="16" y1="18" x2="68" y2="18" stroke={color} strokeWidth="0.5" strokeDasharray="2 4" />

        {/* Left diamond */}
        <path d="M70 18 L76 12 L82 18 L76 24 Z" stroke={color} strokeWidth="1" fill="none" />

        {/* Center cross (Dominican) */}
        <rect x="95" y="8" width="10" height="20" rx="1" fill={color} opacity="0.9" />
        <rect x="88" y="14" width="24" height="8" rx="1" fill={color} opacity="0.9" />
        {/* Fleur-de-lis tips */}
        <circle cx="100" cy="6" r="2.5" fill={color} opacity="0.6" />
        <circle cx="100" cy="30" r="2.5" fill={color} opacity="0.6" />
        <circle cx="86" cy="18" r="2.5" fill={color} opacity="0.6" />
        <circle cx="114" cy="18" r="2.5" fill={color} opacity="0.6" />

        {/* Right diamond */}
        <path d="M118 18 L124 12 L130 18 L124 24 Z" stroke={color} strokeWidth="1" fill="none" />

        {/* Right flourish line */}
        <line x1="128" y1="18" x2="200" y2="18" stroke={color} strokeWidth="1" />
        <line x1="132" y1="18" x2="184" y2="18" stroke={color} strokeWidth="0.5" strokeDasharray="2 4" />
      </svg>
    </div>
  );
}
