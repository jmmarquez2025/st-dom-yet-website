import { useState } from "react";
import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section } from "../components/Section";
import FadeSection from "../components/FadeSection";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "general", message: "" });
  const [status, setStatus] = useState("idle");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!CONFIG.contactFormUrl) {
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(form.category)}&body=${encodeURIComponent(
        `Name: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`
      )}`;
      return;
    }
    setStatus("sending");
    try {
      await fetch(CONFIG.contactFormUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", category: "general", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", fontSize: 15, border: `1px solid ${T.stone}`,
    borderRadius: 2, fontFamily: "'Source Sans 3', sans-serif", background: T.warmWhite,
    minHeight: 44,
  };
  const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: T.softBlack, marginBottom: 6, letterSpacing: 0.5 };

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo title="Contact Us" description="Contact St. Dominic Catholic Parish in Youngstown, Ohio. Phone, email, office hours, and directions to 77 East Lucius Avenue." />
      <PageHeader title={t("contact.title")} />

      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48 }}>
            {/* Form */}
            <div>
              <h2 style={{ fontSize: 28, color: T.softBlack, marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>
                {t("contact.formTitle")}
              </h2>
              <p style={{ fontSize: 15, color: T.warmGray, marginBottom: 28, lineHeight: 1.7 }}>
                {t("contact.formDesc")}
              </p>

              {status === "success" ? (
                <div style={{ background: "#e8f5e9", border: "1px solid #a5d6a7", borderRadius: 4, padding: 24, textAlign: "center" }}>
                  <p style={{ fontSize: 16, color: "#2e7d32", fontWeight: 600 }}>{t("contact.success")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "grid", gap: 20 }}>
                    <div>
                      <label style={labelStyle}>{t("contact.name")} *</label>
                      <input required value={form.name} onChange={set("name")} style={inputStyle} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={labelStyle}>{t("contact.email")} *</label>
                        <input required type="email" value={form.email} onChange={set("email")} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>{t("contact.phone")}</label>
                        <input type="tel" value={form.phone} onChange={set("phone")} style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>{t("contact.category")}</label>
                      <select value={form.category} onChange={set("category")} style={{ ...inputStyle, cursor: "pointer" }}>
                        <option value="general">{t("contact.catGeneral")}</option>
                        <option value="sacraments">{t("contact.catSacraments")}</option>
                        <option value="becoming-catholic">{t("contact.catBecoming")}</option>
                        <option value="ministries">{t("contact.catMinistries")}</option>
                        <option value="facilities">{t("contact.catFacilities")}</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{t("contact.message")} *</label>
                      <textarea required value={form.message} onChange={set("message")} rows={5} style={{ ...inputStyle, resize: "vertical" }} />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-hover"
                      style={{
                        background: T.burgundy, color: T.cream, border: "none", padding: "14px 32px",
                        fontSize: 14, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase",
                        borderRadius: 2, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
                        opacity: status === "sending" ? 0.7 : 1, minHeight: 44,
                      }}
                    >
                      {status === "sending" ? t("contact.sending") : t("contact.submit")}
                    </button>
                    {status === "error" && (
                      <p style={{ color: "#c62828", fontSize: 14 }}>{t("contact.error")}</p>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div>
              <div style={{ background: T.warmWhite, border: `1px solid ${T.stone}`, borderRadius: 4, padding: 32, marginBottom: 24 }}>
                <h3 style={{ fontSize: 22, color: T.burgundy, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>
                  {t("contact.infoTitle")}
                </h3>
                <div style={{ fontSize: 15, color: T.warmGray, lineHeight: 2 }}>
                  <p>{CONFIG.address}<br />{CONFIG.city}, {CONFIG.state} {CONFIG.zip}</p>
                  <p style={{ marginTop: 12 }}>
                    <a href={CONFIG.phoneLink} className="contact-link" style={{ color: T.burgundy, fontWeight: 600 }}>{CONFIG.phone}</a>
                    <br />
                    <span style={{ fontSize: 13 }}>{t("contact.fax")}: {CONFIG.fax}</span>
                  </p>
                  <p style={{ marginTop: 12 }}>
                    <a href={`mailto:${CONFIG.email}`} className="contact-link" style={{ color: T.burgundy, fontWeight: 600 }}>{CONFIG.email}</a>
                  </p>
                  <p style={{ marginTop: 12, fontSize: 14 }}>
                    <strong>{t("contact.officeHours")}:</strong><br />{CONFIG.officeHours}
                  </p>
                </div>
              </div>

              {/* Google Maps */}
              <div style={{ borderRadius: 4, overflow: "hidden", border: `1px solid ${T.stone}` }}>
                <iframe
                  title={t("contact.mapTitle")}
                  src={`https://maps.google.com/maps?q=${CONFIG.mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="280"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
