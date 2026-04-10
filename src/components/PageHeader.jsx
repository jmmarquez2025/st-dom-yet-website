import { T } from "../constants/theme";

export default function PageHeader({ title }) {
  return (
    <div style={{ background: T.burgundy, padding: "60px 24px", textAlign: "center" }}>
      <h1
        style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          color: "#fff",
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        {title}
      </h1>
      <div style={{ width: 60, height: 3, background: T.gold, margin: "16px auto 0" }} />
    </div>
  );
}
