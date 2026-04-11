import { useTranslation } from "react-i18next";
import { getLiturgicalSeason } from "../utils/liturgical";

/**
 * Thin liturgical-season indicator strip.
 * Shows the current season with its liturgical color.
 */
export default function LiturgicalBanner() {
  const { t } = useTranslation();
  const season = getLiturgicalSeason();

  return (
    <div
      style={{
        background: `linear-gradient(90deg, ${season.color}, ${season.accent})`,
        color: "#fff",
        textAlign: "center",
        padding: "6px 16px",
        fontSize: 11,
        letterSpacing: 3,
        textTransform: "uppercase",
        fontWeight: 600,
      }}
    >
      {t(`home.liturgical.${season.key}`)}
    </div>
  );
}
