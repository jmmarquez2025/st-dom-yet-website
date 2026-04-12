import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { T } from "../../constants/theme";
import { BLOG_CATEGORIES } from "../../data/blog";
import RichEditor, { htmlToBlocks, blocksToHtml } from "./RichEditor";
import BlogBody from "./BlogBody";
import Icon from "../Icon";
import DominicanDivider from "../DominicanDivider";

/* ──────────────────────────────────────────────────────────
 *  BlogComposer — Full post creation / editing interface.
 *  Metadata form + WYSIWYG editor + live preview.
 * ────────────────────────────────────────────────────────── */

const AUTHORS = [
  { id: "frassati-davis", name: "Fr. Frassati Davis, O.P." },
  { id: "charles-rooney", name: "Fr. Charles Marie Rooney, O.P." },
];

const INPUT_STYLE = {
  width: "100%",
  padding: "10px 14px",
  fontSize: 14,
  fontFamily: "'Source Sans 3', sans-serif",
  border: `1.5px solid ${T.stone}`,
  borderRadius: 8,
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
  background: "#fff",
  color: T.charcoal,
};

const LABEL_STYLE = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: T.warmGray,
  marginBottom: 6,
  fontFamily: "'Source Sans 3', sans-serif",
};

function Field({ label, children, span = 1 }) {
  return (
    <div style={{ gridColumn: `span ${span}` }}>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
    </div>
  );
}

