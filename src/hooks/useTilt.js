import { useRef, useCallback } from "react";

/**
 * 3D tilt effect — card rotates slightly based on cursor position.
 * @param {number} maxDeg - maximum rotation in degrees (default 8)
 */
export default function useTilt(maxDeg = 8) {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) scale(1.02)`;
    },
    [maxDeg]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)";
  }, []);

  const bind = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      transition: "transform 0.15s ease-out",
      transformStyle: "preserve-3d",
      willChange: "transform",
    },
  };

  return bind;
}
