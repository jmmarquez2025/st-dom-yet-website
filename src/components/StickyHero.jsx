import { useEffect, useRef, useState, useCallback } from "react";
import { T } from "../constants/theme";

/**
 * StickyHero — Apple-style hero that stays pinned while content scrolls.
 *
 * The hero text fades out and the background subtly zooms as the user scrolls
 * past the section. The next section then scrolls over the hero naturally.
 *
 * Props:
 *   image     — background image URL
 *   overlay   — dark overlay opacity (default 0.5)
 *   tint      — optional CSS color tint
 *   height    — total scroll runway (default "180vh")
 *   children  — hero content (title, subtitle, etc.)
 */
export default function StickyHero({
  image,
  overlay = 0.5,
  tint,
  height = "180vh",
  children,
}) {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleScroll = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const h = el.offsetHeight;
    // progress: 0 when section top is at viewport top, 1 when bottom reaches viewport top
    const p = Math.min(1, Math.max(0, -rect.top / (h - window.innerHeight)));
    setProgress(p);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Derived values
  const textOpacity = Math.max(0, 1 - progress * 2.5);
  const textY = progress * -40;
  const bgScale = 1 + progress * 0.1;

  return (
    <div ref={wrapperRef} style={{ height, position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Preload image */}
        {image && (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            onLoad={() => setLoaded(true)}
            style={{ position: "absolute", width: 0, height: 0, opacity: 0, pointerEvents: "none" }}
          />
        )}

        {/* Background with zoom */}
        {image && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `scale(${bgScale})`,
              opacity: loaded ? 1 : 0,
              transition: loaded ? "none" : "opacity 0.8s ease",
              willChange: "transform",
            }}
          />
        )}

        {/* Overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: tint
              ? `linear-gradient(160deg, ${tint}, rgba(0,0,0,${overlay}))`
              : `rgba(0,0,0,${overlay})`,
            opacity: loaded ? 1 : 0,
            transition: loaded ? "none" : "opacity 0.8s ease",
          }}
        />

        {/* Content with fade-out + lift */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "0 24px",
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            willChange: "transform, opacity",
          }}
        >
          {children}
        </div>

        {/* Bottom gradient for seamless transition */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: `linear-gradient(transparent, ${T.warmWhite})`,
            opacity: progress > 0.3 ? Math.min(1, (progress - 0.3) * 3) : 0,
          }}
        />
      </div>
    </div>
  );
}
