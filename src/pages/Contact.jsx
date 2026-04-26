import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section } from "../components/Section";
import FadeSection from "../components/FadeSection";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import { PHOTOS } from "../constants/photos";
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react";

/* ── Validation helpers ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\s().\-+]*\d[\s().\-+]*\d[\s().\-+]*\d[\s().\-+]*\d[\s().\-+]*\d[\s().\-+]*\d[\s().\-+]*\d[\s().\-+]*(\d[\s().\-+]*)?(\d[\s().\-+]*)?(\d[\s().\-+]*)?$/;

const errorStyle = { fontSize: 12, color: "#c0392b", marginTop: 4, fontFamily: "'Source Sans 3', sans-serif" };

function validateEmail(v) {
  if (v && !EMAIL_RE.test(v)) return "Please enter a valid email address.";
  return "";
}
function validatePhone(v) {
  if (v && !PHONE_RE.test(v)) return "Please enter a valid phone number.";
  return "";
}

/* ── Animated floating-label input ── */
function FloatingInput({ label, required, type = "text", value, onChange, onBlurValidate, error, ariaLabel, ariaDescribedBy, ...rest }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  return (
    <div style={{ position: "relative" }}>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel || label}
        aria-describedby={ariaDescribedBy}
        aria-invalid={!!error}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); if (onBlurValidate) onBlurValidate(); }}
        style={{
          width: "100%", padding: "22px 16px 8px", fontSize: 15,
          border: `1.5px solid ${error ? "#c0392b" : focused ? T.burgundy : T.stone}`,
          borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif",
          background: "#fff", minHeight: 56, outline: "none",
          transition: "border-color 0.25s, box-shadow 0.25s",
          boxShadow: focused ? `0 0 0 3px rgba(107,29,42,0.08)` : "none",
        }}
        {...rest}
      />
      <label
        style={{
          position: "absolute", left: 16,
          top: active ? 8 : 18,
          fontSize: active ? 11 : 15,
          fontWeight: active ? 600 : 400,
          color: focused ? T.burgundy : T.warmGray,
          pointerEvents: "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          letterSpacing: active ? 0.5 : 0,
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {label}{required && " *"}
      </label>
      {error && <div id={ariaDescribedBy} style={errorStyle}>{error}</div>}
    </div>
  );
}

/* ── Animated floating-label textarea ── */
function FloatingTextarea({ label, required, value, onChange, rows = 5, ariaLabel }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  return (
    <div style={{ position: "relative" }}>
      <textarea
        required={required}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel || label}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={rows}
        style={{
          width: "100%", padding: "22px 16px 8px", fontSize: 15,
          border: `1.5px solid ${focused ? T.burgundy : T.stone}`,
          borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif",
          background: "#fff", resize: "vertical", outline: "none",
          transition: "border-color 0.25s, box-shadow 0.25s",
          boxShadow: focused ? `0 0 0 3px rgba(107,29,42,0.08)` : "none",
        }}
      />
      <label
        style={{
          position: "absolute", left: 16,
          top: active ? 8 : 18,
          fontSize: active ? 11 : 15,
          fontWeight: active ? 600 : 400,
          color: focused ? T.burgundy : T.warmGray,
          pointerEvents: "none",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          letterSpacing: active ? 0.5 : 0,
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {label}{required && " *"}
      </label>
    </div>
  );
}

/* ── Styled select ── */
function StyledSelect({ label, value, onChange, children, ariaLabel }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={onChange}
        aria-label={ariaLabel || label}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", padding: "22px 16px 8px", fontSize: 15,
          border: `1.5px solid ${focused ? T.burgundy : T.stone}`,
          borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif",
          background: "#fff", minHeight: 56, outline: "none", cursor: "pointer",
          appearance: "none", WebkitAppearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B6560' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 16px center",
          transition: "border-color 0.25s, box-shadow 0.25s",
          boxShadow: focused ? `0 0 0 3px rgba(107,29,42,0.08)` : "none",
        }}
      >
        {children}
      </select>
      <label
        style={{
          position: "absolute", left: 16, top: 8,
          fontSize: 11, fontWeight: 600,
          color: focused ? T.burgundy : T.warmGray,
          pointerEvents: "none",
          transition: "color 0.2s",
          letterSpacing: 0.5,
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {label}
      </label>
    </div>
  );
}

