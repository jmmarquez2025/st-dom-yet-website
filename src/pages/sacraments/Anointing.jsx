import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { T } from "../../constants/theme";
import { CONFIG } from "../../constants/config";
import { Section, SectionTitle } from "../../components/Section";
import FadeSection from "../../components/FadeSection";
import Btn from "../../components/Btn";
import PageHeader from "../../components/PageHeader";

export default function Anointing() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: 76 }}>
      <PageHeader title={t("sacraments.anointing.title")} />

      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <SectionTitle sub={t("sacraments.anointing.sub")}>{t("sacraments.anointing.heading")}</SectionTitle>
            <div style={{ fontSize: 16, color: T.warmGray, lineHeight: 2 }}>
              <p style={{ marginBottom: 20 }}>{t("sacraments.anointing.p1")}</p>
              <p style={{ marginBottom: 20 }}>{t("sacraments.anointing.p2")}</p>
            </div>
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ background: T.warmWhite, borderRadius: 4, padding: 36, border: `1px solid ${T.stone}`, maxWidth: 600, margin: "0 auto" }}>
            <h3 style={{ fontSize: 22, color: T.burgundy, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif", textAlign: "center" }}>
              {t("sacraments.anointing.whenTitle")}
            </h3>
            <ul style={{ fontSize: 15, color: T.warmGray, lineHeight: 2, paddingLeft: 24 }}>
              <li>{t("sacraments.anointing.when1")}</li>
              <li>{t("sacraments.anointing.when2")}</li>
              <li>{t("sacraments.anointing.when3")}</li>
              <li>{t("sacraments.anointing.when4")}</li>
            </ul>
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{
            background: `linear-gradient(135deg, ${T.burgundy} 0%, ${T.burgundyDark} 100%)`,
            borderRadius: 4, padding: 48, textAlign: "center",
          }}>
            <h3 style={{ fontSize: 26, color: "#fff", marginBottom: 12, fontFamily: "'Cormorant Garamond', serif" }}>
              {t("sacraments.anointing.emergencyTitle")}
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", marginBottom: 20, lineHeight: 1.7 }}>
              {t("sacraments.anointing.emergencyDesc")}
            </p>
            <a href={CONFIG.phoneLink} style={{ fontSize: 28, color: T.goldLight, fontWeight: 700, textDecoration: "none" }}>
              {CONFIG.phone}
            </a>
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
            <p style={{ fontSize: 15, color: T.warmGray, marginBottom: 24, lineHeight: 1.7 }}>{t("sacraments.anointing.ctaDesc")}</p>
            <Btn onClick={() => navigate("/contact")}>{t("sacraments.contactUs")}</Btn>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
