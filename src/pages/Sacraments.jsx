import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { T } from "../constants/theme";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import PageHeader from "../components/PageHeader";

const SACRAMENT_LINKS = [
  { to: "/sacraments/baptism", key: "baptism", icon: "💧" },
  { to: "/sacraments/first-communion", key: "firstCommunion", icon: "🍞" },
  { to: "/sacraments/confirmation", key: "confirmation", icon: "🔥" },
  { to: "/sacraments/marriage", key: "marriage", icon: "💍" },
  { to: "/sacraments/anointing", key: "anointing", icon: "🕊️" },
  { to: "/sacraments/funerals", key: "funerals", icon: "✝️" },
];

export default function Sacraments() {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: 76 }}>
      <PageHeader title={t("sacraments.title")} />

      <Section bg={T.warmWhite}>
        <FadeSection>
          <SectionTitle sub={t("sacraments.sub")}>{t("sacraments.heading")}</SectionTitle>
          <p style={{ fontSize: 16, color: T.warmGray, lineHeight: 1.9, textAlign: "center", maxWidth: 700, margin: "0 auto 48px" }}>
            {t("sacraments.desc")}
          </p>
        </FadeSection>
      </Section>

      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {SACRAMENT_LINKS.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="hover-lift"
                style={{
                  textDecoration: "none", background: T.warmWhite, padding: 36,
                  borderRadius: 4, border: `1px solid ${T.stone}`, borderTop: `4px solid ${T.burgundy}`,
                  display: "block",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }} aria-hidden="true">{s.icon}</div>
                <h3 style={{ fontSize: 22, color: T.burgundy, marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>
                  {t(`sacraments.${s.key}.title`)}
                </h3>
                <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.7 }}>
                  {t(`sacraments.${s.key}.brief`)}
                </p>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.gold, letterSpacing: 1, textTransform: "uppercase", marginTop: 16 }}>
                  {t("sacraments.learnMore")} →
                </div>
              </Link>
            ))}
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
