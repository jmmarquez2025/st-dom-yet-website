import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import Btn from "../components/Btn";
import PageHeader from "../components/PageHeader";
import { useMinistries } from "../cms/hooks";

export default function GetInvolved() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: ministries } = useMinistries();

  return (
    <div style={{ paddingTop: 76 }}>
      <PageHeader title={t("getInvolved.title")} />

      <Section bg={T.warmWhite}>
        <FadeSection>
          <SectionTitle sub={t("getInvolved.sub")}>{t("getInvolved.heading")}</SectionTitle>
          <p style={{ fontSize: 16, color: T.warmGray, lineHeight: 1.8, textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            {t("getInvolved.desc")}
          </p>
        </FadeSection>
      </Section>

      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {ministries.map((m) => (
              <div
                key={m.id}
                className="hover-lift-sm"
                style={{ background: T.warmWhite, padding: 28, borderRadius: 4, border: `1px solid ${T.stone}` }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }} aria-hidden="true">{m.icon}</div>
                <h3 style={{ fontSize: 18, color: T.burgundy, marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>
                  {t(`getInvolved.ministries.${m.key}.title`)}
                </h3>
                <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.7 }}>
                  {t(`getInvolved.ministries.${m.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{ background: `linear-gradient(135deg, ${T.burgundy} 0%, ${T.burgundyDark} 100%)`, borderRadius: 4, padding: 48, textAlign: "center" }}>
            <h3 style={{ fontSize: 28, color: "#fff", marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>
              {t("getInvolved.register.title")}
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 24, maxWidth: 500, margin: "0 auto 24px", lineHeight: 1.8 }}>
              {t("getInvolved.register.desc")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              <Btn onClick={() => navigate("/contact")} variant="gold">{t("getInvolved.register.cta")}</Btn>
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                <a href={CONFIG.phoneLink} className="contact-link" style={{ color: T.goldLight }}>{CONFIG.phone}</a>
              </div>
              <div style={{ fontSize: 14 }}>
                <a href={`mailto:${CONFIG.email}`} className="contact-link" style={{ color: "rgba(255,255,255,0.75)" }}>{CONFIG.email}</a>
              </div>
            </div>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
