import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { T } from "../../constants/theme";
import { Link2, Mail, Printer, Check } from "lucide-react";

export default function BlogShare({ title }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  }, []);

  const handleEmail = useCallback(() => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`Check out this article: ${window.location.href}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  }, [title]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const btnStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    border: `1px solid ${T.stone}`,
    borderRadius: 4,
    background: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "'Source Sans 3', sans-serif",
    color: T.warmGray,
    transition: "all 0.2s",
  };

  return (
    <div
      className="blog-share"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 32,
        marginBottom: 8,
      }}
    >
      <button
        onClick={handleCopy}
        style={{
          ...btnStyle,
          color: copied ? "#4A7C59" : T.warmGray,
          borderColor: copied ? "#4A7C59" : T.stone,
        }}
      >
        {copied ? <Check size={14} /> : <Link2 size={14} />}
        {copied ? (t("blog.share.copied")) : (t("blog.share.copy"))}
      </button>
      <button onClick={handleEmail} style={btnStyle}>
        <Mail size={14} />
        {t("blog.share.email")}
      </button>
      <button onClick={handlePrint} style={btnStyle}>
        <Printer size={14} />
        {t("blog.share.print")}
      </button>
    </div>
  );
}
