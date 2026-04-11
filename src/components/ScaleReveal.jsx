import useScrollProgress from "../hooks/useScrollProgress";

/**
 * ScaleReveal — image that scales up from small to full size on scroll.
 *
 * Apple-style effect where an image starts slightly smaller with rounded
 * corners and smoothly expands to fill its container as you scroll into it.
 *
 * Props:
 *   src       — image URL
 *   alt       — alt text
 *   caption   — optional caption below image
 *   maxWidth  — max width of the image (default 800)
 */
export default function ScaleReveal({
  src,
  alt,
  caption,
  maxWidth = 800,
}) {
  const { ref, progress } = useScrollProgress({ offset: 0.95 });

  // Ease the progress for smoother feel
  const eased = 1 - Math.pow(1 - Math.min(1, progress * 1.3), 3);

  const scale = 0.88 + eased * 0.12;
  const radius = Math.round(16 * (1 - eased));
  const opacity = 0.7 + eased * 0.3;
  const shadow = eased * 20;

  return (
    <figure
      ref={ref}
      style={{
        margin: "40px auto",
        textAlign: "center",
        maxWidth,
      }}
    >
      <div
        style={{
          overflow: "hidden",
          borderRadius: radius,
          transform: `scale(${scale})`,
          opacity,
          boxShadow: `0 ${shadow * 0.5}px ${shadow}px rgba(0,0,0,${0.08 + eased * 0.07})`,
          transition: "border-radius 0.1s linear",
          willChange: "transform, opacity",
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            width: "100%",
            display: "block",
          }}
        />
      </div>
      {caption && (
        <figcaption
          style={{
            fontSize: 13,
            color: "#8A8580",
            fontStyle: "italic",
            marginTop: 12,
            opacity: Math.min(1, progress * 2),
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
