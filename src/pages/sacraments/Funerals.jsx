import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { T } from "../../constants/theme";
import { CONFIG } from "../../constants/config";
import { Section, SectionTitle } from "../../components/Section";
import FadeSection from "../../components/FadeSection";
import Btn from "../../components/Btn";
import PageHeader from "../../components/PageHeader";
import Seo from "../../components/Seo";

export default function Funerals() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo title="Catholic Funerals" description="Catholic funeral services at St. Dominic Parish. Vigil, Funeral Mass, and Rite of Committal information." />
      <PageHeader title={t("sacraments.funerals.title")} />

      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <SectionTitle sub={t("sacraments.funerals.sub")}>{t("sacraments.funerals.heading")}</SectionTitle>
            <div style={{ fontSize: 16, color: T.warmGray, lineHeight: 2 }}>
              <p style={{ marginBottom: 20 }}>{t("sacraments.funerals.p1")}</p>
              <p style={{ marginBottom: 20 }}>{t("sacraments.funerals.p2")}</p>
            </div>
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.cream}>
        <FadeSection>
          <SectionTitle sub={t("sacraments.funerals.ritesSub")}>{t("sacraments.funerals.ritesTitle")}</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {["rite1", "rite2", "rite3"].map((key) => (
              <div key={key} style={{ background: T.warmWhite, padding: 28, borderRadius: 4, border: `1px solid ${T.stone}` }}>
                <h4 style={{ fontSize: 18, color: T.burgundy, marginBottom: 8 }}>{t(`sacraments.funerals.${key}.title`)}</h4>
                <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.7 }}>{t(`sacraments.funerals.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{ textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
            <h3 style={{ fontSize: 26, color: T.softBlack, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>
              {t("sacraments.funerals.cta")}
            </h3>
            <p style={{ fontSize: 15, color: T.warmGray, marginBottom: 24, lineHeight: 1.7 }}>{t("sacraments.funerals.ctaDesc")}</p>
            <Btn onClick={() => navigate("/contact")}>{t("sacraments.contactUs")}</Btn>
            <p style={{ fontSize: 14, color: T.warmGray, marginTop: 16 }}>
              <a href={CONFIG.phoneLink} className="contact-link" style={{ color: T.burgundy }}>{CONFIG.phone}</a>
            </p>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
