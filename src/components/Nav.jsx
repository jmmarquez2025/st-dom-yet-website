import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import LanguageToggle from "./LanguageToggle";

const NAV_LINKS = [
  { to: "/", key: "home" },
  { to: "/visit", key: "visit" },
  { to: "/mass-times", key: "massTimes" },
  { to: "/sacraments", key: "sacraments" },
  { to: "/about", key: "about" },
  { to: "/staff", key: "staff" },
  { to: "/get-involved", key: "getInvolved" },
];

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // Throttled scroll handler
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  const isActive = useCallback(
    (to) => (to === "/" ? location.pathname === "/" : location.pathname.startsWith(to)),
    [location.pathname]
  );

  return (
    <nav
      ref={menuRef}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,253,249,0.97)" : "rgba(255,253,249,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? `1px solid ${T.stone}` : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: scrolled ? 64 : 76, transition: "height 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: "50%", background: T.burgundy,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: T.gold, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 18,
            }}
          >
            SD
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 17, color: T.burgundy, lineHeight: 1.1, letterSpacing: 0.5 }}>
              St. Dominic
            </div>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: T.warmGray, fontWeight: 500 }}>
              {t("nav.subtitle")}
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="nav-desktop">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                textDecoration: "none", padding: "8px 12px", fontSize: 13.5,
                fontWeight: isActive(l.to) ? 600 : 400,
                color: isActive(l.to) ? T.burgundy : T.charcoal,
                borderBottom: isActive(l.to) ? `2px solid ${T.gold}` : "2px solid transparent",
                transition: "all 0.3s",
                fontFamily: "'Source Sans 3', sans-serif", letterSpacing: 0.3,
              }}
            >
              {t(`nav.${l.key}`)}
            </Link>
          ))}
          <Link
            to="/give"
            style={{
              textDecoration: "none", padding: "8px 16px", fontSize: 13, fontWeight: 600,
              background: T.gold, color: T.softBlack, borderRadius: 2, letterSpacing: 0.5,
              fontFamily: "'Source Sans 3', sans-serif", marginLeft: 4,
            }}
          >
            {t("nav.give")}
          </Link>
          <div style={{ marginLeft: 6 }}>
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="nav-mobile-toggle"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 8, fontSize: 24, color: T.burgundy, lineHeight: 1,
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: T.warmWhite, borderTop: `1px solid ${T.stone}`,
            padding: "12px 24px 20px", animation: "slideDown 0.3s ease",
            maxHeight: "calc(100vh - 76px)", overflowY: "auto",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                display: "block", textDecoration: "none", padding: "14px 0", fontSize: 16,
                fontWeight: isActive(l.to) ? 600 : 400,
                color: isActive(l.to) ? T.burgundy : T.charcoal,
                borderBottom: `1px solid ${T.stoneLight}`,
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              {t(`nav.${l.key}`)}
            </Link>
          ))}
          <Link
            to="/give"
            style={{
              display: "block", textDecoration: "none", padding: "14px 0", fontSize: 16,
              fontWeight: isActive("/give") ? 600 : 400,
              color: T.gold, borderBottom: `1px solid ${T.stoneLight}`,
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            {t("nav.give")}
          </Link>
          <Link
            to="/bulletin"
            style={{
              display: "block", textDecoration: "none", padding: "14px 0", fontSize: 16,
              fontWeight: isActive("/bulletin") ? 600 : 400,
              color: isActive("/bulletin") ? T.burgundy : T.charcoal,
              borderBottom: `1px solid ${T.stoneLight}`,
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            {t("nav.bulletin")}
          </Link>
          <Link
            to="/contact"
            style={{
              display: "block", textDecoration: "none", padding: "14px 0", fontSize: 16,
              fontWeight: isActive("/contact") ? 600 : 400,
              color: isActive("/contact") ? T.burgundy : T.charcoal,
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            {t("nav.contact")}
          </Link>
          <div style={{ paddingTop: 16 }}>
            <LanguageToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
