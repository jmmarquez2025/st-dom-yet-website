import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { T } from "../constants/theme";
import { Section, SectionTitle } from "../components/Section";
import FadeSection from "../components/FadeSection";
import PageHeader from "../components/PageHeader";
import DominicanDivider from "../components/DominicanDivider";
import Seo from "../components/Seo";
import Icon from "../components/Icon";
import { PHOTOS } from "../constants/photos";
import BlogDashboard from "../components/blog/BlogDashboard";
import BlogComposer from "../components/blog/BlogComposer";
import { useBlogPosts } from "../cms/hooks";
import { submitBlogPost, deleteBlogPost } from "../cms/client";

/* ──────────────────────────────────────────────────────────
 *  WritersGuide — Staff-only blog management page.
 *
 *  Passphrase gate → Blog Dashboard → New/Edit Post Composer
 *
 *  Two ways to provide content:
 *  1. Write directly in the built-in rich editor
 *  2. Link a Google Doc (parsed server-side by Apps Script)
 *
 *  Posts are saved to Google Sheets via the blog-cms.gs doPost handler.
 * ────────────────────────────────────────────────────────── */

const STORAGE_KEY = "stdom_staff_auth";
const PASSPHRASE = "veritas"; // The Dominican motto — easy for friars to remember

// ── Passphrase Gate ──
function PassphraseGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === PASSPHRASE) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo title="Staff Area" description="" />
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: T.warmWhite,
          padding: 24,
        }}
      >
        <form
          onSubmit={handleUnlock}
          style={{
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            padding: 48,
            background: "#fff",
            borderRadius: 12,
            border: `1px solid ${T.stone}`,
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `${T.burgundy}10`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <Icon name="Shield" size={28} color={T.burgundy} />
          </div>
          <h1
            style={{
              fontSize: 24,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              color: T.softBlack,
              marginBottom: 8,
            }}
          >
            Staff Area
          </h1>
          <p
            style={{
              fontSize: 14,
              color: T.warmGray,
              lineHeight: 1.6,
              marginBottom: 28,
            }}
          >
            This page is for parish staff and friars.
            <br />
            Enter the passphrase to continue.
          </p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Passphrase"
            aria-label="Staff passphrase"
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: 15,
              border: `1.5px solid ${error ? "#c0392b" : T.stone}`,
              borderRadius: 6,
              outline: "none",
              fontFamily: "'Source Sans 3', sans-serif",
              textAlign: "center",
              letterSpacing: 2,
              transition: "border-color 0.2s",
              marginBottom: 16,
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              if (!error) e.target.style.borderColor = T.gold;
            }}
            onBlur={(e) => {
              if (!error) e.target.style.borderColor = T.stone;
            }}
            autoFocus
          />
          {error && (
            <p style={{ fontSize: 13, color: "#c0392b", marginBottom: 12 }}>
              Incorrect passphrase. Please try again.
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              background: T.burgundy,
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Success Toast ──
function Toast({ message, type, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 24px",
        background: type === "error" ? "#c0392b" : "#2E7D32",
        color: "#fff",
        borderRadius: 10,
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "'Source Sans 3', sans-serif",
        animation: "fadeInUp 0.3s ease",
      }}
      role="status"
      aria-live="polite"
    >
      <Icon
        name={type === "error" ? "Flame" : "Sparkles"}
        size={18}
        color="#fff"
      />
      {message}
    </div>
  );
}

