import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";

const FOOTER_LINKS = [
  { to: "/mass-times", key: "massTimes" },
  { to: "/sacraments", key: "sacraments" },
  { to: "/about", key: "about" },
  { to: "/history", key: "history" },
  { to: "/architecture", key: "architecture" },
  { to: "/staff", key: "staff" },
  { to: "/bulletin", key: "bulletin" },
  { to: "/becoming-catholic", key: "becomingCatholic" },
  { to: "/get-involved", key: "getInvolved" },
  { to: "/register", key: "register" },
  { to: "/events", key: "events" },
  { to: "/contact", key: "contact" },
  { to: "/give", key: "give" },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer style={{ background: T.softBlack, color: "rgba(255,255,255,0.7)", padding: "60px 24px 36px" }}>
      <div
        style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40,
        }}
      >
        {/* About column */}
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: T.gold, marginBottom: 12 }}>
            St. Dominic
          </div>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, color: "rgba(255,255,255,0.7)" }}>
            {t("footer.subtitle")}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.8 }}>{t("footer.description")}</p>
        </div>

        {/* Quick links */}
        <div>
          <h4 style={{ color: T.goldLight, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
            {t("footer.quickLinks")}
          </h4>
          {FOOTER_LINKS.map((l) => (
            <div key={l.to}>
              <Link
                to={l.to}
                style={{
                  display: "inline-block",
                  color: "rgba(255,255,255,0.7)", textDecoration: "none",
                  fontSize: 14, padding: "6px 0",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                {t(`nav.${l.key}`)}
              </Link>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: T.goldLight, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
            {t("footer.contactTitle")}
          </h4>
          <p style={{ fontSize: 14, lineHeight: 2 }}>
            {CONFIG.address}
            <br />
            {CONFIG.city}, {CONFIG.state} {CONFIG.zip}
            <br />
            <a href={CONFIG.phoneLink} className="contact-link">{CONFIG.phone}</a>
            <br />
            <a href={`mailto:${CONFIG.email}`} className="contact-link">{CONFIG.email}</a>
          </p>
          <p style={{ fontSize: 13, marginTop: 8, color: "rgba(255,255,255,0.7)" }}>
            {t("footer.officeHours")}: {CONFIG.officeHours}
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1100, margin: "40px auto 0", paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.55)",
        }}
      >
        © {new Date().getFullYear()} St. Dominic Catholic Parish · Youngstown, OH · {t("footer.rights")}
      </div>
    </footer>
  );
}
