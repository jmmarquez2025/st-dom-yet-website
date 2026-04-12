import { useState, useEffect, useCallback } from "react";
import { T } from "../../constants/theme";
import { generateHeadingId } from "../../utils/blogUtils";
import { ChevronDown, List } from "lucide-react";

/**
 * Table of Contents for blog posts.
 *
 * variant="mobile"  — collapsible accordion (shown inside article on small screens)
 * variant="desktop" — sticky sidebar (shown beside article on wide screens)
 *
 * The parent (BlogPost) renders two instances, one per variant,
 * and CSS classes control which is visible at each breakpoint.
 */
export default function BlogToc({ blocks, label = "Table of Contents", variant = "desktop" }) {
  const headings = (blocks || []).filter((b) => b.type === "heading");
  const [activeId, setActiveId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleObserver = useCallback((entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length > 0) {
      setActiveId(visible[0].target.id);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0.1,
    });
    headings.forEach((h) => {
      const el = document.getElementById(generateHeadingId(h.text));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings, handleObserver]);

  if (headings.length < 2) return null;

  const items = headings.map((h) => ({
    id: generateHeadingId(h.text),
    text: h.text,
    level: h.level || 2,
  }));

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  /* ═══ Desktop sidebar variant ═══ */
  if (variant === "desktop") {
    return (
      <nav
        aria-label="Table of Contents"
        className="blog-toc-desktop"
        style={{
          position: "sticky",
          top: 120,
          maxWidth: 220,
          alignSelf: "flex-start",
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Header with icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 10,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            fontWeight: 700,
            color: T.burgundy,
            marginBottom: 14,
            fontFamily: "'Source Sans 3', sans-serif",
            opacity: 0.7,
          }}
        >
          <List size={12} strokeWidth={2} />
          {label}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: T.stone, marginBottom: 12, opacity: 0.5 }} />

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "6px 0 6px 14px",
                    fontSize: 12.5,
                    lineHeight: 1.5,
                    color: isActive ? T.burgundy : T.warmGray,
                    fontWeight: isActive ? 600 : 400,
                    fontFamily: "'Source Sans 3', sans-serif",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    borderLeft: `2px solid ${isActive ? T.gold : "transparent"}`,
                    transition: "all 0.25s ease",
                    paddingLeft: item.level === 3 ? 26 : 14,
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {item.text}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  /* ═══ Mobile collapsible variant ═══ */
  return (
    <div className="blog-toc-mobile">
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "12px 16px",
          background: T.cream,
          border: `1px solid ${T.stone}`,
          borderRadius: mobileOpen ? "6px 6px 0 0" : 6,
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 600,
          color: T.charcoal,
          fontFamily: "'Source Sans 3', sans-serif",
          marginBottom: mobileOpen ? 0 : 24,
          transition: "border-radius 0.2s ease",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <List size={14} strokeWidth={2} />
          {label}
        </span>
        <ChevronDown
          size={16}
          style={{
            transition: "transform 0.2s",
            transform: mobileOpen ? "rotate(180deg)" : "rotate(0)",
          }}
        />
      </button>
      {mobileOpen && (
        <div
          style={{
            background: T.cream,
            border: `1px solid ${T.stone}`,
            borderTop: "none",
            borderRadius: "0 0 6px 6px",
            padding: "8px 16px 12px",
            marginBottom: 24,
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "6px 0",
                    fontSize: 13,
                    color: T.burgundy,
                    fontFamily: "'Source Sans 3', sans-serif",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
