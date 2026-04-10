import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import Btn from "../components/Btn";
import PageHeader from "../components/PageHeader";

export default function About() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: 76 }}>
      <PageHeader title={t("about.title")} />

      {/* ════ History ════ */}
      <Section>
        <FadeSection>
          <SectionTitle sub={t("about.history.sub")}>{t("about.history.title")}</SectionTitle>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {["p1", "p2", "p3", "p4"].map((k) => (
              <p
                key={k}
                style={{
                  fontSize: 17,
                  lineHeight: 1.8,
                  color: T.warmGray,
                  marginBottom: 20,
                }}
              >
                {t(`about.history.${k}`)}
              </p>
            ))}
          </div>
        </FadeSection>
      </Section>

      {/* ════ Mission ════ */}
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
              { key: "word", icon: "\uD83D\uDCD6" },
              { key: "sacrament", icon: "\u271D\uFE0F" },
              { key: "service", icon: "\uD83E\uDD1D" },
            ].map(({ key, icon }) => (
              <div
                key={key}
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: 32,
                  textAlign: "center",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div aria-hidden="true" style={{ fontSize: 36, marginBottom: 12 }}>
                  {icon}
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

      {/* ════ Architecture ════ */}
      <Section>
        <FadeSection>
          <div
            style={{
              background: `linear-gradient(135deg, ${T.stone}, ${T.stoneLight})`,
              borderRadius: 8,
              padding: "clamp(32px, 6vw, 56px)",
              maxWidth: 800,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(24px, 4vw, 34px)",
                fontFamily: "'Cormorant Garamond', serif",
                marginBottom: 16,
                color: T.softBlack,
              }}
            >
              {t("about.architecture.title")}
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.warmGray }}>
              {t("about.architecture.desc")}
            </p>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
