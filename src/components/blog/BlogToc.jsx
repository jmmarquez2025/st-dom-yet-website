import { useState, useEffect, useCallback } from "react";
import { T } from "../../constants/theme";
import { generateHeadingId } from "../../utils/blogUtils";
import { ChevronDown } from "lucide-react";

/**
 * Table of Contents for blog posts.
 * Desktop: sticky sidebar (subtle, quiet). Mobile: collapsible toggle.
 */
export default function BlogToc({ blocks, label = "Table of Contents" }) {
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

  return (
    <>
      {/* Desktop sidebar — intentionally quiet so it doesn't compete with article text */}
      <nav
        aria-label="Table of Contents"
        className="blog-toc-desktop"
        style={{
          position: "sticky",
          top: 140,
          maxWidth: 200,
          alignSelf: "flex-start",
          opacity: 0.55,
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            fontWeight: 600,
            color: T.warmGray,
            marginBottom: 12,
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          {label}
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "5px 0 5px 12px",
                  fontSize: 11.5,
                  lineHeight: 1.45,
                  color: activeId === item.id ? T.burgundy : T.warmGray,
                  fontWeight: activeId === item.id ? 500 : 400,
                  fontFamily: "'Source Sans 3', sans-serif",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  borderLeft: `1.5px solid ${activeId === item.id ? T.gold : T.stoneLight}`,
                  transition: "all 0.25s ease",
                  paddingLeft: item.level === 3 ? 22 : 12,
                }}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile collapsible */}
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
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: T.charcoal,
            fontFamily: "'Source Sans 3', sans-serif",
            marginBottom: mobileOpen ? 0 : 24,
          }}
        >
          {label}
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
    </>
  );
}
