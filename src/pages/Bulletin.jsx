import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import Btn from "../components/Btn";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Icon from "../components/Icon";

export default function Bulletin() {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo title="Weekly Bulletin" description="Read the weekly parish bulletin from St. Dominic Catholic Parish with announcements, Mass intentions, and ministry news." />
      <PageHeader title={t("bulletin.title")} />

      <Section>
        <FadeSection>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <div aria-hidden="true" style={{ marginBottom: 16 }}>
              <Icon name="Newspaper" size={48} color={T.burgundy} />
            </div>

            <h2
              style={{
                fontSize: "clamp(26px, 4vw, 36px)",
                fontFamily: "'Cormorant Garamond', serif",
                marginBottom: 12,
                color: T.softBlack,
              }}
            >
              {t("bulletin.heading")}
            </h2>

            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.warmGray, marginBottom: 32 }}>
              {t("bulletin.desc")}
            </p>

            {/* ── current bulletin card ── */}
            <div
              style={{
                background: T.cream,
                borderRadius: 8,
                padding: 32,
                marginBottom: 28,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                style={{
                  fontSize: 20,
                  fontFamily: "'Cormorant Garamond', serif",
                  marginBottom: 8,
                  color: T.softBlack,
                }}
              >
                {t("bulletin.currentTitle")}
              </h3>
              <p style={{ fontSize: 15, color: T.warmGray, marginBottom: 20, lineHeight: 1.7 }}>
                {t("bulletin.currentDesc")}
              </p>
              <a
                href="https://saintdominic.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
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
                className="btn-hover"
              >
                {t("bulletin.linkText")}
              </a>
            </div>

            <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.7 }}>
              {t("bulletin.deadline")}
            </p>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
