import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import Btn from "../components/Btn";
import TextReveal from "../components/TextReveal";
import { useMinistries } from "../cms/hooks";
import Seo from "../components/Seo";
import ScrollColorNum from "../components/ScrollColorNum";
import CountUp from "../components/CountUp";
import Icon from "../components/Icon";

/* ── Subtle accent per ministry ── */
const ACCENTS = {
  liturgical: T.burgundy,
  hispanic: "#C0392B",
  layDominicans: T.softBlack,
  familyLife: "#2E7D32",
  mensFellowship: "#1565C0",
  svdp: "#6A1B9A",
  music: T.gold,
  religiousEd: "#E65100",
  youth: "#00838F",
  bibleStudy: "#4E342E",
  caring: "#AD1457",
  missions: "#2E7D32",
};

export default function GetInvolved() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: ministries } = useMinistries();

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo
        title="Get Involved"
        description="Explore ministries and volunteer opportunities at St. Dominic Parish — Hispanic Ministry, music, religious education, and more."
      />

      {/* ════ Hero ════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(160deg, ${T.burgundyDark} 0%, ${T.burgundy} 60%, #8B2E3F 100%)`,
          color: "#fff",
          padding: "clamp(64px, 12vw, 110px) 24px clamp(48px, 8vw, 80px)",
          textAlign: "center",
        }}
      >
        <svg
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }}
        >
          <defs>
            <pattern id="involvedCross" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 15 v30 M15 30 h30" stroke="#fff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#involvedCross)" />
        </svg>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
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
            {t("getInvolved.sub")}
          </div>
          <TextReveal
            as="h1"
            style={{
              fontSize: "clamp(36px, 7vw, 58px)",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 20,
              color: "#fff",
            }}
          >
            {t("getInvolved.heading")}
          </TextReveal>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            {t("getInvolved.desc")}
          </p>
        </div>
      </section>

      {/* ════ Ministry Stats Strip ════ */}
      <section style={{ background: T.softBlack, color: "#fff" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          }}
        >
          {[
            { end: ministries.length, suffix: "", labelKey: "getInvolved.stats.ministries" },
            { end: 100, suffix: "+", labelKey: "getInvolved.stats.volunteers" },
            { end: 2, suffix: "", labelKey: "getInvolved.stats.languages" },
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <div
                style={{
                  fontSize: "clamp(32px, 5vw, 44px)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  color: T.gold,
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                <CountUp end={stat.end} suffix={stat.suffix} duration={1800 + i * 300} />
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════ Bento Grid Ministries ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <SectionTitle sub={t("getInvolved.sub")}>{t("getInvolved.title")}</SectionTitle>

          <style>{`
            .ministry-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }
            .ministry-card {
              position: relative;
              overflow: hidden;
              border-radius: 12px;
              padding: 28px 28px 28px 32px;
              background: ${T.warmWhite};
              border: 1px solid ${T.stone};
              transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                          box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                          border-color 0.35s ease;
            }
            .ministry-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
              border-color: ${T.gold};
            }
            .ministry-accent {
              position: absolute;
              top: 0;
              left: 0;
              width: 4px;
              height: 100%;
              border-radius: 4px 0 0 4px;
            }
            .ministry-icon {
              transition: transform 0.3s ease;
            }
            .ministry-card:hover .ministry-icon {
              transform: scale(1.12);
            }
            @media (max-width: 768px) {
              .ministry-grid {
                grid-template-columns: 1fr;
              }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .ministry-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
          `}</style>

          <div className="ministry-grid">
            {ministries.map((m) => {
              const accent = ACCENTS[m.key] || T.burgundy;

              return (
                <div key={m.id} className="ministry-card">
                  <div className="ministry-accent" style={{ background: accent }} />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                    }}
                  >
                    <div
                      className="ministry-icon"
                      style={{
                        width: 44,
                        height: 44,
                        minWidth: 44,
                        borderRadius: "50%",
                        background: T.stoneLight,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name={m.icon} size={22} color={accent} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <ScrollColorNum
                        as="h3"
                        colorFrom={T.warmGray}
                        colorTo={accent}
                        style={{
                          fontSize: 18,
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 600,
                          marginBottom: 8,
                          lineHeight: 1.3,
                        }}
                      >
                        {t(`getInvolved.ministries.${m.key}.title`)}
                      </ScrollColorNum>
                      <p
                        style={{
                          fontSize: 14,
                          color: T.warmGray,
                          lineHeight: 1.7,
                        }}
                      >
                        {t(`getInvolved.ministries.${m.key}.desc`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeSection>
      </Section>

      {/* ════ How to Get Started ════ */}
      <Section>
        <FadeSection>
          <SectionTitle sub={t("getInvolved.howTo.sub")}>{t("getInvolved.howTo.title")}</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            {[
              { num: "1", key: "explore", icon: "Search" },
              { num: "2", key: "connect", icon: "Phone" },
              { num: "3", key: "serve", icon: "HeartHandshake" },
            ].map((step) => (
              <div
                key={step.key}
                className="glass-card tilt-card"
                style={{ padding: 28, textAlign: "center" }}
              >
                <ScrollColorNum
                  as="div"
                  colorFrom={T.stone}
                  colorTo={T.gold}
                  style={{
                    fontSize: "clamp(36px, 5vw, 48px)",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {step.num}
                </ScrollColorNum>
                <div style={{ marginBottom: 8 }} aria-hidden="true">
                  <Icon name={step.icon} size={24} color={T.gold} />
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    marginBottom: 8,
                    color: T.softBlack,
                  }}
                >
                  {t(`getInvolved.howTo.${step.key}.title`)}
                </h3>
                <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.6 }}>
                  {t(`getInvolved.howTo.${step.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      {/* ════ Register CTA ════ */}
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
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }}
        >
          <defs>
            <pattern id="regCross" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 15 v30 M15 30 h30" stroke="#fff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#regCross)" />
        </svg>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <FadeSection>
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
              {t("getInvolved.register.title")}
            </TextReveal>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.8)",
                marginBottom: 24,
                maxWidth: 500,
                margin: "0 auto 24px",
                lineHeight: 1.8,
              }}
            >
              {t("getInvolved.register.desc")}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                justifyContent: "center",
              }}
            >
              <Btn onClick={() => navigate("/contact")} variant="gold">
                {t("getInvolved.register.cta")}
              </Btn>
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
                <a
                  href={CONFIG.phoneLink}
                  className="contact-link"
                  style={{ color: T.goldLight }}
                >
                  {CONFIG.phone}
                </a>
              </div>
              <div style={{ fontSize: 14 }}>
                <a
                  href={`mailto:${CONFIG.email}`}
                  className="contact-link"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {CONFIG.email}
                </a>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}
