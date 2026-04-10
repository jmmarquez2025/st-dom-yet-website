import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import PageHeader from "../components/PageHeader";

export default function Give() {
  const { t } = useTranslation();

  const hasWeShare = Boolean(CONFIG.weShareUrl);

  return (
    <div style={{ paddingTop: 76 }}>
      <PageHeader title={t("give.title")} />

      <Section bg={T.warmWhite}>
        <FadeSection>
          <SectionTitle sub={t("give.sub")}>{t("give.heading")}</SectionTitle>
          <p style={{ fontSize: 16, color: T.warmGray, lineHeight: 1.8, textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            {t("give.desc")}
          </p>
        </FadeSection>
      </Section>

      {/* WeShare Online Giving */}
      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <div style={{ background: T.warmWhite, border: `1px solid ${T.stone}`, borderRadius: 4, padding: 48 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }} aria-hidden="true">💝</div>
              <h3 style={{ fontSize: 28, color: T.burgundy, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>
                {t("give.onlineTitle")}
              </h3>
              <p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.8, marginBottom: 24, maxWidth: 500, margin: "0 auto 24px" }}>
                {t("give.onlineDesc")}
              </p>
              {hasWeShare ? (
                <a
                  href={CONFIG.weShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hover"
                  style={{
                    display: "inline-block", padding: "16px 40px", background: T.gold,
                    color: T.softBlack, fontSize: 15, fontWeight: 600, letterSpacing: 1,
                    textTransform: "uppercase", borderRadius: 2, textDecoration: "none",
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  {t("give.weShareBtn")}
                </a>
              ) : (
                <div style={{ background: T.cream, borderRadius: 4, padding: 24, border: `1px solid ${T.stone}` }}>
                  <p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.7 }}>
                    {t("give.comingSoon")}
                  </p>
                  <p style={{ fontSize: 14, color: T.warmGray, marginTop: 8 }}>
                    {t("give.contactOffice")}
                  </p>
                </div>
              )}
              <p style={{ fontSize: 12, color: T.warmGray, marginTop: 20, fontStyle: "italic" }}>
                {t("give.weShareNote")}
              </p>
            </div>
          </div>
        </FadeSection>
      </Section>

      {/* Other giving methods */}
      <Section bg={T.warmWhite}>
        <FadeSection>
          <SectionTitle sub={t("give.otherSub")}>{t("give.otherTitle")}</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {["offertory", "mail", "stock"].map((key) => (
              <div key={key} className="hover-lift" style={{ background: T.cream, padding: 32, borderRadius: 4, textAlign: "center", border: `1px solid ${T.stone}` }}>
                <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">
                  {key === "offertory" ? "⛪" : key === "mail" ? "✉️" : "📈"}
                </div>
                <h4 style={{ fontSize: 18, marginBottom: 8, color: T.burgundy }}>{t(`give.methods.${key}.title`)}</h4>
                <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.7 }}>{t(`give.methods.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      {/* Tax info */}
      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.8 }}>
              {t("give.taxNote")}
            </p>
            <p style={{ fontSize: 14, color: T.warmGray, marginTop: 12 }}>
              {t("give.questions")}{" "}
              <a href={CONFIG.phoneLink} className="contact-link" style={{ color: T.burgundy, fontWeight: 600 }}>{CONFIG.phone}</a>
            </p>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
