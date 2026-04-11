import { T } from "../constants/theme";
import HeroImage from "./HeroImage";
import { PHOTOS } from "../constants/photos";

export default function PageHeader({ title }) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: T.burgundy,
        padding: "60px 24px",
        textAlign: "center",
      }}
    >
      <HeroImage src={PHOTOS.pageHeader} overlay={0.45} tint="rgba(107,29,42,0.5)" />
      <div style={{ position: "relative", zIndex: 1 }}>
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
    </div>
  );
}
