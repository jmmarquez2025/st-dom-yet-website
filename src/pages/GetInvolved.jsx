import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import Btn from "../components/Btn";
import PageHeader from "../components/PageHeader";
import TextReveal from "../components/TextReveal";
import { useMinistries } from "../cms/hooks";

/* ── Bento card sizes: featured ministries get span-2 ── */
const FEATURED = new Set(["hispanic", "liturgical"]);

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
};

export default function GetInvolved() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: ministries } = useMinistries();

  return (
    <div style={{ paddingTop: 76 }}>
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

      {/* ════ Bento Grid Ministries ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <SectionTitle sub={t("getInvolved.sub")}>{t("getInvolved.title")}</SectionTitle>

          <style>{`
            .bento-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }
            .bento-card {
              position: relative;
              overflow: hidden;
              border-radius: 12px;
              padding: 32px;
              background: ${T.warmWhite};
              border: 1px solid ${T.stone};
              transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                          box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                          border-color 0.35s ease;
              cursor: default;
            }
            .bento-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
              border-color: ${T.gold};
            }
            .bento-card--featured {
              grid-column: span 2;
              padding: 40px;
            }
            .bento-accent {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 3px;
            }
            @media (max-width: 768px) {
              .bento-grid {
                grid-template-columns: 1fr;
              }
              .bento-card--featured {
                grid-column: span 1;
              }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
              .bento-grid {
                grid-template-columns: repeat(2, 1fr);
              }
              .bento-card--featured {
                grid-column: span 2;
              }
            }
          `}</style>

          <div className="bento-grid">
            {ministries.map((m) => {
              const isFeatured = FEATURED.has(m.key);
              const accent = ACCENTS[m.key] || T.burgundy;

              return (
                <div
                  key={m.id}
                  className={`bento-card${isFeatured ? " bento-card--featured" : ""}`}
                >
                  <div className="bento-accent" style={{ background: accent }} />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 14,
                    }}
                  >
                    <span
                      style={{
                        fontSize: isFeatured ? 36 : 28,
                        lineHeight: 1,
                      }}
                      aria-hidden="true"
                    >
                      {m.icon}
                    </span>
                    <h3
                      style={{
                        fontSize: isFeatured ? 22 : 18,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 600,
                        color: T.softBlack,
                      }}
                    >
                      {t(`getInvolved.ministries.${m.key}.title`)}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: isFeatured ? 15 : 14,
                      color: T.warmGray,
                      lineHeight: 1.7,
                    }}
                  >
                    {t(`getInvolved.ministries.${m.key}.desc`)}
                  </p>
                </div>
              );
            })}
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