export default function BlogComposer({ post, onSave, onDelete, onCancel, saving }) {
  const isEditing = !!post;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [dirty, setDirty] = useState(false);

  // ── Form state ──
  const [title, setTitle] = useState(post?.title || "");
  const [titleEs, setTitleEs] = useState(post?.titleEs || "");
  const [author, setAuthor] = useState(post?.author || AUTHORS[0].id);
  const [date, setDate] = useState(post?.date || new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState(post?.category || "parish-news");
  const [tags, setTags] = useState(post?.tags?.join(", ") || "");
  const [heroImage, setHeroImage] = useState(post?.heroImage || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [excerptEs, setExcerptEs] = useState(post?.excerptEs || "");
  const [featured, setFeatured] = useState(post?.featured || false);
  const [published, setPublished] = useState(post?.published || false);
  const [docUrl, setDocUrl] = useState(post?.docUrl || "");
  const [docUrlEs, setDocUrlEs] = useState(post?.docUrlEs || "");

  // Rich editor HTML
  const initialHtml = useMemo(
    () => (post?.body ? blocksToHtml(post.body) : ""),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [editorHtml, setEditorHtml] = useState(initialHtml);

  // ── Tabs ──
  const [activeTab, setActiveTab] = useState("write"); // "write" | "preview"

  // ── Derived preview blocks ──
  const previewBlocks = useMemo(() => htmlToBlocks(editorHtml), [editorHtml]);

  // ── Auto-generate slug ──
  const slug = useMemo(() => {
    return (title || "untitled")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 60);
  }, [title]);

  // Mark form dirty on any editor change
  const handleEditorChange = (html) => {
    setEditorHtml(html);
    setDirty(true);
  };

  // ── Input mode: Google Doc link OR direct editor ──
  const [inputMode, setInputMode] = useState(docUrl ? "doc" : "editor");

  // ── Validation ──
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!excerpt.trim()) e.excerpt = "Excerpt is required";
    if (inputMode === "doc" && !docUrl.trim()) e.docUrl = "Google Doc link is required";
    if (inputMode === "editor" && !editorHtml.trim()) e.editor = "Article content is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (asDraft) => {
    if (!validate()) return;

    const postData = {
      id: post?.id || slug,
      title: title.trim(),
      titleEs: titleEs.trim(),
      author,
      date,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      heroImage: heroImage.trim(),
      excerpt: excerpt.trim(),
      excerptEs: excerptEs.trim(),
      featured,
      published: asDraft ? false : published,
      docUrl: inputMode === "doc" ? docUrl.trim() : "",
      docUrlEs: docUrlEs.trim(),
    };

    // If using the editor, include blocks
    if (inputMode === "editor") {
      postData.body = htmlToBlocks(editorHtml);
    }

    onSave(postData);
  };

  const categoryOptions = Object.entries(BLOG_CATEGORIES);

  return (
    <div style={{ maxWidth: 920, margin: "0 auto" }}>
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 28,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              color: T.softBlack,
              margin: 0,
            }}
          >
            {isEditing ? "Edit Post" : "New Blog Post"}
          </h2>
          {slug && title && (
            <p
              style={{
                fontSize: 13,
                color: T.warmGray,
                marginTop: 4,
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              /blog/{slug}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {isEditing && onDelete && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              style={{
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                background: "transparent",
                color: "#c0392b",
                border: `1.5px solid #e8c4c4`,
                borderRadius: 6,
                cursor: "pointer",
                fontFamily: "'Source Sans 3', sans-serif",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#c0392b";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "#c0392b";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#c0392b";
                e.currentTarget.style.borderColor = "#e8c4c4";
              }}
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (dirty && !window.confirm("You have unsaved changes. Discard them?")) return;
              onCancel();
            }}
            style={{
              padding: "8px 20px",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              background: "transparent",
              color: T.warmGray,
              border: `1.5px solid ${T.stone}`,
              borderRadius: 6,
              cursor: "pointer",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* ── Metadata Form ── */}
      <div
        style={{
          background: T.warmWhite,
          border: `1px solid ${T.stone}`,
          borderRadius: 12,
          padding: "clamp(20px, 4vw, 32px)",
          marginBottom: 28,
        }}
      >
        <h3
          style={{
            fontSize: 13,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: T.gold,
            fontWeight: 700,
            marginBottom: 20,
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          Post Details
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px 24px",
          }}
        >
          <Field label="Title" span={2}>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setDirty(true); }}
              placeholder="Your article title"
              style={{
                ...INPUT_STYLE,
                fontSize: 16,
                fontWeight: 500,
                borderColor: errors.title ? "#c0392b" : T.stone,
              }}
              onFocus={(e) => (e.target.style.borderColor = T.gold)}
              onBlur={(e) => (e.target.style.borderColor = errors.title ? "#c0392b" : T.stone)}
            />
            {errors.title && (
              <p style={{ fontSize: 12, color: "#c0392b", marginTop: 4 }}>{errors.title}</p>
            )}
          </Field>

          <Field label="Title (Spanish)">
            <input
              type="text"
              value={titleEs}
              onChange={(e) => { setTitleEs(e.target.value); setDirty(true); }}
              placeholder="Optional"
              style={INPUT_STYLE}
              onFocus={(e) => (e.target.style.borderColor = T.gold)}
              onBlur={(e) => (e.target.style.borderColor = T.stone)}
            />
          </Field>

          <Field label="Author">
            <select
              value={author}
              onChange={(e) => { setAuthor(e.target.value); setDirty(true); }}
              style={{ ...INPUT_STYLE, cursor: "pointer" }}
            >
              {AUTHORS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Date">
            <input
              type="date"
              value={date}
              onChange={(e) => { setDate(e.target.value); setDirty(true); }}
              style={INPUT_STYLE}
            />
          </Field>

          <Field label="Category">
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setDirty(true); }}
              style={{ ...INPUT_STYLE, cursor: "pointer" }}
            >
              {categoryOptions.map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tags" span={2}>
            <input
              type="text"
              value={tags}
              onChange={(e) => { setTags(e.target.value); setDirty(true); }}
              placeholder="Lent, Prayer, Hope (comma-separated)"
              style={INPUT_STYLE}
              onFocus={(e) => (e.target.style.borderColor = T.gold)}
              onBlur={(e) => (e.target.style.borderColor = T.stone)}
            />
          </Field>

          <Field label="Excerpt" span={2}>
            <textarea
              value={excerpt}
              onChange={(e) => { setExcerpt(e.target.value); setDirty(true); }}
              placeholder="1-2 sentence summary for the blog listing page"
              rows={2}
              style={{
                ...INPUT_STYLE,
                resize: "vertical",
                borderColor: errors.excerpt ? "#c0392b" : T.stone,
              }}
              onFocus={(e) => (e.target.style.borderColor = T.gold)}
              onBlur={(e) => (e.target.style.borderColor = errors.excerpt ? "#c0392b" : T.stone)}
            />
            {errors.excerpt && (
              <p style={{ fontSize: 12, color: "#c0392b", marginTop: 4 }}>{errors.excerpt}</p>
            )}
          </Field>

          <Field label="Excerpt (Spanish)">
            <textarea
              value={excerptEs}
              onChange={(e) => { setExcerptEs(e.target.value); setDirty(true); }}
              placeholder="Optional"
              rows={2}
              style={{ ...INPUT_STYLE, resize: "vertical" }}
              onFocus={(e) => (e.target.style.borderColor = T.gold)}
              onBlur={(e) => (e.target.style.borderColor = T.stone)}
            />
          </Field>

          <Field label="Hero Image URL">
            <input
              type="url"
              value={heroImage}
              onChange={(e) => { setHeroImage(e.target.value); setDirty(true); }}
              placeholder="https://... (leave blank for default)"
              style={INPUT_STYLE}
              onFocus={(e) => (e.target.style.borderColor = T.gold)}
              onBlur={(e) => (e.target.style.borderColor = T.stone)}
            />
          </Field>

          {/* Checkboxes */}
          <div style={{ display: "flex", gap: 28, alignItems: "center", gridColumn: "span 2" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                color: T.charcoal,
                cursor: "pointer",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => { setFeatured(e.target.checked); setDirty(true); }}
                style={{ width: 18, height: 18, accentColor: T.gold }}
              />
              Featured (pin to top)
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                color: T.charcoal,
                cursor: "pointer",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => { setPublished(e.target.checked); setDirty(true); }}
                style={{ width: 18, height: 18, accentColor: T.burgundy }}
              />
              Publish immediately
            </label>
          </div>
        </div>
      </div>

      {/* ── Content Source Toggle ── */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: 20,
          background: T.cream,
          borderRadius: 8,
          border: `1px solid ${T.stone}`,
          overflow: "hidden",
          width: "fit-content",
        }}
      >
        {[
          { key: "editor", label: "Write Here", icon: "BookOpenText" },
          { key: "doc", label: "Link Google Doc", icon: "BookOpen" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setInputMode(tab.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 0.5,
              background: inputMode === tab.key ? T.burgundy : "transparent",
              color: inputMode === tab.key ? "#fff" : T.warmGray,
              border: "none",
              cursor: "pointer",
              fontFamily: "'Source Sans 3', sans-serif",
              transition: "all 0.2s",
            }}
          >
            <Icon name={tab.icon} size={15} color={inputMode === tab.key ? "#fff" : T.warmGray} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Content Area ── */}
      {inputMode === "doc" ? (
        <div
          style={{
            background: T.warmWhite,
            border: `1px solid ${T.stone}`,
            borderRadius: 12,
            padding: "clamp(20px, 4vw, 32px)",
            marginBottom: 28,
          }}
        >
          <Field label="Google Doc Link (English)">
            <input
              type="url"
              value={docUrl}
              onChange={(e) => { setDocUrl(e.target.value); setDirty(true); }}
              placeholder="https://docs.google.com/document/d/..."
              style={{
                ...INPUT_STYLE,
                borderColor: errors.docUrl ? "#c0392b" : T.stone,
              }}
              onFocus={(e) => (e.target.style.borderColor = T.gold)}
              onBlur={(e) => (e.target.style.borderColor = errors.docUrl ? "#c0392b" : T.stone)}
            />
            {errors.docUrl && (
              <p style={{ fontSize: 12, color: "#c0392b", marginTop: 4 }}>{errors.docUrl}</p>
            )}
          </Field>
          <div style={{ marginTop: 16 }}>
            <Field label="Google Doc Link (Spanish) — Optional">
              <input
                type="url"
                value={docUrlEs}
                onChange={(e) => { setDocUrlEs(e.target.value); setDirty(true); }}
                placeholder="https://docs.google.com/document/d/..."
                style={INPUT_STYLE}
                onFocus={(e) => (e.target.style.borderColor = T.gold)}
                onBlur={(e) => (e.target.style.borderColor = T.stone)}
              />
            </Field>
          </div>
          <p
            style={{
              fontSize: 13,
              color: T.warmGray,
              lineHeight: 1.7,
              marginTop: 16,
              background: T.cream,
              padding: "12px 16px",
              borderRadius: 8,
            }}
          >
            <strong>Tip:</strong> Make sure the Google Doc is shared with "Anyone with the link can view."
            The article will be pulled automatically from the Doc when visitors load the page.
          </p>
        </div>
      ) : (
        <div style={{ marginBottom: 28 }}>
          {/* Write / Preview tabs */}
          <div
            style={{
              display: "flex",
              gap: 0,
              marginBottom: 12,
            }}
          >
            {["write", "preview"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  textTransform: "capitalize",
                  background: "transparent",
                  color: activeTab === tab ? T.burgundy : T.warmGray,
                  border: "none",
                  borderBottom: `2px solid ${activeTab === tab ? T.burgundy : "transparent"}`,
                  cursor: "pointer",
                  fontFamily: "'Source Sans 3', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "write" ? (
            <>
              <RichEditor
                value={editorHtml}
                onChange={handleEditorChange}
                placeholder="Start writing your article here. Use the toolbar to format headings, quotes, and more..."
              />
              {errors.editor && (
                <p style={{ fontSize: 12, color: "#c0392b", marginTop: 8 }}>{errors.editor}</p>
              )}
            </>
          ) : (
            <div
              style={{
                background: "#fff",
                border: `1.5px solid ${T.stone}`,
                borderRadius: 10,
                padding: "32px 28px",
                minHeight: 380,
              }}
            >
              {previewBlocks.length > 0 ? (
                <>
                  <h1
                    style={{
                      fontSize: "clamp(28px, 5vw, 38px)",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      color: T.softBlack,
                      lineHeight: 1.2,
                      marginBottom: 12,
                    }}
                  >
                    {title || "Untitled Post"}
                  </h1>
                  <p
                    style={{
                      fontSize: 13,
                      color: T.warmGray,
                      marginBottom: 24,
                    }}
                  >
                    {AUTHORS.find((a) => a.id === author)?.name} &middot; {date}
                  </p>
                  <DominicanDivider width={120} />
                  <div style={{ marginTop: 28 }}>
                    <BlogBody blocks={previewBlocks} />
                  </div>
                </>
              ) : (
                <p
                  style={{
                    fontSize: 15,
                    color: T.warmGray,
                    textAlign: "center",
                    padding: "60px 0",
                  }}
                >
                  Write something in the editor to see a preview here.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Action Buttons ── */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "flex-end",
          flexWrap: "wrap",
          paddingTop: 8,
          borderTop: `1px solid ${T.stone}`,
          paddingBottom: 24,
        }}
      >
        <button
          type="button"
          onClick={() => handleSubmit(true)}
          disabled={saving}
          style={{
            padding: "12px 28px",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
            background: "#fff",
            color: T.charcoal,
            border: `1.5px solid ${T.stone}`,
            borderRadius: 6,
            cursor: saving ? "wait" : "pointer",
            fontFamily: "'Source Sans 3', sans-serif",
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? "Saving..." : isEditing && published ? "Unpublish & Save Draft" : "Save Draft"}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          disabled={saving}
          style={{
            padding: "12px 28px",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
            background: T.burgundy,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: saving ? "wait" : "pointer",
            fontFamily: "'Source Sans 3', sans-serif",
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving
            ? "Saving..."
            : published
            ? isEditing
              ? "Update & Publish"
              : "Publish Now"
            : isEditing
            ? "Update Draft"
            : "Save Draft"}
        </button>
      </div>

      {/* ── Delete Confirmation Modal (portal to body to escape transform stacking) ── */}
      {showDeleteConfirm && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.4)",
            padding: 24,
          }}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              maxWidth: 420,
              width: "100%",
              boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#fde8e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Icon name="Flame" size={24} color="#c0392b" />
            </div>
            <h3
              style={{
                fontSize: 20,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                color: T.softBlack,
                marginBottom: 8,
              }}
            >
              Delete This Post?
            </h3>
            <p
              style={{
                fontSize: 14,
                color: T.warmGray,
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              <strong>&ldquo;{title || "Untitled"}&rdquo;</strong> will be permanently removed
              from the blog. This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  padding: "10px 24px",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  background: "transparent",
                  color: T.warmGray,
                  border: `1.5px solid ${T.stone}`,
                  borderRadius: 6,
                  cursor: "pointer",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Keep It
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  if (onDelete) onDelete(post.id);
                }}
                disabled={saving}
                style={{
                  padding: "10px 24px",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  background: "#c0392b",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontFamily: "'Source Sans 3', sans-serif",
                }}
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
