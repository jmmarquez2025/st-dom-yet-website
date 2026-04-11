import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import { Section } from "../components/Section";
import FadeSection from "../components/FadeSection";
import HeroImage from "../components/HeroImage";
import Seo from "../components/Seo";
import { PHOTOS } from "../constants/photos";

function HistoryPhoto({ src, alt, caption }) {
  return (
    <figure style={{ margin: "32px 0", textAlign: "center" }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%",
          maxWidth: 700,
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      />
      {caption && (
        <figcaption
          style={{
            fontSize: 13,
            color: T.warmGray,
            fontStyle: "italic",
            marginTop: 10,
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function History() {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo
        title="Parish History"
        description="The history of St. Dominic Catholic Parish, founded by the Dominican Friars in 1923 in Youngstown, Ohio."
      />

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
        <HeroImage src={PHOTOS.historyHero} overlay={0.5} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: T.goldLight,
              marginBottom: 12,
            }}
          >
            {t("history.sub")}
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {t("history.title")}
          </h1>
          <div
            style={{
              width: 48,
              height: 2,
              background: T.gold,
              margin: "18px auto 0",
            }}
          />
        </div>
      </section>

      {/* ════ Founding — 1923 ════ */}
      <Section>
        <FadeSection>
          <style>{`
            .history-section {
              max-width: 800px;
              margin: 0 auto;
            }
            .history-era {
              display: flex;
              align-items: baseline;
              gap: 16px;
              margin-bottom: 16px;
            }
            .history-year {
              font-size: clamp(48px, 8vw, 72px);
              font-family: 'Cormorant Garamond', serif;
              font-weight: 700;
              color: ${T.stone};
              line-height: 1;
              flex-shrink: 0;
            }
            .history-era-label {
              font-size: 14px;
              letter-spacing: 3px;
              text-transform: uppercase;
              color: ${T.gold};
              font-weight: 600;
            }
          `}</style>

          <div className="history-section">
            <div className="history-era">
              <div className="history-year">1923</div>
              <div className="history-era-label">{t("history.founding.label")}</div>
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 32px)",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                marginBottom: 20,
                color: T.softBlack,
              }}
            >
              {t("history.founding.title")}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.warmGray, marginBottom: 20 }}>
              {t("history.founding.p1")}
            </p>

            <HistoryPhoto
              src={PHOTOS.historyStorefront}
              alt={t("history.founding.storeAlt")}
              caption={t("history.founding.storeCap")}
            />

            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.warmGray, marginBottom: 20 }}>
              {t("history.founding.p2")}
            </p>
          </div>
        </FadeSection>
      </Section>

      {/* ════ The Building — 1957 ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <div className="history-section">
            <div className="history-era">
              <div className="history-year">1957</div>
              <div className="history-era-label">{t("history.building.label")}</div>
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 32px)",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                marginBottom: 20,
                color: T.softBlack,
              }}
            >
              {t("history.building.title")}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.warmGray, marginBottom: 20 }}>
              {t("history.building.p1")}
            </p>

            <HistoryPhoto
              src={PHOTOS.historyConstruction}
              alt={t("history.building.constructAlt")}
              caption={t("history.building.constructCap")}
            />

            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.warmGray, marginBottom: 20 }}>
              {t("history.building.p2")}
            </p>

            <HistoryPhoto
              src={PHOTOS.historyExteriorBw}
              alt={t("history.building.exteriorAlt")}
              caption={t("history.building.exteriorCap")}
            />
          </div>
        </FadeSection>
      </Section>

      {/* ════ Dominican Heritage ════ */}
      <Section>
        <FadeSection>
          <div className="history-section">
            <div
              className="glass-card--dark"
              style={{
                padding: "clamp(28px, 5vw, 48px)",
                color: "#fff",
                textAlign: "center",
                marginBottom: 40,
              }}
            >
              <blockquote
                style={{
                  fontSize: "clamp(22px, 4vw, 30px)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  marginBottom: 16,
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
                }}
              >
                {t("about.history.mottoSrc")}
              </cite>
            </div>

            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 32px)",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                marginBottom: 20,
                color: T.softBlack,
              }}
            >
              {t("history.dominican.title")}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.warmGray, marginBottom: 20 }}>
              {t("history.dominican.p1")}
            </p>

            <HistoryPhoto
              src={PHOTOS.historyExteriorOld}
              alt={t("history.dominican.entranceAlt")}
              caption={t("history.dominican.entranceCap")}
            />
          </div>
        </FadeSection>
      </Section>

      {/* ════ Today ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <div className="history-section">
            <div className="history-era">
              <div className="history-year" style={{ color: T.gold }}>{t("history.today.year")}</div>
              <div className="history-era-label">{t("history.today.label")}</div>
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 32px)",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                marginBottom: 20,
                color: T.softBlack,
              }}
            >
              {t("history.today.title")}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.warmGray, marginBottom: 20 }}>
              {t("history.today.p1")}
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.warmGray }}>
              {t("history.today.p2")}
            </p>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
