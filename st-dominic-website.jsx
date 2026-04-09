import { useState, useEffect, useRef } from "react";

const PAGES = {
  HOME: "home",
  MASS_TIMES: "mass-times",
  ABOUT: "about",
  STAFF: "staff",
  BULLETIN: "bulletin",
  BECOMING_CATHOLIC: "becoming-catholic",
  GET_INVOLVED: "get-involved",
};

/* ─── design tokens ─── */
const T = {
  burgundy: "#6B1D2A",
  burgundyDark: "#4A1019",
  gold: "#C5A55A",
  goldLight: "#E8D5A3",
  cream: "#FAF6F0",
  warmWhite: "#FFFDF9",
  stone: "#E8E2D8",
  stoneLight: "#F2EDE5",
  charcoal: "#2C2C2C",
  warmGray: "#6B6560",
  softBlack: "#1A1714",
};

/* ─── fonts via google ─── */
const fontLink = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600&display=swap";

/* ─── global styles ─── */
const globalCSS = `
@import url('${fontLink}');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: 'Source Sans 3', sans-serif;
  color: ${T.charcoal};
  background: ${T.warmWhite};
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  line-height: 1.2;
  color: ${T.softBlack};
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-section {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.fade-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* accessibility */
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 9999;
  padding: 12px 24px;
  background: ${T.burgundy};
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0 0 4px 4px;
}
.skip-link:focus {
  top: 0;
}

:focus-visible {
  outline: 2px solid ${T.gold};
  outline-offset: 2px;
}
button:focus-visible {
  outline: 2px solid ${T.gold};
  outline-offset: 2px;
}

/* hover utilities (replaces inline JS handlers) */
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.08);
}
.hover-lift-sm {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift-sm:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}
.btn-hover {
  transition: all 0.3s ease;
}
.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
}

/* clickable contact links */
a.contact-link {
  color: inherit;
  text-decoration: none;
}
a.contact-link:hover {
  text-decoration: underline;
}
`;

/* ─── reusable hooks ─── */
function useScrollFade() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, style, className = "" }) {
  const ref = useScrollFade();
  return <div ref={ref} className={`fade-section ${className}`} style={style}>{children}</div>;
}

/* ─── nav ─── */
function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { key: PAGES.HOME, label: "Home" },
    { key: PAGES.MASS_TIMES, label: "Mass & Confession" },
    { key: PAGES.ABOUT, label: "About" },
    { key: PAGES.STAFF, label: "Priests & Staff" },
    { key: PAGES.BULLETIN, label: "Bulletin" },
    { key: PAGES.BECOMING_CATHOLIC, label: "Becoming Catholic" },
    { key: PAGES.GET_INVOLVED, label: "Get Involved" },
  ];

  const go = (k) => { setPage(k); setOpen(false); window.scrollTo({ top: 0 }); };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,253,249,0.97)" : "rgba(255,253,249,0.85)",
      backdropFilter: "blur(12px)", borderBottom: scrolled ? `1px solid ${T.stone}` : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 64 : 76, transition: "height 0.4s ease" }}>
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }} onClick={() => go(PAGES.HOME)}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.burgundy, display: "flex", alignItems: "center", justifyContent: "center", color: T.gold, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 18 }}>SD</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 17, color: T.burgundy, lineHeight: 1.1, letterSpacing: 0.5 }}>St. Dominic</div>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: T.warmGray, fontWeight: 500 }}>Catholic Parish</div>
          </div>
        </div>

        {/* desktop links */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }} className="nav-desktop">
          {links.map(l => (
            <button key={l.key} onClick={() => go(l.key)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "8px 14px", fontSize: 13.5,
              fontWeight: page === l.key ? 600 : 400, color: page === l.key ? T.burgundy : T.charcoal,
              borderBottom: page === l.key ? `2px solid ${T.gold}` : "2px solid transparent",
              transition: "all 0.3s", fontFamily: "'Source Sans 3', sans-serif", letterSpacing: 0.3,
            }}>{l.label}</button>
          ))}
        </div>

        {/* mobile toggle */}
        <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, fontSize: 24, color: T.burgundy, lineHeight: 1 }} className="nav-mobile-toggle">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div style={{ background: T.warmWhite, borderTop: `1px solid ${T.stone}`, padding: "12px 24px 20px", animation: "slideDown 0.3s ease" }} className="nav-mobile-menu">
          {links.map(l => (
            <button key={l.key} onClick={() => go(l.key)} style={{
              display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
              padding: "12px 0", fontSize: 16, fontWeight: page === l.key ? 600 : 400, color: page === l.key ? T.burgundy : T.charcoal,
              borderBottom: `1px solid ${T.stoneLight}`, fontFamily: "'Source Sans 3', sans-serif",
            }}>{l.label}</button>
          ))}
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile-toggle { display: none !important; }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

