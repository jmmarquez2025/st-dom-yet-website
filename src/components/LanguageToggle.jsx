import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const isEs = i18n.language === "es";

  const toggle = () => {
    const next = isEs ? "en" : "es";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={isEs ? "Switch to English" : "Cambiar a Español"}
      style={{
        background: "none",
        border: `1px solid ${T.stone}`,
        borderRadius: 2,
        padding: "6px 10px",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.5,
        cursor: "pointer",
        color: T.burgundy,
        fontFamily: "'Source Sans 3', sans-serif",
        minHeight: 32,
      }}
    >
      {isEs ? "EN" : "ES"}
    </button>
  );
}
