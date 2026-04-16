import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { T } from "../constants/theme";
import { Section } from "../components/Section";
import FadeSection from "../components/FadeSection";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import { PHOTOS } from "../constants/photos";
import AnnouncementDashboard from "../announcements/AnnouncementDashboard";
import AnnouncementComposer from "../announcements/AnnouncementComposer";
import { save, remove } from "../announcements/store";
import { useAllAnnouncements } from "../announcements/useAnnouncements";
import { Shield, Sparkles, Flame } from "lucide-react";

/* ──────────────────────────────────────────────────────────
 *  AnnouncementManager — Staff-only announcement management.
 *
 *  Passphrase gate → Dashboard → Composer (new / edit)
 *
 *  Announcements are stored in localStorage and displayed
 *  as header banners or popup cards on the public site.
 * ────────────────────────────────────────────────────────── */

const STORAGE_KEY = "stdom_announce_auth";
const PASSPHRASE = "veritas";

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
      <Seo title="Announcement Manager" description="" />
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
            <Shield size={28} color={T.burgundy} />
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
            Announcement Manager
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

// ── Toast notification ──
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
      {type === "error" ? <Flame size={18} /> : <Sparkles size={18} />}
      {message}
    </div>
  );
}

// ── Main Dashboard ──
export default function AnnouncementManager() {
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

  return <ManagerDashboard />;
}

function ManagerDashboard() {
  const { refresh } = useAllAnnouncements();

  const [view, setView] = useState("dashboard"); // "dashboard" | "compose"
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  const handleNew = useCallback(() => {
    setEditing(null);
    setView("compose");
  }, []);

  const handleEdit = useCallback((ann) => {
    setEditing(ann);
    setView("compose");
  }, []);

  const handleCancel = useCallback(() => {
    setEditing(null);
    setView("dashboard");
  }, []);

  const handleSave = useCallback(
    (data) => {
      try {
        save(data);
        setToast({
          message: data.id
            ? "Announcement updated!"
            : "Announcement created!",
          type: "success",
        });
        setView("dashboard");
        setEditing(null);
        refresh();
      } catch {
        setToast({ message: "Failed to save. Please try again.", type: "error" });
      }
    },
    [refresh]
  );

  const handleDelete = useCallback(
    (id) => {
      try {
        remove(id);
        setToast({ message: "Announcement deleted.", type: "success" });
        setView("dashboard");
        setEditing(null);
        refresh();
      } catch {
        setToast({ message: "Failed to delete.", type: "error" });
      }
    },
    [refresh]
  );

  return (
    <div style={{ paddingTop: 76 }}>
      <Seo
        title="Announcement Manager"
        description="Manage site-wide banners and popup announcements."
      />
      <PageHeader
        title={
          view === "compose"
            ? editing
              ? "Edit Announcement"
              : "New Announcement"
            : "Announcement Manager"
        }
        heroSrc={PHOTOS.pageHeader}
        tall
      />

      <Section bg={T.warmWhite}>
        <FadeSection>
          {view === "dashboard" && (
            <AnnouncementDashboard onEdit={handleEdit} onNew={handleNew} />
          )}
          {view === "compose" && (
            <AnnouncementComposer
              announcement={editing}
              onSave={handleSave}
              onDelete={handleDelete}
              onCancel={handleCancel}
            />
          )}
        </FadeSection>
      </Section>

      {/* Toast (portal to body) */}
      {toast &&
        createPortal(
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