/* ─── CTA button ─── */
function Btn({ children, onClick, variant = "primary", style: s = {} }) {
  const base = {
    display: "inline-block", padding: "14px 32px", fontSize: 14, fontWeight: 600, letterSpacing: 1.2,
    textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 2,
    fontFamily: "'Source Sans 3', sans-serif", transition: "all 0.3s ease",
  };
  const variants = {
    primary: { background: T.burgundy, color: T.cream, ...base },
    outline: { background: "transparent", color: T.burgundy, border: `2px solid ${T.burgundy}`, ...base },
    gold: { background: T.gold, color: T.softBlack, ...base },
    light: { background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", ...base, backdropFilter: "blur(4px)" },
  };
  return <button onClick={onClick} className="btn-hover" style={{ ...variants[variant], ...s }}>{children}</button>;
}

/* ─── section wrapper ─── */
function Section({ children, bg = T.warmWhite, style: s = {}, id }) {
  return <section id={id} style={{ padding: "80px 24px", background: bg, ...s }}><div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div></section>;
}

function SectionTitle({ children, sub, light, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 48 }}>
      {sub && <div style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: light ? T.goldLight : T.gold, fontWeight: 600, marginBottom: 8 }}>{sub}</div>}
      <h2 style={{ fontSize: "clamp(28px, 5vw, 42px)", color: light ? "#fff" : T.softBlack, fontWeight: 600 }}>{children}</h2>
      <div style={{ width: 60, height: 3, background: T.gold, margin: center ? "16px auto 0" : "16px 0 0", borderRadius: 2 }} />
    </div>
  );
}

