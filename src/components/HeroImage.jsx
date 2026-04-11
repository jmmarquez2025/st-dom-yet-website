import { useState } from "react";

/**
 * HeroImage — a background image layer for hero sections.
 *
 * Renders as an absolutely-positioned cover image with overlays.
 * If `src` is falsy, renders nothing (parent keeps its CSS gradient).
 * Lazy-loads and fades in smoothly when the image is ready.
 *
 * Props:
 *   src       — image URL
 *   overlay   — dark overlay opacity (0–1), default 0.55
 *   tint      — optional CSS color for a tinted gradient overlay
 *               e.g. "rgba(107,29,42,0.5)" for a burgundy tint
 *   position  — backgroundPosition, default "center"
 */
export default function HeroImage({ src, overlay = 0.55, tint, position = "center" }) {
  const [loaded, setLoaded] = useState(false);

  if (!src) return null;

  return (
    <>
      {/* preload image off-screen */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        onLoad={() => setLoaded(true)}
        style={{ position: "absolute", width: 0, height: 0, opacity: 0, pointerEvents: "none" }}
      />

      {/* photo layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: position,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease",
          zIndex: 0,
        }}
      />

      {/* dark overlay for text legibility */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: tint
            ? `linear-gradient(160deg, ${tint}, rgba(0,0,0,${overlay}))`
            : `rgba(0,0,0,${overlay})`,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease",
          zIndex: 0,
        }}
      />
    </>
  );
}
