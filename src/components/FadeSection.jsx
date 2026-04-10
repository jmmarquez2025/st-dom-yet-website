import useScrollFade from "../hooks/useScrollFade";

export default function FadeSection({ children, style, className = "" }) {
  const ref = useScrollFade();
  return (
    <div ref={ref} className={`fade-section ${className}`} style={style}>
      {children}
    </div>
  );
}
