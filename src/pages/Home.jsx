import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import Btn from "../components/Btn";
import TextReveal from "../components/TextReveal";

/* ── cross SVG for pattern overlays ── */
const CrossPattern = ({ opacity = 0.04 }) => (
  <svg
    aria-hidden="true"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }}
  >
    <defs>
      <pattern id="crossPattern" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M30 15 v30 M15 30 h30" stroke="#fff" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#crossPattern)" />
  </svg>
);

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: 76 }}>
      {/* ════ Hero ════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${T.burgundyDark} 0%, ${T.burgundy} 50%, ${T.burgundyDark} 100%)`,
          color: "#fff",
          textAlign: "center",
          padding: "clamp(80px, 14vw, 160px) 24px",
        }}
      >
        {/* decorative radial gradients */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-30%",
            left: "-10%",
            width: "60%",
            height: "120%",
            background: `radial-gradient(ellipse, ${T.burgundy}55 0%, transparent 70%)`,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-10%",
            width: "50%",
            height: "100%",
            background: `radial-gradient(ellipse, ${T.gold}15 0%, transparent 70%)`,
          }}
        />

        <CrossPattern />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: T.goldLight,
              marginBottom: 16,
              fontWeight: 600,
              animation: "fadeUp 0.8s ease",
            }}
          >
            {t("home.hero.subtitle")}
          </div>

          <TextReveal
            as="h1"
            stagger={0.09}
            duration={0.7}
            style={{
              fontSize: "clamp(40px, 7vw, 72px)",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 12,
              color: "#fff",
            }}
          >
            {t("home.hero.title")}
          </TextReveal>

          <div
            style={{
              fontSize: 16,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: T.goldLight,
              marginBottom: 40,
              animation: "fadeUp 1s ease 0.4s both",
            }}
          >
            {t("home.hero.location")}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 1s ease 0.6s both" }}>
            <Btn variant="gold" onClick={() => navigate("/visit")}>
              {t("home.hero.ctaVisit")}
            </Btn>
            <Btn variant="light" onClick={() => navigate("/mass-times")}>
              {t("home.hero.ctaMass")}
            </Btn>
          </div>
        </div>
      </section>

      {/* ════ Welcome ════ */}
      <Section>
        <FadeSection>
          <SectionTitle sub={t("home.welcome.sub")}>{t("home.welcome.title")}</SectionTitle>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: T.warmGray, marginBottom: 20 }}>
              {t("home.welcome.p1")}
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: T.warmGray, marginBottom: 32 }}>
              {t("home.welcome.p2")}
            </p>
            <Btn variant="primary" onClick={() => navigate("/about")}>
              {t("home.welcome.cta")}
            </Btn>
          </div>
        </FadeSection>
      </Section>

      {/* ════ Mass CTA ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 48,
              alignItems: "center",
            }}
          >
            {/* left text */}
            <div>
              <SectionTitle sub={t("home.massCta.sub")} center={false}>
                {t("home.massCta.title")}
              </SectionTitle>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: T.warmGray, marginBottom: 28 }}>
                {t("home.massCta.desc")}
              </p>
              <Btn variant="primary" onClick={() => navigate("/mass-times")}>
                {t("home.massCta.cta")}
              </Btn>
            </div>

            {/* right card — glassmorphic dark */}
            <div
              className="glass-card--dark"
              style={{
                color: "#fff",
                padding: 36,
              }}
            >
              <h3
                style={{
                  fontSize: 22,
                  color: T.goldLight,
                  fontFamily: "'Cormorant Garamond', serif",
                  marginBottom: 20,
                }}
              >
                {t("home.massCta.sundayMass")}
              </h3>
              {[
                [t("home.massCta.satVigil"), "5:00 PM"],
                [t("home.massCta.sun"), "8:00 AM"],
                [t("home.massCta.sun"), "10:30 AM"],
                [t("home.massCta.sunEspanol"), "12:30 PM"],
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
            </div>
          </div>
        </FadeSection>
      </Section>

      {/* ════ Dominican Charism — Editorial Cinematic Band ════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: T.softBlack,
          color: "#fff",
          padding: "clamp(60px, 12vw, 120px) 24px",
        }}
      >
        {/* Decorative Dominican star watermark */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 200"
          style={{
            position: "absolute",
            right: "-5%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(300px, 40vw, 500px)",
            height: "auto",
            opacity: 0.04,
          }}
        >
          <polygon points="100,10 120,80 195,80 135,120 155,190 100,150 45,190 65,120 5,80 80,80" fill="#fff" />
        </svg>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeSection>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 48,
                alignItems: "center",
              }}
              className="editorial-grid"
            >
              <style>{`
                @media (min-width: 768px) {
                  .editorial-grid { grid-template-columns: 1.2fr 1fr !important; }
                }
              `}</style>

              {/* Left — large editorial quote */}
              <div>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: 4,
                    textTransform: "uppercase",
                    color: T.gold,
                    marginBottom: 20,
                    fontWeight: 600,
                  }}
                >
                  {t("home.priests.sub")}
                </div>
                <blockquote
                  style={{
                    fontSize: "clamp(28px, 4vw, 44px)",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    color: "#fff",
                    lineHeight: 1.3,
                    marginBottom: 16,
                    borderLeft: `3px solid ${T.gold}`,
                    paddingLeft: 24,
                  }}
                >
                  <TextReveal as="span" stagger={0.06} duration={0.6}>
                    {t("home.priests.quote")}
                  </TextReveal>
                </blockquote>
                <cite
                  style={{
                    fontSize: 13,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: T.gold,
                    fontStyle: "normal",
                    paddingLeft: 28,
                  }}
                >
                  {t("home.priests.quoteSrc")}
                </cite>
              </div>

              {/* Right — text + CTA */}
              <div>
                <h2
                  style={{
                    fontSize: "clamp(26px, 4vw, 36px)",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    marginBottom: 20,
                    color: "#fff",
                  }}
                >
                  {t("home.priests.title")}
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>
                  {t("home.priests.desc")}
                </p>
                <Btn variant="gold" onClick={() => navigate("/staff")}>
                  {t("home.priests.cta")}
                </Btn>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ════ Get Involved CTA ════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${T.burgundyDark}, ${T.burgundy})`,
          padding: "clamp(48px, 10vw, 80px) 24px",
          textAlign: "center",
        }}
      >
        <CrossPattern />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <FadeSection>
            <SectionTitle sub={t("home.involved.sub")} light>
              {t("home.involved.title")}
            </SectionTitle>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.8)",
                marginBottom: 32,
              }}
            >
              {t("home.involved.desc")}
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn variant="gold" onClick={() => navigate("/get-involved")}>
                {t("home.involved.ctaRegister")}
              </Btn>
              <Btn variant="light" onClick={() => navigate("/bulletin")}>
                {t("home.involved.ctaBulletin")}
              </Btn>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ════ Quick Info Cards ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {[
              { key: "visit", icon: "🏛️", content: <p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.6 }}>{t("home.cards.visitDesc")}</p> },
              { key: "call", icon: "📞", content: <><p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.6 }}><a href={CONFIG.phoneLink} className="contact-link">{CONFIG.phone}</a></p><p style={{ fontSize: 14, color: T.warmGray }}>{t("home.cards.fax")}</p></> },
              { key: "hours", icon: "🕐", content: <p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.6 }}>{t("home.cards.hoursDesc")}</p> },
              { key: "email", icon: "✉️", content: <p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.6 }}><a href={`mailto:${CONFIG.email}`} className="contact-link">{CONFIG.email}</a></p> },
            ].map((card) => (
              <div
                key={card.key}
                className="glass-card"
                style={{ padding: 32, textAlign: "center" }}
              >
                <div aria-hidden="true" style={{ fontSize: 32, marginBottom: 12 }}>
                  {card.icon}
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontFamily: "'Cormorant Garamond', serif",
                    marginBottom: 8,
                  }}
                >
                  {t(`home.cards.${card.key}Title`)}
                </h3>
                {card.content}
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