/* ─── footer ─── */
function Footer({ setPage }) {
  const go = (k) => { setPage(k); window.scrollTo({ top: 0 }); };
  return (
    <footer style={{ background: T.softBlack, color: "rgba(255,255,255,0.7)", padding: "60px 24px 36px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40 }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: T.gold, marginBottom: 12 }}>St. Dominic</div>
          <div style={{ fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, color: "rgba(255,255,255,0.7)" }}>Catholic Parish · Youngstown, OH</div>
          <p style={{ fontSize: 14, lineHeight: 1.8 }}>Served by the Dominican Friars of the Province of St. Joseph. Bringing the riches of Christ to Youngstown since 1923.</p>
        </div>
        <div>
          <h4 style={{ color: T.goldLight, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Quick Links</h4>
          {[["Mass & Confession", PAGES.MASS_TIMES], ["About Us", PAGES.ABOUT], ["Priests & Staff", PAGES.STAFF], ["Weekly Bulletin", PAGES.BULLETIN], ["Becoming Catholic", PAGES.BECOMING_CATHOLIC], ["Get Involved", PAGES.GET_INVOLVED]].map(([label, key]) => (
            <div key={key}><button onClick={() => go(key)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 14, padding: "4px 0", fontFamily: "'Source Sans 3', sans-serif" }}>{label}</button></div>
          ))}
        </div>
        <div>
          <h4 style={{ color: T.goldLight, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Contact</h4>
          <p style={{ fontSize: 14, lineHeight: 2 }}>77 East Lucius Avenue<br />Youngstown, OH 44507<br /><a href="tel:+13307831900" className="contact-link">(330) 783-1900</a><br /><a href="mailto:office@saintdominic.org" className="contact-link">office@saintdominic.org</a></p>
          <p style={{ fontSize: 13, marginTop: 8, color: "rgba(255,255,255,0.7)" }}>Office Hours: Mon–Fri, 8:30 AM – 1:30 PM</p>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: "40px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
        © {new Date().getFullYear()} St. Dominic Catholic Parish · Youngstown, OH · All Rights Reserved
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   PAGE: HOME
   ══════════════════════════════════════════════ */
function HomePage({ setPage }) {
  const go = (k) => { setPage(k); window.scrollTo({ top: 0 }); };

  return (
    <div>
      {/* Hero */}
      <div style={{
        minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(165deg, ${T.burgundyDark} 0%, ${T.burgundy} 40%, #8B3040 100%)`,
        position: "relative", overflow: "hidden", padding: "120px 24px 80px",
      }}>
        {/* decorative elements */}
        <div aria-hidden="true" style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,165,90,0.12) 0%, transparent 70%)" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(197,165,90,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A55A' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: 720, animation: "fadeUp 1s ease" }}>
          <div style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: T.goldLight, marginBottom: 20, fontWeight: 500 }}>Served by the Dominican Friars</div>
          <h1 style={{ fontSize: "clamp(40px, 7vw, 72px)", color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, lineHeight: 1.05, marginBottom: 16 }}>
            St. Dominic<br />Catholic Parish
          </h1>
          <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: "rgba(255,255,255,0.8)", fontWeight: 300, marginBottom: 40, lineHeight: 1.6 }}>
            Youngstown, Ohio
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            <Btn onClick={() => go(PAGES.MASS_TIMES)} variant="gold">Mass & Confession Times</Btn>
            <Btn onClick={() => go(PAGES.BECOMING_CATHOLIC)} variant="light">Interested in Becoming Catholic?</Btn>
          </div>
        </div>
      </div>

      {/* Welcome */}
      <Section bg={T.warmWhite}>
        <FadeSection>
          <SectionTitle sub="Welcome">Encounter Jesus Christ with Us</SectionTitle>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: 17, color: T.warmGray, lineHeight: 1.9, marginBottom: 24 }}>
              St. Dominic Parish has been a center of faith, liturgy, and preaching in the heart of Youngstown's south side since 1923. Led by the Dominican Friars of the Province of St. Joseph, we are devoted to forming faithful disciples in the rich liturgical and intellectual tradition of the Catholic Church.
            </p>
            <p style={{ fontSize: 17, color: T.warmGray, lineHeight: 1.9, marginBottom: 36 }}>
              Our doors are open to everyone — lifelong Catholics, those returning to the faith, and anyone seeking truth. Join us in growing closer to Christ through Word, Sacrament, and Service.
            </p>
            <Btn onClick={() => go(PAGES.ABOUT)}>About Us</Btn>
          </div>
        </FadeSection>
      </Section>

      {/* Mass CTA */}
      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
            <div>
              <SectionTitle sub="Worship" center={false}>Come Worship with Us</SectionTitle>
              <p style={{ fontSize: 16, color: T.warmGray, lineHeight: 1.8, marginBottom: 28 }}>
                Join us! We'd love to welcome you to our beautiful Romanesque church. Whether you're visiting Youngstown or looking for a new parish home, find our Mass and Confession times below.
              </p>
              <Btn onClick={() => go(PAGES.MASS_TIMES)}>See Mass & Confession Times</Btn>
            </div>
            <div style={{ background: T.burgundy, borderRadius: 4, padding: 40, color: "#fff", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: "radial-gradient(circle, rgba(197,165,90,0.2) 0%, transparent 70%)" }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: T.goldLight, marginBottom: 20 }}>Sunday Mass</h3>
              <div style={{ fontSize: 15, lineHeight: 2.2 }}>
                <div><strong style={{ color: T.goldLight }}>Saturday Vigil:</strong> 5:00 PM</div>
                <div><strong style={{ color: T.goldLight }}>Sunday:</strong> 8:00 AM</div>
                <div><strong style={{ color: T.goldLight }}>Sunday:</strong> 10:30 AM</div>
                <div><strong style={{ color: T.goldLight }}>Sunday (Español):</strong> 12:30 PM</div>
              </div>
            </div>
          </div>
        </FadeSection>
      </Section>

      {/* Priests CTA */}
      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
            <div style={{ background: `linear-gradient(135deg, ${T.stone} 0%, ${T.stoneLight} 100%)`, borderRadius: 4, padding: 48, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 280 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>☩</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: T.warmGray }}>
                  "To praise, to bless, and to preach."
                </div>
                <div style={{ fontSize: 13, color: T.warmGray, marginTop: 8, letterSpacing: 1 }}>— Motto of the Dominican Order</div>
              </div>
            </div>
            <div>
              <SectionTitle sub="Our Team" center={false}>Priests & Staff</SectionTitle>
              <p style={{ fontSize: 16, color: T.warmGray, lineHeight: 1.8, marginBottom: 28 }}>
                Our dedicated team of Dominican friars and parish staff are here to provide spiritual guidance, support, and resources to help you grow in your Catholic faith.
              </p>
              <Btn onClick={() => go(PAGES.STAFF)}>Meet Our Priests & Staff</Btn>
            </div>
          </div>
        </FadeSection>
      </Section>

      {/* Get Involved */}
      <div style={{ background: `linear-gradient(165deg, ${T.burgundyDark} 0%, ${T.burgundy} 100%)`, padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A55A' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <FadeSection>
          <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <SectionTitle sub="Get Involved" light>Become a Parishioner</SectionTitle>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.8 }}>
              Explore St. Dominic's! We have vibrant ministries, community events, a Hispanic ministry program, and many service opportunities. Come be a part of our family.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              <Btn onClick={() => go(PAGES.GET_INVOLVED)} variant="gold">Register in the Parish</Btn>
              <Btn onClick={() => go(PAGES.BULLETIN)} variant="light">Recent Bulletins</Btn>
            </div>
          </div>
        </FadeSection>
      </div>

      {/* Quick info cards */}
      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { icon: "⛪", title: "Visit Us", desc: "77 East Lucius Ave\nYoungstown, OH 44507" },
              { icon: "📞", title: "Call Us", desc: null, link: "tel:+13307831900", linkText: "(330) 783-1900", extra: "Fax: (330) 783-2396" },
              { icon: "🕐", title: "Office Hours", desc: "Monday – Friday\n8:30 AM – 1:30 PM" },
              { icon: "✉️", title: "Email Us", desc: null, link: "mailto:office@saintdominic.org", linkText: "office@saintdominic.org" },
            ].map((c, i) => (
              <div key={i} className="hover-lift" style={{
                background: T.warmWhite, padding: 32, borderRadius: 4, textAlign: "center",
                border: `1px solid ${T.stone}`,
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">{c.icon}</div>
                <h4 style={{ fontSize: 18, marginBottom: 8, color: T.burgundy }}>{c.title}</h4>
                {c.desc && <p style={{ fontSize: 14, color: T.warmGray, whiteSpace: "pre-line", lineHeight: 1.7 }}>{c.desc}</p>}
                {c.link && <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.7 }}><a href={c.link} className="contact-link" style={{ color: T.burgundy, fontWeight: 500 }}>{c.linkText}</a>{c.extra && <><br />{c.extra}</>}</p>}
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE: MASS TIMES
   ══════════════════════════════════════════════ */
function MassTimesPage() {
  const scheduleBlock = (title, items, accent = T.burgundy) => (
    <div style={{ background: T.warmWhite, borderRadius: 4, padding: 36, border: `1px solid ${T.stone}`, borderTop: `4px solid ${accent}` }}>
      <h3 style={{ fontSize: 24, color: accent, marginBottom: 20, fontFamily: "'Cormorant Garamond', serif" }}>{title}</h3>
      {items.map(([day, times], i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < items.length - 1 ? `1px solid ${T.stoneLight}` : "none", fontSize: 15 }}>
          <span style={{ fontWeight: 600, color: T.softBlack }}>{day}</span>
          <span style={{ color: T.warmGray, textAlign: "right" }}>{times}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ paddingTop: 76 }}>
      <div style={{ background: T.burgundy, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>Mass & Confession Times</h1>
        <div style={{ width: 60, height: 3, background: T.gold, margin: "16px auto 0" }} />
      </div>

      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32 }}>
            {scheduleBlock("Sunday Mass Schedule", [
              ["Saturday Vigil", "5:00 PM"],
              ["Sunday", "8:00 AM"],
              ["Sunday", "10:30 AM"],
              ["Sunday (Español)", "12:30 PM"],
            ])}
            {scheduleBlock("Daily Mass Schedule", [
              ["Monday", "8:00 AM, 12:00 PM"],
              ["Tuesday", "8:00 AM, 12:00 PM"],
              ["Wednesday", "8:00 AM, 12:00 PM"],
              ["Thursday", "8:00 AM, 12:00 PM"],
              ["Friday", "8:00 AM, 12:00 PM"],
              ["Saturday", "8:00 AM"],
            ])}
          </div>
        </FadeSection>

        <FadeSection style={{ marginTop: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32 }}>
            {scheduleBlock("Confession Schedule", [
              ["Wednesday", "11:15 AM – 11:55 AM"],
              ["Friday", "11:15 AM – 11:55 AM"],
              ["Saturday", "11:15 AM – 11:55 AM"],
              ["Saturday", "4:00 PM – 4:55 PM"],
              ["Sunday (Español)", "11:30 AM – 11:55 AM"],
            ], T.gold)}
            {scheduleBlock("Adoration & Devotions", [
              ["Tuesday", "12:30 PM – 4:45 PM"],
              ["Tuesday", "4:45 PM Evening Prayer"],
            ], T.gold)}
          </div>
        </FadeSection>

        <FadeSection style={{ marginTop: 32 }}>
          <div style={{ background: T.warmWhite, borderRadius: 4, padding: 32, border: `1px solid ${T.stone}`, textAlign: "center" }}>
            <h3 style={{ fontSize: 22, color: T.burgundy, marginBottom: 12, fontFamily: "'Cormorant Garamond', serif" }}>Holy Days of Obligation</h3>
            <p style={{ color: T.warmGray, fontSize: 15, lineHeight: 1.8 }}>
              Vigil: 5:00 PM · Holy Day: 8:00 AM, 12:00 PM, 7:00 PM (Español)
            </p>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE: ABOUT
   ══════════════════════════════════════════════ */
function AboutPage() {
  return (
    <div style={{ paddingTop: 76 }}>
      <div style={{ background: T.burgundy, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>About Our Parish</h1>
        <div style={{ width: 60, height: 3, background: T.gold, margin: "16px auto 0" }} />
      </div>

      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <SectionTitle sub="Our History">A Legacy of Faith Since 1923</SectionTitle>
            <div style={{ fontSize: 16, color: T.warmGray, lineHeight: 2 }}>
              <p style={{ marginBottom: 20 }}>The Dominican Order of Preachers founded St. Dominic Parish on February 23, 1923, at the invitation of Cleveland Archbishop Joseph Schrembs. The first Mass was offered in a storeroom on Market Street — a humble beginning for what would become a vibrant center of faith on Youngstown's south side.</p>
              <p style={{ marginBottom: 20 }}>The current building, a stunning limestone-and-brick Romanesque structure, was dedicated on April 28, 1957. A life-size statue of Saint Dominic stands positioned over the entrance, welcoming all who come to worship.</p>
              <p style={{ marginBottom: 20 }}>Saint Dominic de Guzman founded the Dominican Order in the 13th century, devoted to rekindling the faith of Europe. In the centuries since, Dominicans have spread around the world with their motto: "to praise, to bless, and to preach." Our parish carries forward this tradition in the Diocese of Youngstown.</p>
              <p>Today, St. Dominic maintains many community-focused ministries, including a Lay Dominican program, Catholic Men's Fellowship, Parish and Family Life ministry, and a vibrant Hispanic Ministry program with weekly Spanish Masses.</p>
            </div>
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.cream}>
        <FadeSection>
          <SectionTitle sub="Our Mission">What We Believe</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {[
              { icon: "📖", title: "Word", desc: "We preach the Gospel with clarity and depth, rooted in the Dominican intellectual tradition and the teachings of the Church." },
              { icon: "✝️", title: "Sacrament", desc: "We celebrate the liturgy with reverence and beauty, offering daily Mass, frequent Confession, and Eucharistic adoration." },
              { icon: "🤝", title: "Service", desc: "We serve the poor and our neighbors through outreach, community events, and ministries that bring Christ's love to Youngstown." },
            ].map((c, i) => (
              <div key={i} style={{ background: T.warmWhite, padding: 36, borderRadius: 4, border: `1px solid ${T.stone}`, textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }} aria-hidden="true">{c.icon}</div>
                <h3 style={{ fontSize: 22, color: T.burgundy, marginBottom: 12, fontFamily: "'Cormorant Garamond', serif" }}>{c.title}</h3>
                <p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.8 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{ background: `linear-gradient(135deg, ${T.stone} 0%, ${T.stoneLight} 100%)`, borderRadius: 4, padding: 48, textAlign: "center" }}>
            <h3 style={{ fontSize: 28, color: T.burgundy, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>Our Church Architecture</h3>
            <p style={{ fontSize: 16, color: T.warmGray, lineHeight: 1.8, maxWidth: 600, margin: "0 auto" }}>
              The architectural style of St. Dominic Church is modernized Romanesque — featuring limestone and brick construction, a towering presence on Lucius Avenue, and sacred art that inspires prayer and contemplation.
            </p>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE: STAFF
   ══════════════════════════════════════════════ */
function StaffPage() {
  const staff = [
    { name: "Rev. Vincent De Lucia, O.P.", role: "Pastor", type: "friar" },
    { name: "Rev. Bernard Confer, O.P.", role: "Associate", type: "friar" },
    { name: "Rev. Frassati Davis, O.P.", role: "Associate", type: "friar" },
    { name: "Rev. Jonah Pollock, O.P.", role: "Associate", type: "friar" },
    { name: "Michele Seese", role: "Parish Secretary", type: "staff" },
    { name: "Karen Barr", role: "Music Director", type: "staff" },
    { name: "Sylvia Gould", role: "Coordinator of Religious Education", type: "staff" },
    { name: "Paulina Montaldo", role: "Parochial Assistant", type: "staff" },
  ];

  return (
    <div style={{ paddingTop: 76 }}>
      <div style={{ background: T.burgundy, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>Priests & Staff</h1>
        <div style={{ width: 60, height: 3, background: T.gold, margin: "16px auto 0" }} />
      </div>

      <Section bg={T.warmWhite}>
        <FadeSection>
          <SectionTitle sub="Dominican Friars">Our Priests</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {staff.filter(s => s.type === "friar").map((s, i) => (
              <div key={i} style={{ background: T.cream, borderRadius: 4, padding: 32, textAlign: "center", border: `1px solid ${T.stone}` }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%", background: T.burgundy, margin: "0 auto 16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.gold, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 24,
                }}>{s.name.split(" ").filter(w => w.length > 2 && !w.includes(".")).map(w => w[0]).slice(0, 2).join("")}</div>
                <h3 style={{ fontSize: 20, color: T.softBlack, marginBottom: 4, fontFamily: "'Cormorant Garamond', serif" }}>{s.name}</h3>
                <p style={{ fontSize: 13, color: T.burgundy, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>{s.role}</p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.cream}>
        <FadeSection>
          <SectionTitle sub="Parish Team">Our Staff</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {staff.filter(s => s.type === "staff").map((s, i) => (
              <div key={i} style={{ background: T.warmWhite, borderRadius: 4, padding: 32, textAlign: "center", border: `1px solid ${T.stone}` }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%", background: T.stone, margin: "0 auto 16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.burgundy, fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 20,
                }}>{s.name.split(" ").map(w => w[0]).join("")}</div>
                <h3 style={{ fontSize: 18, color: T.softBlack, marginBottom: 4, fontFamily: "'Cormorant Garamond', serif" }}>{s.name}</h3>
                <p style={{ fontSize: 13, color: T.warmGray, fontWeight: 500 }}>{s.role}</p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE: BULLETIN
   ══════════════════════════════════════════════ */
function BulletinPage() {
  return (
    <div style={{ paddingTop: 76 }}>
      <div style={{ background: T.burgundy, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>Weekly Bulletin</h1>
        <div style={{ width: 60, height: 3, background: T.gold, margin: "16px auto 0" }} />
      </div>

      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 24 }} aria-hidden="true">📰</div>
            <h2 style={{ fontSize: 28, color: T.softBlack, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>Stay Up to Date</h2>
            <p style={{ fontSize: 16, color: T.warmGray, lineHeight: 1.8, marginBottom: 32 }}>
              Our weekly parish bulletin contains announcements, upcoming events, Mass intentions, ministry news, and the pastor's message. Bulletins are available at the church entrance each weekend and can also be accessed online.
            </p>
            <div style={{ background: T.cream, borderRadius: 4, padding: 36, border: `1px solid ${T.stone}`, marginBottom: 24 }}>
              <h3 style={{ fontSize: 22, color: T.burgundy, marginBottom: 12, fontFamily: "'Cormorant Garamond', serif" }}>Current Bulletin</h3>
              <p style={{ fontSize: 15, color: T.warmGray, marginBottom: 20 }}>Visit our parish website for the most recent bulletin:</p>
              <a href="https://saintdominic.org" target="_blank" rel="noopener noreferrer" style={{ color: T.burgundy, fontWeight: 600, fontSize: 15, textDecoration: "underline" }}>
                saintdominic.org → Parish Bulletin
              </a>
            </div>
            <p style={{ fontSize: 14, color: T.warmGray, fontStyle: "italic" }}>
              Bulletin submissions are due by Monday at noon each week. Contact the parish office at (330) 783-1900.
            </p>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE: BECOMING CATHOLIC
   ══════════════════════════════════════════════ */
function BecomingCatholicPage({ setPage }) {
  return (
    <div style={{ paddingTop: 76 }}>
      <div style={{ background: T.burgundy, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>Interested in Becoming Catholic?</h1>
        <div style={{ width: 60, height: 3, background: T.gold, margin: "16px auto 0" }} />
      </div>

      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <SectionTitle sub="Your Journey">Begin Your Journey of Faith</SectionTitle>
            <p style={{ fontSize: 16, color: T.warmGray, lineHeight: 1.9, marginBottom: 24, textAlign: "center" }}>
              Whether you've never been baptized, were baptized in another Christian tradition, or are a baptized Catholic who hasn't yet received Confirmation or the Eucharist — we're here to walk with you.
            </p>
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {[
              { title: "New to the Faith?", desc: "If you're curious about Catholicism and have questions, we'd love to talk. No pressure, no commitment — just an open conversation about Jesus Christ and His Church.", step: "Start exploring" },
              { title: "Returning to the Church?", desc: "Welcome back. Whether it's been months or decades, the doors are open and the Lord is waiting for you. We'll help you reconnect with the Sacraments and the community.", step: "Come home" },
              { title: "Ready to Begin?", desc: "Our parish offers a process of formation (sometimes called RCIA or the Order of Christian Initiation of Adults) where you can learn, ask questions, and prepare to receive the Sacraments.", step: "Take the next step" },
            ].map((c, i) => (
              <div key={i} style={{ background: T.warmWhite, padding: 36, borderRadius: 4, border: `1px solid ${T.stone}`, borderTop: `4px solid ${T.burgundy}` }}>
                <h3 style={{ fontSize: 22, color: T.burgundy, marginBottom: 12, fontFamily: "'Cormorant Garamond', serif" }}>{c.title}</h3>
                <p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.8, marginBottom: 20 }}>{c.desc}</p>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.gold, letterSpacing: 1, textTransform: "uppercase" }}>{c.step} →</div>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <h3 style={{ fontSize: 28, color: T.softBlack, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>Reach Out to Us</h3>
            <p style={{ fontSize: 16, color: T.warmGray, lineHeight: 1.8, marginBottom: 32 }}>
              Contact the parish office and we'll connect you with one of our priests or staff who can answer your questions and help you take the next step.
            </p>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}><a href="tel:+13307831900" className="contact-link" style={{ color: T.burgundy }}>(330) 783-1900</a></div>
            <div style={{ fontSize: 16 }}><a href="mailto:office@saintdominic.org" className="contact-link" style={{ color: T.warmGray }}>office@saintdominic.org</a></div>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE: GET INVOLVED
   ══════════════════════════════════════════════ */
function GetInvolvedPage() {
  return (
    <div style={{ paddingTop: 76 }}>
      <div style={{ background: T.burgundy, padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", color: "#fff", fontFamily: "'Cormorant Garamond', serif" }}>Get Involved</h1>
        <div style={{ width: 60, height: 3, background: T.gold, margin: "16px auto 0" }} />
      </div>

      <Section bg={T.warmWhite}>
        <FadeSection>
          <SectionTitle sub="Join Our Family">There's a Place for You</SectionTitle>
          <p style={{ fontSize: 16, color: T.warmGray, lineHeight: 1.8, textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            St. Dominic Parish is a vibrant community with many ways to get involved. Whether you're looking to deepen your prayer life, serve those in need, or build friendships — there's a ministry for you.
          </p>
        </FadeSection>
      </Section>

      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { icon: "🕯️", title: "Liturgical Ministries", desc: "Serve as a lector, extraordinary minister, altar server, sacristan, or choir member." },
              { icon: "🇲🇽", title: "Hispanic Ministry", desc: "Join our vibrant Spanish-speaking community with weekly Masses and cultural events." },
              { icon: "📿", title: "Lay Dominicans", desc: "Explore the Dominican charism more deeply as a member of the Lay Dominican Chapter." },
              { icon: "👨‍👩‍👧‍👦", title: "Parish & Family Life", desc: "Help organize community-building events, dinners, and parish celebrations." },
              { icon: "💪", title: "Catholic Men's Fellowship", desc: "Join men of the parish for prayer, study, and fellowship." },
              { icon: "🤲", title: "St. Vincent de Paul Society", desc: "Serve those in need in our community through direct outreach and assistance." },
              { icon: "🎵", title: "Music Ministry", desc: "Share your musical gifts at Mass — choir, cantoring, and instrumentalists welcome." },
              { icon: "📚", title: "Religious Education", desc: "Help form the next generation of Catholics through our CCD and faith formation programs." },
            ].map((m, i) => (
              <div key={i} className="hover-lift-sm" style={{
                background: T.warmWhite, padding: 28, borderRadius: 4, border: `1px solid ${T.stone}`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }} aria-hidden="true">{m.icon}</div>
                <h3 style={{ fontSize: 18, color: T.burgundy, marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>{m.title}</h3>
                <p style={{ fontSize: 14, color: T.warmGray, lineHeight: 1.7 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </FadeSection>
      </Section>

      <Section bg={T.warmWhite}>
        <FadeSection>
          <div style={{ background: `linear-gradient(135deg, ${T.burgundy} 0%, ${T.burgundyDark} 100%)`, borderRadius: 4, padding: 48, textAlign: "center" }}>
            <h3 style={{ fontSize: 28, color: "#fff", marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>Ready to Register?</h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 24, maxWidth: 500, margin: "0 auto 24px", lineHeight: 1.8 }}>
              Contact the parish office to register as a new parishioner. We can't wait to welcome you to our family!
            </p>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}><a href="tel:+13307831900" className="contact-link" style={{ color: T.goldLight }}>(330) 783-1900</a></div>
            <div style={{ fontSize: 14 }}><a href="mailto:office@saintdominic.org" className="contact-link" style={{ color: "rgba(255,255,255,0.75)" }}>office@saintdominic.org</a></div>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}

/* ══════════════════════════════════════════════
   APP ROOT
   ══════════════════════════════════════════════ */
const PAGE_TITLES = {
  [PAGES.HOME]: "St. Dominic Catholic Parish — Youngstown, OH",
  [PAGES.MASS_TIMES]: "Mass & Confession Times — St. Dominic Parish",
  [PAGES.ABOUT]: "About Our Parish — St. Dominic Parish",
  [PAGES.STAFF]: "Priests & Staff — St. Dominic Parish",
  [PAGES.BULLETIN]: "Weekly Bulletin — St. Dominic Parish",
  [PAGES.BECOMING_CATHOLIC]: "Becoming Catholic — St. Dominic Parish",
  [PAGES.GET_INVOLVED]: "Get Involved — St. Dominic Parish",
};

export default function App() {
  const [page, setPage] = useState(PAGES.HOME);

  useEffect(() => {
    document.title = PAGE_TITLES[page] || PAGE_TITLES[PAGES.HOME];
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case PAGES.HOME: return <HomePage setPage={setPage} />;
      case PAGES.MASS_TIMES: return <MassTimesPage />;
      case PAGES.ABOUT: return <AboutPage />;
      case PAGES.STAFF: return <StaffPage />;
      case PAGES.BULLETIN: return <BulletinPage />;
      case PAGES.BECOMING_CATHOLIC: return <BecomingCatholicPage setPage={setPage} />;
      case PAGES.GET_INVOLVED: return <GetInvolvedPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{globalCSS}</style>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav page={page} setPage={setPage} />
      <main id="main-content">{renderPage()}</main>
      <Footer setPage={setPage} />
    </>
  );
}
