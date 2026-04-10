import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import Btn from "../components/Btn";
import PageHeader from "../components/PageHeader";
import { initials } from "../data/staff";
import { useStaff } from "../cms/hooks";

export default function Staff() {
  const { t } = useTranslation();
  const { data: staffData } = useStaff();
  const { friars, staff } = staffData;

  return (
    <div style={{ paddingTop: 76 }}>
      <PageHeader title={t("staff.title")} />

      {/* ════ Friars ════ */}
      <Section>
        <FadeSection>
          <SectionTitle sub={t("staff.friars.sub")}>{t("staff.friars.title")}</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
            }}
          >
            {friars.map((s) => (
              <div
                key={s.id}
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: 32,
                  textAlign: "center",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: T.burgundy,
                    color: T.goldLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    margin: "0 auto 16px",
                  }}
                >
                  {initials(s.name)}
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontFamily: "'Cormorant Garamond', serif",
                    marginBottom: 6,
                    color: T.softBlack,
                  }}
                >
                  {s.name}
                </h3>
                <p style={{ fontSize: 14, color: T.warmGray, textTransform: "uppercase", letterSpacing: 1 }}>
                  {t(`staff.roles.${s.role}`)}
                </p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      {/* ════ Staff ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <SectionTitle sub={t("staff.staff.sub")}>{t("staff.staff.title")}</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
            }}
          >
            {staff.map((s) => (
              <div
                key={s.id}
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: 28,
                  textAlign: "center",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: T.stone,
                    color: T.warmGray,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    margin: "0 auto 14px",
                  }}
                >
                  {initials(s.name)}
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontFamily: "'Cormorant Garamond', serif",
                    marginBottom: 6,
                    color: T.softBlack,
                  }}
                >
                  {s.name}
                </h3>
                <p style={{ fontSize: 13, color: T.warmGray, textTransform: "uppercase", letterSpacing: 1 }}>
                  {t(`staff.roles.${s.role}`)}
                </p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
