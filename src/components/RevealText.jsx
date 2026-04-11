import { useEffect, useRef, useState } from "react";

/**
 * RevealText — cinematic split-text heading reveal using GSAP SplitText.
 *
 * Characters slide up from behind a mask on scroll trigger.
 * Falls back to a simple fade-in if GSAP fails to load.
 *
 * Props:
 *   tag       — HTML tag for the heading (default "h2")
 *   children  — text content
 *   style     — additional inline styles
 *   className — additional classes
 *   stagger   — delay between chars (default 0.03)
 *   threshold — scroll trigger start position (default "top 80%")
 */
export default function RevealText({
  tag: Tag = "h2",
  children,
  style,
  className = "",
  stagger = 0.03,
  threshold = "top 80%",
}) {
  const ref = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }

    let ctx;
    import("gsap").then(({ default: gsap }) => {
      return Promise.all([
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]).then(([{ ScrollTrigger }, { SplitText }]) => {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        ctx = gsap.context(() => {
          const split = new SplitText(el, {
            type: "chars,words",
            mask: "chars",
          });

          gsap.from(split.chars, {
            y: "100%",
            opacity: 0,
            stagger,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: threshold,
              once: true,
            },
          });
        }, el);
      });
    }).catch(() => {
      setFallback(true);
    });

    return () => ctx?.revert();
  }, [stagger, threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal-text ${fallback ? "reveal-text--fallback" : ""} ${className}`}
      style={{
        opacity: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
