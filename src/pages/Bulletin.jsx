import { useState } from "react";
import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import TextReveal from "../components/TextReveal";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import { ExternalLink } from "lucide-react";

export default function Bulletin() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const hasBulletin = Boolean(CONFIG.bulletinUrl);

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo
        title="Weekly Bulletin"
        description="Read the weekly parish bulletin from St. Dominic Catholic Parish with announcements, Mass intentions, and ministry news."
      />

      {/* ════ Hero ════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(160deg, ${T.burgundyDark} 0%, ${T.burgundy} 60%, #8B2E3F 100%)`,
          color: "#fff",
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
            <pattern
              id="bulletinCross"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 15 v30 M15 30 h30"
                stroke="#fff"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bulletinCross)" />
        </svg>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
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
            {t("bulletin.hero.sub")}
          </div>
          <TextReveal
            as="h1"
            style={{
              fontSize: "clamp(36px, 7vw, 58px)",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 16,
              color: "#fff",
            }}
          >
            {t("bulletin.title")}
          </TextReveal>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            {t("bulletin.hero.desc")}
          </p>
        </div>
      </section>

      {/* ════ Embedded Flipbook ════ */}
      <Section>
        <FadeSection>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 34px)",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                color: T.softBlack,
                textAlign: "center",
                marginBottom: 32,
              }}
            >
              {t("bulletin.heading")}
            </h2>

            {hasBulletin ? (
              <>
                {/* Flipbook container */}
                <div
                  style={{
                    position: "relative",
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                    border: `1px solid ${T.stone}`,
                    background: T.cream,
                  }}
                >
                  {/* Loading skeleton */}
                  {loading && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 16,
                        background: T.cream,
                        zIndex: 2,
                      }}
                    >
                      <style>{`
                        @keyframes bulletinPulse {
                          0%, 100% { opacity: 0.4; }
                          50% { opacity: 1; }
                        }
                      `}</style>
                      <Icon name="Newspaper" size={48} color={T.stone} />
                      <div
                        style={{
                          fontSize: 14,
                          color: T.warmGray,
                          letterSpacing: 1,
                          animation: "bulletinPulse 1.5s ease infinite",
                        }}
                      >
                        {t("bulletin.loading")}
                      </div>
                    </div>
                  )}

                  <iframe
                    src={CONFIG.bulletinUrl}
                    onLoad={() => setLoading(false)}
                    style={{
                      width: "100%",
                      height: "clamp(500px, 80vh, 820px)",
                      border: "none",
                      display: "block",
                    }}
                    allowFullScreen
                    title={t("bulletin.heading")}
                  />
                </div>

                {/* Fullscreen link */}
                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <a
                    href={CONFIG.bulletinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 14,
                      color: T.burgundy,
                      fontWeight: 600,
                      letterSpacing: 0.5,
                      textDecoration: "none",
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <ExternalLink size={14} />
                    {t("bulletin.fullscreen")}
                  </a>
                </div>
              </>
            ) : (
              /* Fallback when no URL configured */
              <div
                style={{
                  textAlign: "center",
                  padding: "clamp(48px, 8vw, 80px) 24px",
                  background: T.cream,
                  borderRadius: 12,
                  border: `1px solid ${T.stone}`,
                }}
              >
                <Icon name="Newspaper" size={64} color={T.stone} />
                <h3
                  style={{
                    fontSize: 24,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    color: T.softBlack,
                    marginTop: 20,
                    marginBottom: 12,
                  }}
                >
                  {t("bulletin.fallback.title")}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: T.warmGray,
                    lineHeight: 1.7,
                    maxWidth: 480,
                    margin: "0 auto 24px",
                  }}
                >
                  {t("bulletin.fallback.desc")}
                </p>
                <a
                  href="https://saintdominic.org/bulletins"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hover"
                  style={{
                    display: "inline-block",
                    padding: "14px 32px",
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    background: T.burgundy,
                    color: T.cream,
                    borderRadius: 2,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {t("bulletin.fallback.cta")}
                </a>
              </div>
            )}
          </div>
        </FadeSection>
      </Section>

      {/* ════ Bulletin Info ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <SectionTitle sub={t("bulletin.info.sub")}>
            {t("bulletin.info.title")}
          </SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            {/* Deadline card */}
            <div
              className="glass-card"
              style={{
                padding: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: T.burgundy,
                }}
              />
              <div style={{ marginBottom: 14 }}>
                <Icon name="Clock" size={28} color={T.burgundy} />
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  color: T.softBlack,
                  marginBottom: 8,
                }}
              >
                {t("bulletin.info.deadline")}
              </h3>
              <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.7 }}>
                {t("bulletin.info.deadlineDesc")}
              </p>
            </div>

            {/* Contact card */}
            <div
              className="glass-card"
              style={{
                padding: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: T.gold,
                }}
              />
              <div style={{ marginBottom: 14 }}>
                <Icon name="Mail" size={28} color={T.gold} />
              </div>
              <h3
                style={{
                  fontSize: 18,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  color: T.softBlack,
                  marginBottom: 8,
                }}
              >
                {t("bulletin.info.contact")}
              </h3>
              <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.7, marginBottom: 16 }}>
                {t("bulletin.info.contactDesc")}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <a
                  href={CONFIG.phoneLink}
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: T.burgundy,
                    textDecoration: "none",
                  }}
                >
                  {CONFIG.phone}
                </a>
                <a
                  href={`mailto:${CONFIG.email}`}
                  style={{
                    fontSize: 14,
                    color: T.warmGray,
                    textDecoration: "none",
                  }}
                >
                  {CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
