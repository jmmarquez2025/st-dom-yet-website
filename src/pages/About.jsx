import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import Btn from "../components/Btn";
import TextReveal from "../components/TextReveal";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import HeroImage from "../components/HeroImage";
import PhotoGallery from "../components/PhotoGallery";
import { PHOTOS } from "../constants/photos";

export default function About() {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo title="About Our Parish" description="Learn about the history of St. Dominic Parish, founded by the Dominican Friars in 1923 in Youngstown, Ohio." />
      {/* ════ Hero Banner ════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: T.softBlack,
          color: "#fff",
          padding: "clamp(64px, 12vw, 120px) 24px clamp(48px, 8vw, 80px)",
          textAlign: "center",
        }}
      >
        <HeroImage src={PHOTOS.aboutHero} overlay={0.6} />
        {/* Subtle Romanesque arch pattern */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }}
        >
          <defs>
            <pattern id="archPat" width="100" height="80" patternUnits="userSpaceOnUse">
              <path d="M0 80 Q50 0 100 80" stroke="#fff" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#archPat)" />
        </svg>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: T.gold,
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            {t("about.history.sub")}
          </div>
          <TextReveal
            as="h1"
            stagger={0.08}
            style={{
              fontSize: "clamp(36px, 7vw, 60px)",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#fff",
            }}
          >
            {t("about.title")}
          </TextReveal>
        </div>
      </section>

      {/* ════ History — Editorial Asymmetric Layout ════ */}
      <Section>
        <FadeSection>
          <style>{`
            .about-history-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 40px;
              align-items: start;
            }
            @media (min-width: 768px) {
              .about-history-grid {
                grid-template-columns: 1fr 1.4fr;
                gap: 56px;
              }
            }
          `}</style>
          <div className="about-history-grid">
            {/* Left — Large founding date + summary */}
            <div>
              <div
                style={{
                  fontSize: "clamp(80px, 12vw, 120px)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  color: T.stone,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                1923
              </div>
              <div
                style={{
                  fontSize: 14,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: T.gold,
                  fontWeight: 600,
                  marginBottom: 24,
                }}
              >
                {t("about.history.sub")}
              </div>
              <div
                className="glass-card--dark"
                style={{
                  padding: 28,
                  color: "#fff",
                }}
              >
                <blockquote
                  style={{
                    fontSize: 20,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    borderLeft: `3px solid ${T.gold}`,
                    paddingLeft: 20,
                  }}
                >
                  {t("about.history.motto")}
                </blockquote>
                <cite
                  style={{
                    display: "block",
                    fontSize: 12,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: T.goldLight,
                    fontStyle: "normal",
                    marginTop: 12,
                    paddingLeft: 24,
                  }}
                >
                  {t("about.history.mottoSrc")}
                </cite>
              </div>
            </div>

            {/* Right — History paragraphs */}
            <div>
              <h2
                style={{
                  fontSize: "clamp(26px, 4vw, 36px)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  marginBottom: 24,
                  color: T.softBlack,
                }}
              >
                {t("about.history.title")}
              </h2>
              {["p1", "p2", "p3", "p4"].map((k) => (
                <p
                  key={k}
                  style={{
                    fontSize: 16,
                    lineHeight: 1.8,
                    color: T.warmGray,
                    marginBottom: 20,
                  }}
                >
                  {t(`about.history.${k}`)}
                </p>
              ))}
            </div>
          </div>
        </FadeSection>
      </Section>

      {/* ════ Mission — Glassmorphic Cards ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <SectionTitle sub={t("about.mission.sub")}>{t("about.mission.title")}</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 28,
            }}
          >
            {[
              { key: "word", icon: "BookOpenText" },
              { key: "sacrament", icon: "Cross" },
              { key: "service", icon: "Handshake" },
            ].map(({ key, icon }) => (
              <div
                key={key}
                className="glass-card"
                style={{ padding: 32, textAlign: "center" }}
              >
                <div aria-hidden="true" style={{ marginBottom: 12 }}>
                  <Icon name={icon} size={36} color={T.burgundy} />
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontFamily: "'Cormorant Garamond', serif",
                    marginBottom: 10,
                  }}
                >
                  {t(`about.mission.${key}.title`)}
                </h3>
                <p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.7 }}>
                  {t(`about.mission.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      {/* ════ Photo Gallery ════ */}
      {PHOTOS.gallery.length > 0 && (
        <Section>
          <FadeSection>
            <SectionTitle sub={t("gallery.sub")}>{t("gallery.title")}</SectionTitle>
            <PhotoGallery photos={PHOTOS.gallery} />
          </FadeSection>
        </Section>
      )}

      {/* ════ Architecture — Full-width cinematic band ════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: T.softBlack,
          padding: "clamp(48px, 10vw, 96px) 24px",
        }}
      >
        <HeroImage src={PHOTOS.aboutArchitecture} overlay={0.68} />
        {/* Decorative arch pattern */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }}
        >
          <defs>
            <pattern id="archPat2" width="120" height="90" patternUnits="userSpaceOnUse">
              <path d="M0 90 Q60 0 120 90" stroke="#fff" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#archPat2)" />
        </svg>
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <FadeSection>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: T.gold,
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              {t("about.architecture.style")}
            </div>
            <TextReveal
              as="h3"
              stagger={0.07}
              style={{
                fontSize: "clamp(26px, 5vw, 40px)",
                fontFamily: "'Cormorant Garamond', serif",
                marginBottom: 20,
                color: "#fff",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {t("about.architecture.title")}
            </TextReveal>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", maxWidth: 640, margin: "0 auto" }}>
              {t("about.architecture.desc")}
            </p>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}
