import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import PageHeader from "../components/PageHeader";
import { initials } from "../data/staff";
import { useStaff } from "../cms/hooks";
import Seo from "../components/Seo";
import { X, Mail, Phone } from "lucide-react";

const AVATAR = {
  leadership: {
    bg: `linear-gradient(135deg, #4A1019, #6B1D2A)`,
    color: "#E8D5A3",
    border: `3px solid #C5A55A`,
    boxShadow: "0 4px 20px rgba(107, 29, 42, 0.25)",
  },
  residence: {
    bg: "#2C2C2C",
    color: "rgba(255,255,255,0.7)",
    border: "2px solid rgba(255,255,255,0.15)",
    boxShadow: "none",
  },
  staff: {
    bg: `linear-gradient(135deg, #C5A55A, #E8D5A3)`,
    color: "#1A1714",
    border: `2px solid #E8E2D8`,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
};

export default function Staff() {
  const { t } = useTranslation();
  const { data: staffData } = useStaff();
  const { friars, staff } = staffData;
  const [selected, setSelected] = useState(null);

  const leadership = friars.filter((f) => f.role === "pastor" || f.role === "associate");
  const inResidence = friars.filter((f) => f.role === "inResidence");

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  const renderAvatar = (name, group, size) => {
    const c = AVATAR[group];
    return (
      <div
        className="staff-avatar"
        style={{
          width: size,
          height: size,
          minWidth: size,
          borderRadius: "50%",
          background: c.bg,
          color: c.color,
          border: c.border,
          boxShadow: c.boxShadow,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 700,
          fontSize: Math.round(size * 0.32),
          margin: "0 auto",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {initials(name)}
      </div>
    );
  };

  const renderCard = (person, group) => {
    const isLeader = group === "leadership";
    const isDark = group === "residence";
    const size = isLeader ? 100 : 72;

    return (
      <div
        key={person.id}
        className={`staff-card ${isDark ? "staff-card-dark" : "staff-card-light"}`}
        role="button"
        tabIndex={0}
        aria-label={`${person.name}, ${t(`staff.roles.${person.role}`)}`}
        onClick={() => setSelected({ ...person, group })}
        onKeyDown={(e) => e.key === "Enter" && setSelected({ ...person, group })}
      >
        {renderAvatar(person.name, group, size)}
        <h3
          style={{
            fontSize: isLeader ? 22 : 18,
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            marginTop: 16,
            marginBottom: 8,
            color: isDark ? "#fff" : T.softBlack,
          }}
        >
          {person.name}
        </h3>
        <div
          style={{
            display: "inline-block",
            padding: "4px 14px",
            background: isLeader
              ? T.burgundy
              : isDark
              ? "rgba(255,255,255,0.1)"
              : T.stoneLight,
            color: isLeader ? "#fff" : isDark ? T.goldLight : T.warmGray,
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
            borderRadius: 20,
            fontWeight: 600,
          }}
        >
          {t(`staff.roles.${person.role}`)}
        </div>
        <div
          className="staff-hint"
          style={{ color: isDark ? "rgba(255,255,255,0.4)" : T.warmGray }}
        >
          {t("staff.clickHint")}
        </div>
      </div>
    );
  };

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo
        title="Priests & Staff"
        description="Meet the Dominican Friars and parish staff serving the community at St. Dominic Catholic Parish in Youngstown, Ohio."
      />
      <PageHeader title={t("staff.title")} />

      <style>{`
        .staff-card {
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          cursor: pointer;
          position: relative;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.35s ease,
                      background 0.35s ease;
        }
        .staff-card-light {
          background: #fff;
          border: 1px solid ${T.stone};
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .staff-card-light:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.1);
          border-color: ${T.gold};
        }
        .staff-card-dark {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .staff-card-dark:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
          border-color: ${T.gold};
          background: rgba(255,255,255,0.08);
        }
        .staff-card:hover .staff-avatar {
          transform: scale(1.08);
        }
        .staff-card:focus-visible {
          outline: 2px solid ${T.burgundy};
          outline-offset: 2px;
        }
        .staff-hint {
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-top: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .staff-card:hover .staff-hint {
          opacity: 1;
        }
        .staff-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: staffFadeIn 0.2s ease;
        }
        .staff-modal {
          background: #fff;
          border-radius: 16px;
          max-width: 480px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: staffSlideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
        }
        .staff-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
          z-index: 1;
        }
        .staff-modal-close:hover {
          opacity: 0.8;
        }
        @keyframes staffFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes staffSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* ════ Parish Leadership ════ */}
      <Section>
        <FadeSection>
          <SectionTitle sub={t("staff.leadership.sub")}>
            {t("staff.leadership.title")}
          </SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 32,
              maxWidth: 680,
              margin: "0 auto",
            }}
          >
            {leadership.map((s) => renderCard(s, "leadership"))}
          </div>
        </FadeSection>
      </Section>

      {/* ════ Friars in Residence ════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: T.softBlack,
          padding: "clamp(48px, 10vw, 80px) 24px",
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
              id="staffCross"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 15 v30 M15 30 h30"
                stroke="#fff"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#staffCross)" />
        </svg>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <FadeSection>
            <SectionTitle sub={t("staff.residence.sub")} light>
              {t("staff.residence.title")}
            </SectionTitle>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 24,
                maxWidth: 800,
                margin: "0 auto",
              }}
            >
              {inResidence.map((s) => renderCard(s, "residence"))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ════ Parish Staff ════ */}
      <Section bg={T.cream}>
        <FadeSection>
          <SectionTitle sub={t("staff.staff.sub")}>
            {t("staff.staff.title")}
          </SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 28,
              maxWidth: 680,
              margin: "0 auto",
            }}
          >
            {staff.map((s) => renderCard(s, "staff"))}
          </div>
        </FadeSection>
      </Section>

      {/* ════ Staff Modal ════ */}
      {selected && (
        <div
          className="staff-modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="staff-modal" role="dialog" aria-modal="true">
            <button
              className="staff-modal-close"
              onClick={close}
              aria-label="Close"
              style={{
                background:
                  selected.group === "staff"
                    ? "rgba(0,0,0,0.08)"
                    : "rgba(255,255,255,0.2)",
              }}
            >
              <X
                size={18}
                color={selected.group === "staff" ? T.softBlack : "#fff"}
              />
            </button>

            {/* Modal header with colored background */}
            <div
              style={{
                background:
                  selected.group === "leadership"
                    ? `linear-gradient(135deg, ${T.burgundyDark}, ${T.burgundy})`
                    : selected.group === "residence"
                    ? T.softBlack
                    : `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`,
                padding: "48px 32px 32px",
                textAlign: "center",
                borderRadius: "16px 16px 0 0",
              }}
            >
              {renderAvatar(selected.name, selected.group, 120)}
              <h2
                style={{
                  fontSize: 28,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  color: selected.group === "staff" ? T.softBlack : "#fff",
                  marginTop: 20,
                  marginBottom: 8,
                  lineHeight: 1.2,
                }}
              >
                {selected.name}
              </h2>
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 16px",
                  background:
                    selected.group === "staff"
                      ? "rgba(0,0,0,0.08)"
                      : "rgba(255,255,255,0.15)",
                  color:
                    selected.group === "staff" ? T.softBlack : T.goldLight,
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  borderRadius: 20,
                  fontWeight: 600,
                }}
              >
                {t(`staff.roles.${selected.role}`)}
              </div>
            </div>

            {/* Modal body */}
            <div style={{ padding: 32 }}>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: T.warmGray,
                  marginBottom: 24,
                }}
              >
                {t(`staff.bios.${selected.id}`)}
              </p>

              <div
                style={{
                  borderTop: `1px solid ${T.stone}`,
                  paddingTop: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: T.warmGray,
                    marginBottom: 12,
                    fontWeight: 600,
                  }}
                >
                  {t("staff.modal.contact")}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <a
                    href={CONFIG.phoneLink}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: T.softBlack,
                      textDecoration: "none",
                      fontSize: 15,
                    }}
                  >
                    <Phone size={16} color={T.burgundy} />
                    {CONFIG.phone}
                  </a>
                  <a
                    href={`mailto:${CONFIG.email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: T.softBlack,
                      textDecoration: "none",
                      fontSize: 15,
                    }}
                  >
                    <Mail size={16} color={T.burgundy} />
                    {CONFIG.email}
                  </a>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: T.warmGray,
                    fontStyle: "italic",
                    marginTop: 12,
                  }}
                >
                  {t("staff.modal.reachVia")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
