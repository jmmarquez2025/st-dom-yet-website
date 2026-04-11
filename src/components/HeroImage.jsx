import { useState } from "react";

/**
 * HeroImage — a background image layer for hero sections.
 *
 * Renders as an absolutely-positioned cover image with a dark overlay.
 * If `src` is falsy, renders nothing (parent keeps its CSS gradient).
 * Lazy-loads and fades in smoothly when the image is ready.
 */
export default function HeroImage({ src, alt = "", overlay = 0.55 }) {
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
          backgroundPosition: "center",
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
          background: `rgba(0,0,0,${overlay})`,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease",
          zIndex: 0,
        }}
      />
    </>
  );
}
