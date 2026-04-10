import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import Btn from "../components/Btn";
import PageHeader from "../components/PageHeader";
import { useSchedule } from "../cms/hooks";

/* ── schedule card ── */
function ScheduleBlock({ title, rows, accent = T.burgundy, t }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ height: 4, background: accent }} />
      <div style={{ padding: 28 }}>
        <h3
          style={{
            fontSize: 20,
            fontFamily: "'Cormorant Garamond', serif",
            marginBottom: 16,
            color: T.softBlack,
          }}
        >
          {title}
        </h3>
        {rows.map(([dayKey, time], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom:
                i < rows.length - 1 ? `1px solid ${T.stone}` : "none",
              fontSize: 15,
            }}
          >
            <span style={{ color: T.charcoal }}>{t(`schedule.${dayKey}`)}</span>
            <span style={{ fontWeight: 600, color: T.softBlack }}>{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MassTimes() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: schedule } = useSchedule();
  const { sundayMass, dailyMass, confession, adoration } = schedule;

  return (
    <div style={{ paddingTop: 76 }}>
      <PageHeader title={t("massTimes.title")} />

      <Section>
        <FadeSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28,
            }}
          >
            <ScheduleBlock
              title={t("massTimes.sundayMass")}
              rows={sundayMass}
              accent={T.burgundy}
              t={t}
            />
            <ScheduleBlock
              title={t("massTimes.dailyMass")}
              rows={dailyMass}
              accent={T.burgundy}
              t={t}
            />
            <ScheduleBlock
              title={t("massTimes.confession")}
              rows={confession}
              accent={T.gold}
              t={t}
            />
            <ScheduleBlock
              title={t("massTimes.adoration")}
              rows={adoration}
              accent={T.gold}
              t={t}
            />
          </div>
        </FadeSection>
      </Section>

      {/* ── Holy Days ── */}
      <Section bg={T.cream}>
        <FadeSection>
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 36,
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              style={{
                fontSize: 22,
                fontFamily: "'Cormorant Garamond', serif",
                marginBottom: 12,
                color: T.softBlack,
              }}
            >
              {t("massTimes.holyDays")}
            </h3>
            <p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.8 }}>
              {t("massTimes.holyDaysDesc")}
            </p>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