// ── Main Staff Dashboard ──
export default function WritersGuide() {
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  const handleUnlock = useCallback(() => {
    setAuthed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  if (!authed) {
    return <PassphraseGate onUnlock={handleUnlock} />;
  }

  return <StaffDashboard />;
}

function StaffDashboard() {
  const { data: blogPosts, loading } = useBlogPosts();

  // View state: "dashboard" | "compose"
  const [view, setView] = useState("dashboard");
  const [editingPost, setEditingPost] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const handleNew = useCallback(() => {
    setEditingPost(null);
    setView("compose");
  }, []);

  const handleEdit = useCallback((post) => {
    setEditingPost(post);
    setView("compose");
  }, []);

  const handleCancel = useCallback(() => {
    setEditingPost(null);
    setView("dashboard");
  }, []);

  const handleDelete = useCallback(async (postId) => {
    setSaving(true);
    try {
      const result = await deleteBlogPost(postId);
      if (result.success) {
        setToast({ message: "Post deleted successfully.", type: "success" });
        setView("dashboard");
        setEditingPost(null);
      } else {
        setToast({ message: result.error || "Failed to delete post.", type: "error" });
      }
    } catch {
      setToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  }, []);

  const handleSave = useCallback(async (postData) => {
    setSaving(true);
    try {
      const result = await submitBlogPost(postData);
      if (result.success) {
        setToast({
          message: postData.published
            ? "Post published successfully!"
            : "Draft saved successfully!",
          type: "success",
        });
        setView("dashboard");
        setEditingPost(null);
      } else {
        setToast({
          message: result.error || "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch {
      setToast({
        message: "Network error. Please check your connection.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  }, []);

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo
        title="Blog Manager"
        description="Staff blog management dashboard for St. Dominic Catholic Church."
      />
      <PageHeader
        title={view === "compose" ? (editingPost ? "Edit Post" : "New Post") : "Blog Manager"}
        heroSrc={PHOTOS.dominicanCharism}
        tall
      />

      {/* ── Tabs: Dashboard / Writing Tips ── */}
      {view === "dashboard" && (
        <>
          <Section bg={T.warmWhite}>
            <FadeSection>
              <BlogDashboard
                posts={blogPosts}
                loading={loading}
                onNew={handleNew}
                onEdit={handleEdit}
              />
            </FadeSection>
          </Section>

          {/* ── Quick Reference (collapsed) ── */}
          <WritingTips />
        </>
      )}

      {view === "compose" && (
        <Section bg={T.warmWhite}>
          <BlogComposer
            post={editingPost}
            onSave={handleSave}
            onDelete={handleDelete}
            onCancel={handleCancel}
            saving={saving}
          />
        </Section>
      )}

      {/* Toast notifications (portal to body to escape transform stacking) */}
      {toast && createPortal(
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />,
        document.body
      )}
    </div>
  );
}

// ── Writing Tips Section (below dashboard) ──
function WritingTips() {
  const [open, setOpen] = useState(false);

  const FORMAT_EXAMPLES = [
    { docFormat: "Heading 1 or Heading 2", result: "Section heading", icon: "BookMarked" },
    { docFormat: "Normal paragraph", result: "Body text (first gets drop cap)", icon: "BookOpenText" },
    { docFormat: "Indented paragraph (Tab)", result: "Blockquote with gold accent", icon: "Gem" },
    { docFormat: "All-bold paragraph", result: "Highlighted callout box", icon: "Flame" },
    { docFormat: "Bulleted / numbered list", result: "Formatted list", icon: "Heart" },
    { docFormat: "Image URL on its own line", result: "Inline image + caption", icon: "Maximize" },
  ];

  return (
    <Section bg={T.cream}>
      <FadeSection>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "100%",
            padding: "16px 0",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          <Icon name="BookOpen" size={18} color={T.burgundy} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: T.burgundy,
            }}
          >
            {open ? "Hide" : "Show"} Writing Tips & Formatting Guide
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.2s",
            }}
          >
            <path d="M2 4l4 4 4-4" stroke={T.burgundy} strokeWidth="2" fill="none" />
          </svg>
        </button>

        {open && (
          <div style={{ marginTop: 16 }}>
            <DominicanDivider width={120} />
            <div style={{ marginTop: 28 }}>
              <SectionTitle sub="Quick Reference">
                Google Docs Formatting
              </SectionTitle>
              <p
                style={{
                  fontSize: 15,
                  color: T.warmGray,
                  lineHeight: 1.7,
                  textAlign: "center",
                  maxWidth: 600,
                  margin: "0 auto 36px",
                }}
              >
                When using Google Docs, these formatting styles automatically
                convert into beautiful blog elements:
              </p>

              <div
                style={{
                  maxWidth: 640,
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {FORMAT_EXAMPLES.map((ex, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "14px 20px",
                      background: T.warmWhite,
                      borderRadius: 8,
                      border: `1px solid ${T.stone}`,
                    }}
                  >
                    <Icon
                      name={ex.icon}
                      size={18}
                      color={T.burgundy}
                      style={{ flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: T.softBlack,
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}
                      >
                        {ex.docFormat}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: T.warmGray,
                        fontFamily: "'Source Sans 3', sans-serif",
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      {"\u2192"} {ex.result}
                    </div>
                  </div>
                ))}
              </div>

              {/* Editor tips */}
              <div
                style={{
                  maxWidth: 640,
                  margin: "32px auto 0",
                  padding: "20px 24px",
                  background: T.warmWhite,
                  borderRadius: 10,
                  border: `1px solid ${T.stone}`,
                }}
              >
                <h4
                  style={{
                    fontSize: 13,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: T.gold,
                    fontWeight: 700,
                    marginBottom: 12,
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  Using the Built-in Editor
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {[
                    "Use the toolbar buttons for headings, bold, italic, quotes, lists, and callouts",
                    "Click the Image button to insert an image by URL",
                    "Switch to Preview tab to see exactly how it will look on the site",
                    "You can also link a Google Doc instead — choose 'Link Google Doc' mode",
                    "Save as Draft to come back later, or Publish to go live immediately",
                  ].map((tip, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 14,
                        color: T.warmGray,
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: T.gold,
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </FadeSection>
    </Section>
  );
}
