import { useState } from "react";
import { useTranslation } from "react-i18next";
import { T } from "../constants/theme";
import { CONFIG } from "../constants/config";
import { Section } from "../components/Section";
import FadeSection from "../components/FadeSection";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Icon from "../components/Icon";

const INITIAL = {
  firstName: "", lastName: "",
  spouseFirst: "", spouseLast: "",
  email: "", phone: "",
  address: "", city: "", state: "", zip: "",
  previousParish: "",
  children: "",
  sacraments: [],
  heardAbout: "",
  notes: "",
};

export default function Register() {
  const { t } = useTranslation();
  const [form, setForm] = useState(INITIAL);
  const [showSpouse, setShowSpouse] = useState(false);
  const [status, setStatus] = useState("idle");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleSacrament = (sac) => {
    setForm((f) => ({
      ...f,
      sacraments: f.sacraments.includes(sac)
        ? f.sacraments.filter((s) => s !== sac)
        : [...f.sacraments, sac],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      sacraments: form.sacraments.join(", "),
      spouse: showSpouse ? `${form.spouseFirst} ${form.spouseLast}`.trim() : "",
      timestamp: new Date().toISOString(),
    };

    if (!CONFIG.registrationFormUrl) {
      const body = [
        `Name: ${form.firstName} ${form.lastName}`,
        showSpouse ? `Spouse: ${form.spouseFirst} ${form.spouseLast}` : "",
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Address: ${form.address}, ${form.city}, ${form.state} ${form.zip}`,
        form.previousParish ? `Previous Parish: ${form.previousParish}` : "",
        form.children ? `Children: ${form.children}` : "",
        form.sacraments.length ? `Sacraments: ${form.sacraments.join(", ")}` : "",
        form.heardAbout ? `Heard About Us: ${form.heardAbout}` : "",
        form.notes ? `Notes: ${form.notes}` : "",
      ].filter(Boolean).join("\n");
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("New Parish Registration")}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      await fetch(CONFIG.registrationFormUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
      setForm(INITIAL);
      setShowSpouse(false);
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", fontSize: 15,
    border: `1px solid ${T.stone}`, borderRadius: 2,
    fontFamily: "'Source Sans 3', sans-serif", background: T.warmWhite,
    minHeight: 44,
  };
  const labelStyle = {
    display: "block", fontSize: 13, fontWeight: 600,
    color: T.softBlack, marginBottom: 6, letterSpacing: 0.5,
  };

  const SACRAMENT_OPTIONS = ["baptism", "firstCommunion", "confirmation", "marriage"];

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo
        title="Parish Registration"
        description="Register as a parishioner at St. Dominic Catholic Parish in Youngstown, Ohio."
      />
      <PageHeader title={t("register.title")} />

      <Section bg={T.cream}>
        <FadeSection>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: T.warmGray, textAlign: "center", marginBottom: 36 }}>
              {t("register.desc")}
            </p>

            {status === "success" ? (
              <div
                style={{
                  background: "#e8f5e9", border: "1px solid #a5d6a7",
                  borderRadius: 4, padding: 40, textAlign: "center",
                }}
              >
                <Icon name="CheckCircle" size={48} color="#2e7d32" />
                <h3 style={{ fontSize: 22, color: "#2e7d32", fontWeight: 600, marginTop: 16, fontFamily: "'Cormorant Garamond', serif" }}>
                  {t("register.successTitle")}
                </h3>
                <p style={{ fontSize: 15, color: "#2e7d32", marginTop: 8 }}>
                  {t("register.successDesc")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gap: 24 }}>

                  {/* ── Head of Household ── */}
                  <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                    <legend style={{ fontSize: 18, fontWeight: 600, color: T.burgundy, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>
                      {t("register.headOfHousehold")}
                    </legend>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={labelStyle}>{t("register.firstName")} *</label>
                        <input required value={form.firstName} onChange={set("firstName")} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>{t("register.lastName")} *</label>
                        <input required value={form.lastName} onChange={set("lastName")} style={inputStyle} />
                      </div>
                    </div>
                  </fieldset>

                  {/* ── Spouse Toggle ── */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowSpouse(!showSpouse)}
                      style={{
                        background: "none", border: `1px solid ${T.stone}`, borderRadius: 2,
                        padding: "10px 20px", fontSize: 14, color: T.burgundy,
                        cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif",
                        fontWeight: 600, letterSpacing: 0.5,
                      }}
                    >
                      {showSpouse ? `− ${t("register.removeSpouse")}` : `+ ${t("register.addSpouse")}`}
                    </button>
                  </div>

                  {showSpouse && (
                    <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                      <legend style={{ fontSize: 18, fontWeight: 600, color: T.burgundy, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>
                        {t("register.spouse")}
                      </legend>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <label style={labelStyle}>{t("register.firstName")}</label>
                          <input value={form.spouseFirst} onChange={set("spouseFirst")} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t("register.lastName")}</label>
                          <input value={form.spouseLast} onChange={set("spouseLast")} style={inputStyle} />
                        </div>
                      </div>
                    </fieldset>
                  )}

                  {/* ── Contact Information ── */}
                  <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                    <legend style={{ fontSize: 18, fontWeight: 600, color: T.burgundy, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>
                      {t("register.contactInfo")}
                    </legend>
                    <div style={{ display: "grid", gap: 16 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <label style={labelStyle}>{t("register.email")} *</label>
                          <input required type="email" value={form.email} onChange={set("email")} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t("register.phone")} *</label>
                          <input required type="tel" value={form.phone} onChange={set("phone")} style={inputStyle} />
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>{t("register.address")} *</label>
                        <input required value={form.address} onChange={set("address")} style={inputStyle} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
                        <div>
                          <label style={labelStyle}>{t("register.city")} *</label>
                          <input required value={form.city} onChange={set("city")} style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t("register.state")} *</label>
                          <input required value={form.state} onChange={set("state")} style={inputStyle} maxLength={2} />
                        </div>
                        <div>
                          <label style={labelStyle}>{t("register.zip")} *</label>
                          <input required value={form.zip} onChange={set("zip")} style={inputStyle} maxLength={10} />
                        </div>
                      </div>
                    </div>
                  </fieldset>

                  {/* ── Parish Details ── */}
                  <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                    <legend style={{ fontSize: 18, fontWeight: 600, color: T.burgundy, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>
                      {t("register.parishDetails")}
                    </legend>
                    <div style={{ display: "grid", gap: 16 }}>
                      <div>
                        <label style={labelStyle}>{t("register.previousParish")}</label>
                        <input value={form.previousParish} onChange={set("previousParish")} style={inputStyle} placeholder={t("register.previousParishHint")} />
                      </div>
                      <div>
                        <label style={labelStyle}>{t("register.children")}</label>
                        <input type="number" min="0" value={form.children} onChange={set("children")} style={{ ...inputStyle, maxWidth: 120 }} />
                      </div>
                    </div>
                  </fieldset>

                  {/* ── Sacraments Received ── */}
                  <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                    <legend style={{ fontSize: 18, fontWeight: 600, color: T.burgundy, marginBottom: 16, fontFamily: "'Cormorant Garamond', serif" }}>
                      {t("register.sacramentsReceived")}
                    </legend>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                      {SACRAMENT_OPTIONS.map((sac) => (
                        <label
                          key={sac}
                          style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "10px 16px", borderRadius: 2, cursor: "pointer",
                            border: `1px solid ${form.sacraments.includes(sac) ? T.burgundy : T.stone}`,
                            background: form.sacraments.includes(sac) ? "rgba(107,29,42,0.06)" : T.warmWhite,
                            transition: "all 0.2s",
                            fontSize: 14, fontFamily: "'Source Sans 3', sans-serif",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={form.sacraments.includes(sac)}
                            onChange={() => toggleSacrament(sac)}
                            style={{ accentColor: T.burgundy }}
                          />
                          {t(`register.sac_${sac}`)}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {/* ── How did you hear about us ── */}
                  <div>
                    <label style={labelStyle}>{t("register.heardAbout")}</label>
                    <select value={form.heardAbout} onChange={set("heardAbout")} style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="">{t("register.selectOne")}</option>
                      <option value="word-of-mouth">{t("register.heard_word")}</option>
                      <option value="website">{t("register.heard_website")}</option>
                      <option value="social-media">{t("register.heard_social")}</option>
                      <option value="drove-by">{t("register.heard_drove")}</option>
                      <option value="other">{t("register.heard_other")}</option>
                    </select>
                  </div>

                  {/* ── Additional Notes ── */}
                  <div>
                    <label style={labelStyle}>{t("register.notes")}</label>
                    <textarea value={form.notes} onChange={set("notes")} rows={4} style={{ ...inputStyle, resize: "vertical" }} placeholder={t("register.notesHint")} />
                  </div>

                  {/* ── Submit ── */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-hover"
                    style={{
                      background: T.burgundy, color: T.cream, border: "none",
                      padding: "16px 40px", fontSize: 15, fontWeight: 600,
                      letterSpacing: 1.2, textTransform: "uppercase",
                      borderRadius: 2, cursor: "pointer",
                      fontFamily: "'Source Sans 3', sans-serif",
                      opacity: status === "sending" ? 0.7 : 1, minHeight: 48,
                    }}
                  >
                    {status === "sending" ? t("register.sending") : t("register.submit")}
                  </button>
                  {status === "error" && (
                    <p style={{ color: "#c62828", fontSize: 14 }}>{t("register.error")}</p>
                  )}
                </div>
              </form>
            )}
          </div>
        </FadeSection>
      </Section>
    </div>
  );
}