/* ── Info card item ── */
function InfoItem({ icon: IconComp, label, children }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0" }}>
      <div
        style={{
          width: 40, height: 40, borderRadius: "50%",
          background: `linear-gradient(135deg, rgba(107,29,42,0.08), rgba(197,165,90,0.12))`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}
      >
        <IconComp size={18} color={T.burgundy} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: T.warmGray, marginBottom: 2 }}>
          {label}
        </div>
        <div style={{ fontSize: 15, color: T.softBlack, lineHeight: 1.6 }}>{children}</div>
      </div>
    </div>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "general", message: "" });
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validateField = (field) => {
    let err = "";
    if (field === "email") err = validateEmail(form.email);
    if (field === "phone") err = validatePhone(form.phone);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[field] = err; else delete next[field];
      return next;
    });
    return err;
  };

  const validateAll = () => {
    const emailErr = validateEmail(form.email);
    const phoneErr = validatePhone(form.phone);
    const next = {};
    if (emailErr) next.email = emailErr;
    if (phoneErr) next.phone = phoneErr;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    if (!CONFIG.contactFormUrl) {
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(form.category)}&body=${encodeURIComponent(
        `Name: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`
      )}`;
      return;
    }
    setStatus("sending");
    setStatusMessage("");
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      // text/plain avoids the CORS preflight that Apps Script can't answer.
      // The script reads e.postData.contents and JSON.parses it server-side.
      await fetch(CONFIG.contactFormUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      // no-cors responses are opaque, so we can't read true success from the
      // server. We treat "request left the browser" as success and show a
      // phone fallback in case the server-side actually failed silently.
      setStatus("success");
      setStatusMessage(t("contact.success"));
      setForm({ name: "", email: "", phone: "", category: "general", message: "" });
      setErrors({});
    } catch (err) {
      setStatus("error");
      if (err.name === "AbortError") {
        setStatusMessage("Request timed out. Please try again or call the parish office.");
      } else {
        setStatusMessage(t("contact.error") || "Something went wrong. Please try again or call the parish office.");
      }
    }
  };

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo title="Contact Us" description="Contact St. Dominic Catholic Church in Youngstown, Ohio. Phone, email, office hours, and directions to 77 East Lucius Avenue." image={PHOTOS.visitHero} />
      <PageHeader title={t("contact.title")} />

      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 56, alignItems: "start" }}
               className="contact-grid">
            {/* ── Form Card ── */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "40px 36px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
                border: `1px solid rgba(232,226,216,0.6)`,
              }}
            >
              <div style={{ marginBottom: 28 }}>
                <h2 style={{
                  fontSize: 28, color: T.softBlack, marginBottom: 8,
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                }}>
                  {t("contact.formTitle")}
                </h2>
                <p style={{ fontSize: 15, color: T.warmGray, lineHeight: 1.7 }}>
                  {t("contact.formDesc")}
                </p>
              </div>

              {status === "success" ? (
                <div
                  aria-live="polite"
                  role="status"
                  style={{
                    background: "linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%)",
                    border: "1px solid #c8e6c9",
                    borderRadius: 12, padding: "48px 32px", textAlign: "center",
                    animation: "fadeInScale 0.4s ease",
                  }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(46,125,50,0.1)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                  }}>
                    <CheckCircle size={32} color="#2e7d32" />
                  </div>
                  <h3 style={{ fontSize: 22, color: "#2e7d32", fontWeight: 600, fontFamily: "'Cormorant Garamond', serif" }}>
                    {statusMessage || t("contact.success")}
                  </h3>
                  <p style={{ fontSize: 14, color: T.warmGray, marginTop: 12, lineHeight: 1.6 }}>
                    {t("contact.successFallback") || (
                      <>
                        If you don't hear back within 2 business days,
                        please call <a href={CONFIG.phoneLink} style={{ color: T.burgundy, fontWeight: 600 }}>{CONFIG.phone}</a>.
                      </>
                    )}
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setStatusMessage(""); }}
                    style={{
                      marginTop: 20, background: "none", border: `1px solid #66bb6a`,
                      borderRadius: 8, padding: "10px 24px", fontSize: 14,
                      color: "#2e7d32", cursor: "pointer", fontWeight: 600,
                      fontFamily: "'Source Sans 3', sans-serif",
                    }}
                  >
                    {t("contact.sendAnother") || "Send Another Message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} ref={formRef} noValidate>
                  <div style={{ display: "grid", gap: 20 }}>
                    <FloatingInput
                      label={t("contact.name")}
                      required
                      value={form.name}
                      onChange={set("name")}
                      ariaLabel={t("contact.name")}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
                         className="form-two-col">
                      <FloatingInput
                        label={t("contact.email")}
                        required
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        onBlurValidate={() => validateField("email")}
                        error={errors.email}
                        ariaLabel={t("contact.email")}
                        ariaDescribedBy={errors.email ? "contact-email-error" : undefined}
                      />
                      <FloatingInput
                        label={t("contact.phone")}
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        onBlurValidate={() => validateField("phone")}
                        error={errors.phone}
                        ariaLabel={t("contact.phone")}
                        ariaDescribedBy={errors.phone ? "contact-phone-error" : undefined}
                      />
                    </div>
                    <StyledSelect
                      label={t("contact.category")}
                      value={form.category}
                      onChange={set("category")}
                      ariaLabel={t("contact.category")}
                    >
                      <option value="general">{t("contact.catGeneral")}</option>
                      <option value="sacraments">{t("contact.catSacraments")}</option>
                      <option value="becoming-catholic">{t("contact.catBecoming")}</option>
                      <option value="ministries">{t("contact.catMinistries")}</option>
                      <option value="facilities">{t("contact.catFacilities")}</option>
                    </StyledSelect>
                    <FloatingTextarea
                      label={t("contact.message")}
                      required
                      value={form.message}
                      onChange={set("message")}
                      ariaLabel={t("contact.message")}
                    />
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-hover"
                      style={{
                        background: status === "sending"
                          ? T.warmGray
                          : `linear-gradient(135deg, ${T.burgundy}, ${T.burgundyDark})`,
                        color: T.cream, border: "none",
                        padding: "16px 32px", fontSize: 14, fontWeight: 600,
                        letterSpacing: 1.2, textTransform: "uppercase",
                        borderRadius: 10, cursor: status === "sending" ? "wait" : "pointer",
                        fontFamily: "'Source Sans 3', sans-serif",
                        minHeight: 52,
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                        transition: "all 0.3s ease",
                        boxShadow: status === "sending" ? "none" : "0 4px 16px rgba(107,29,42,0.25)",
                      }}
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                          {t("contact.sending")}
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          {t("contact.submit")}
                        </>
                      )}
                    </button>
                    {status === "error" && (
                      <div
                        aria-live="polite"
                        role="status"
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          background: "#fef2f2", border: "1px solid #fecaca",
                          borderRadius: 8, padding: "12px 16px",
                        }}
                      >
                        <AlertCircle size={18} color="#dc2626" />
                        <p style={{ color: "#dc2626", fontSize: 14, fontWeight: 500, margin: 0 }}>
                          {statusMessage || t("contact.error")}
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* ── Info Sidebar ── */}
            <div style={{ position: "sticky", top: 100 }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "32px 28px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)",
                  border: `1px solid rgba(232,226,216,0.6)`,
                  marginBottom: 20,
                }}
              >
                <h3 style={{
                  fontSize: 22, color: T.burgundy, marginBottom: 4,
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                }}>
                  {t("contact.infoTitle")}
                </h3>
                <div style={{ width: 32, height: 2, background: T.gold, borderRadius: 1, marginBottom: 20 }} />

                <InfoItem icon={MapPin} label={t("contact.addressLabel") || "Address"}>
                  {CONFIG.address}<br />{CONFIG.city}, {CONFIG.state} {CONFIG.zip}
                </InfoItem>
                <InfoItem icon={Phone} label={t("contact.phoneLabel") || "Phone"}>
                  <a href={CONFIG.phoneLink} style={{ color: T.burgundy, textDecoration: "none", fontWeight: 600 }}>
                    {CONFIG.phone}
                  </a>
                  <br />
                  <span style={{ fontSize: 13, color: T.warmGray }}>{t("contact.fax")}: {CONFIG.fax}</span>
                </InfoItem>
                <InfoItem icon={Mail} label="Email">
                  <a href={`mailto:${CONFIG.email}`} style={{ color: T.burgundy, textDecoration: "none", fontWeight: 600 }}>
                    {CONFIG.email}
                  </a>
                </InfoItem>
                <InfoItem icon={Clock} label={t("contact.officeHours")}>
                  {CONFIG.officeHours}
                </InfoItem>
              </div>

              {/* Google Maps */}
              <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)", border: `1px solid rgba(232,226,216,0.6)` }}>
                <iframe
                  title={t("contact.mapTitle")}
                  src={`https://maps.google.com/maps?q=${CONFIG.mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </FadeSection>
      </Section>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 840px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
