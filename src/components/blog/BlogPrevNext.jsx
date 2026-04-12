import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { T } from "../../constants/theme";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPrevNext({ prev, next }) {
  const { t, i18n } = useTranslation();
  const isEs = i18n.language === "es";

  if (!prev && !next) return null;

  return (
    <div
      className="blog-prev-next"
      style={{
        display: "grid",
        gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr",
        gap: 1,
        background: T.stone,
        borderRadius: 8,
        overflow: "hidden",
        marginTop: 48,
      }}
    >
      {prev && (
        <Link
          to={`/blog/${prev.id}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "24px 28px",
            background: T.warmWhite,
            textDecoration: "none",
            color: "inherit",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.cream)}
          onMouseLeave={(e) => (e.currentTarget.style.background = T.warmWhite)}
        >
          <ChevronLeft size={20} color={T.gold} style={{ flexShrink: 0 }} />
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: T.warmGray,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              {t("blog.prevPost")}
            </div>
            <div
              style={{
                fontSize: 16,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                color: T.softBlack,
                lineHeight: 1.3,
              }}
            >
              {isEs && prev.titleEs ? prev.titleEs : prev.title}
            </div>
          </div>
        </Link>
      )}
      {next && (
        <Link
          to={`/blog/${next.id}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "24px 28px",
            background: T.warmWhite,
            textDecoration: "none",
            color: "inherit",
            textAlign: "right",
            justifyContent: "flex-end",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.cream)}
          onMouseLeave={(e) => (e.currentTarget.style.background = T.warmWhite)}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: T.warmGray,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              {t("blog.nextPost")}
            </div>
            <div
              style={{
                fontSize: 16,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                color: T.softBlack,
                lineHeight: 1.3,
              }}
            >
              {isEs && next.titleEs ? next.titleEs : next.title}
            </div>
          </div>
          <ChevronRight size={20} color={T.gold} style={{ flexShrink: 0 }} />
        </Link>
      )}
    </div>
  );
}
