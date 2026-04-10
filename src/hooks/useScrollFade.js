import { useEffect, useRef } from "react";

const sharedObserver =
  typeof IntersectionObserver !== "undefined"
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              sharedObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      )
    : null;

export default function useScrollFade() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !sharedObserver) return;
    sharedObserver.observe(el);
    return () => sharedObserver.unobserve(el);
  }, []);
  return ref;
}
