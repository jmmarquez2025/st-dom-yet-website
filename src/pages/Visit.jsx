import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import Btn from "../components/Btn";
import PageHeader from "../components/PageHeader";
import TextReveal, { AnimatedDivider } from "../components/TextReveal";
import Seo from "../components/Seo";

const STEPS = [
  {
    num: "01",
    key: "arrive",
    icon: "🏛️",
  },
  {
    num: "02",
    key: "enter",
    icon: "🚪",
  },
  {
    num: "03",
    key: "seat",
    icon: "⛪",
  },
  {
    num: "04",
    key: "mass",
    icon: "✝️",
  },
  {
    num: "05",
    key: "community",
    icon: "🤝",
  },
];

export default function Visit() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo title="Plan Your Visit" description="Planning to visit St. Dominic Parish? Everything you need to know — what to expect, Mass times, parking, and a warm welcome." />
      {/* ════ Hero Banner ════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(160deg, ${T.burgundyDark} 0%, ${T.burgundy} 60%, #8B2E3F 100%)`,
          color: "#fff",
          padding: "clamp(64px, 12vw, 120px) 24px clamp(48px, 10vw, 100px)",
          textAlign: "center",
        }}
      >
        {/* Decorative cross pattern */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.03,
          }}
        >
          <defs>
            <pattern id="visitCross" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 10 v60 M10 40 h60" stroke="#fff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#visitCross)" />
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: T.goldLight,
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            {t("visit.hero.sub")}
          </div>
          <TextReveal
            as="h1"
            style={{
              fontSize: "clamp(36px, 7vw, 64px)",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 20,
              color: "#fff",
            }}
          >
            {t("visit.hero.title")}
          </TextReveal>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            {t("visit.hero.desc")}
          </p>
        </div>
      </section>

      {/* ════ What to Expect — Steps ════ */}
      <Section>
        <FadeSection>
          <SectionTitle sub={t("visit.steps.sub")}>{t("visit.steps.title")}</SectionTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              maxWidth: 720,
              margin: "0 auto",
              position: "relative",
            }}
          >
            {/* Vertical timeline line */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 28,
                top: 40,
                bottom: 40,
                width: 2,
                background: `linear-gradient(to bottom, ${T.gold}, ${T.stone})`,
              }}
            />

            {STEPS.map((step, i) => (
              <FadeSection key={step.key}>
                <div
                  style={{
                    display: "flex",
                    gap: 24,
                    padding: "28px 0",
                    position: "relative",
                  }}
                >
                  {/* Step number circle */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      minWidth: 56,
                      borderRadius: "50%",
                      background: i === 0 ? T.burgundy : T.warmWhite,
                      border: `2px solid ${i === 0 ? T.burgundy : T.gold}`,
                      color: i === 0 ? "#fff" : T.burgundy,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: "'Source Sans 3', sans-serif",
                      zIndex: 1,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                  >
                    {step.num}
                  </div>

                  {/* Content */}
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 22 }} aria-hidden="true">
                        {step.icon}
                      </span>
                      <h3
                        style={{
                          fontSize: 20,
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 600,
                          color: T.softBlack,
                        }}
                      >
                        {t(`visit.steps.${step.key}.title`)}
                      </h3>
                    </div>
                    <p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.7 }}>
                      {t(`visit.steps.${step.key}.desc`)}
                    </p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </FadeSection>
      </Section>

      {/* ════ What to Know ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <SectionTitle sub={t("visit.know.sub")}>{t("visit.know.title")}</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {["dress", "children", "language", "parking"].map((key) => (
              <div
                key={key}
                className="hover-lift-sm"
                style={{
                  background: T.warmWhite,
                  borderRadius: 8,
                  padding: 32,
                  border: `1px solid ${T.stone}`,
                  transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    color: T.burgundy,
                    marginBottom: 10,
                  }}
                >
                  {t(`visit.know.${key}.title`)}
                </h3>
                <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.7 }}>
                  {t(`visit.know.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      {/* ════ Quick Mass Schedule ════ */}
      <Section>
        <FadeSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 36,
              alignItems: "center",
            }}
          >
            <div>
              <SectionTitle sub={t("visit.schedule.sub")} center={false}>
                {t("visit.schedule.title")}
              </SectionTitle>
              <p
                style={{
                  fontSize: 16,
                  color: T.warmGray,
                  lineHeight: 1.8,
                  marginBottom: 28,
                }}
              >
                {t("visit.schedule.desc")}
              </p>
              <Btn variant="primary" onClick={() => navigate("/mass-times")}>
                {t("visit.schedule.cta")}
              </Btn>
            </div>

            <div
              style={{
                background: T.burgundy,
                color: "#fff",
                borderRadius: 8,
                padding: 32,
              }}
            >
              <h3
                style={{
                  fontSize: 20,
                  color: T.goldLight,
                  fontFamily: "'Cormorant Garamond', serif",
                  marginBottom: 16,
                }}
              >
                {t("visit.schedule.sundayTitle")}
              </h3>
              {[
                [t("visit.schedule.satVigil"), "5:00 PM"],
                [t("visit.schedule.sun"), "8:00 AM"],
                [t("visit.schedule.sun"), "10:30 AM"],
                [t("visit.schedule.sunEs"), "12:30 PM"],
              ].map(([label, time], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                    fontSize: 15,
                  }}
                >
                  <span>{label}</span>
                  <span style={{ fontWeight: 600 }}>{time}</span>
                </div>
              ))}
              <p
                style={{
                  fontSize: 13,
                  marginTop: 16,
                  color: "rgba(255,255,255,0.6)",
                  fontStyle: "italic",
                }}
              >
                {t("visit.schedule.confessionNote")}
              </p>
            </div>
          </div>
        </FadeSection>
      </Section>

      {/* ════ Pastor Welcome CTA ════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${T.burgundyDark}, ${T.burgundy})`,
          padding: "clamp(48px, 10vw, 80px) 24px",
          textAlign: "center",
        }}
      >
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.03,
          }}
        >
          <defs>
            <pattern id="visitCtaCross" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 15 v30 M15 30 h30" stroke="#fff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#visitCtaCross)" />
        </svg>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 650, margin: "0 auto" }}>
          <FadeSection>
            <div
              style={{
                fontSize: 48,
                marginBottom: 20,
                lineHeight: 1,
              }}
            >
              ☩
            </div>
            <TextReveal
              as="h2"
              style={{
                fontSize: "clamp(26px, 5vw, 38px)",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                color: "#fff",
                marginBottom: 16,
                lineHeight: 1.3,
              }}
            >
              {t("visit.cta.title")}
            </TextReveal>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.8)",
                marginBottom: 32,
              }}
            >
              {t("visit.cta.desc")}
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Btn variant="gold" onClick={() => navigate("/contact")}>
                {t("visit.cta.contact")}
              </Btn>
              <Btn variant="light" onClick={() => navigate("/becoming-catholic")}>
                {t("visit.cta.becoming")}
              </Btn>
            </div>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}
