import { useState, useEffect, useRef, useCallback } from "react";
import { T } from "../../constants/theme";

/**
 * Article-specific reading progress bar.
 * Tracks scroll progress within the blog article container.
 */
export default function BlogReadingProgress({ containerRef }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const raf = useRef(null);

  const update = useCallback(() => {
    const el = containerRef?.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const total = el.scrollHeight;
    const scrolled = -rect.top + windowH * 0.3;
    const pct = Math.min(100, Math.max(0, (scrolled / (total - windowH * 0.7)) * 100));
    setProgress(pct);
    setVisible(rect.top < 0);
  }, [containerRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [update]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1002,
        background: "transparent",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          height: "100%",
          background: `linear-gradient(90deg, ${T.burgundy}, ${T.gold})`,
          width: `${progress}%`,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
