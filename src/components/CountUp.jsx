import { useEffect, useRef, useState } from "react";

/**
 * Animated number counter that counts up from 0 to `end` when scrolled into view.
 * Uses an easeOut curve for a satisfying deceleration effect.
 */
export default function CountUp({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  style = {},
}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * end));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return (
    <span ref={ref} style={style}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}
