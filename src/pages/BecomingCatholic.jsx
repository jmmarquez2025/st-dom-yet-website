import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import Btn from "../components/Btn";
import PageHeader from "../components/PageHeader";

export default function BecomingCatholic() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cards = [
    { key: "new" },
    { key: "returning" },
    { key: "ready" },
  ];

  return (
    <div style={{ paddingTop: 76 }}>
      <PageHeader title={t("becomingCatholic.title")} />

      {/* ════ Intro ════ */}
      <Section>
        <FadeSection>
          <SectionTitle sub={t("becomingCatholic.intro.sub")}>
            {t("becomingCatholic.intro.title")}
          </SectionTitle>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              color: T.warmGray,
              maxWidth: 720,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {t("becomingCatholic.intro.desc")}
          </p>
        </FadeSection>
      </Section>

      {/* ════ Cards ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28,
            }}
          >
            {cards.map(({ key }) => (
              <div
                key={key}
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ height: 4, background: T.burgundy }} />
                <div style={{ padding: 32 }}>
                  <h3
                    style={{
                      fontSize: 20,
                      fontFamily: "'Cormorant Garamond', serif",
                      marginBottom: 10,
                      color: T.softBlack,
                    }}
                  >
                    {t(`becomingCatholic.cards.${key}.title`)}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: T.warmGray,
                      marginBottom: 16,
                    }}
                  >
                    {t(`becomingCatholic.cards.${key}.desc`)}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: T.burgundy,
                      background: `${T.burgundy}10`,
                      padding: "6px 14px",
                      borderRadius: 4,
                    }}
                  >
                    {t(`becomingCatholic.cards.${key}.step`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      {/* ════ Contact CTA ════ */}
      <Section>
        <FadeSection>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 36px)",
                fontFamily: "'Cormorant Garamond', serif",
                marginBottom: 12,
                color: T.softBlack,
              }}
            >
              {t("becomingCatholic.contact.title")}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.warmGray, marginBottom: 24 }}>
              {t("becomingCatholic.contact.desc")}
            </p>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={CONFIG.phoneLink}
                className="contact-link"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: T.burgundy,
                }}
              >
                {CONFIG.phone}
              </a>
              <a
                href={`mailto:${CONFIG.email}`}
                className="contact-link"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: T.burgundy,
                }}
              >
                {CONFIG.email}
              </a>
            </div>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
