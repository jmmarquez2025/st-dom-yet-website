import { useRef, useCallback, useState, useEffect } from "react";
import { T } from "../../constants/theme";
import {
  Bold, Italic, Heading2, Heading3, Quote, List,
  Image, MessageSquareText, Minus, Undo2, Redo2,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────
 *  RichEditor — a contentEditable WYSIWYG editor styled to
 *  match St. Dominic's blog aesthetic. Outputs HTML that the
 *  parent converts to the site's block-based JSON format.
 * ────────────────────────────────────────────────────────── */

const TOOLBAR_BTN = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  border: "none",
  borderRadius: 6,
  background: "transparent",
  cursor: "pointer",
  color: T.warmGray,
  transition: "all 0.15s",
  flexShrink: 0,
};

const DIVIDER = {
  width: 1,
  height: 22,
  background: T.stone,
  margin: "0 6px",
  flexShrink: 0,
};

function ToolbarBtn({ icon: Icon, label, active, onClick, size = 16 }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(e) => {
        e.preventDefault(); // keep focus in editor
        onClick();
      }}
      style={{
        ...TOOLBAR_BTN,
        background: active ? `${T.burgundy}14` : "transparent",
        color: active ? T.burgundy : T.warmGray,
      }}
    >
      <Icon size={size} strokeWidth={2} />
    </button>
  );
}

export default function RichEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState({});

  // Sync initial value
  useEffect(() => {
    if (editorRef.current && value !== undefined && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const exec = useCallback((cmd, val = null) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    updateFormats();
    fireChange();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fireChange = useCallback(() => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const updateFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
    });
  }, []);

  const handleInput = useCallback(() => {
    fireChange();
    updateFormats();
  }, [fireChange, updateFormats]);

  const handleKeyDown = useCallback((e) => {
    // Tab key inserts indent (blockquote behavior)
    if (e.key === "Tab") {
      e.preventDefault();
      exec("indent");
    }
    updateFormats();
  }, [exec, updateFormats]);

  const insertHeading = useCallback((level) => {
    exec("formatBlock", `h${level}`);
  }, [exec]);

  const insertQuote = useCallback(() => {
    exec("formatBlock", "blockquote");
  }, [exec]);

  const insertCallout = useCallback(() => {
    // Insert a div with callout class
    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);

    const callout = document.createElement("div");
    callout.className = "editor-callout";
    callout.setAttribute("contenteditable", "true");

    // If there's selected text, move it into the callout
    if (!range.collapsed) {
      callout.appendChild(range.extractContents());
    } else {
      callout.textContent = "Highlighted callout text...";
    }

    range.insertNode(callout);

    // Place cursor at end of callout
    const newRange = document.createRange();
    newRange.selectNodeContents(callout);
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);

    fireChange();
  }, [fireChange]);

  const insertImage = useCallback(() => {
    const url = prompt("Paste the image URL:");
    if (!url) return;
    const caption = prompt("Caption (optional):");

    const figure = document.createElement("figure");
    figure.className = "editor-image";
    figure.setAttribute("contenteditable", "false");

    const img = document.createElement("img");
    img.src = url;
    img.alt = caption || "";
    img.style.cssText = "max-width:100%;border-radius:6px";
    figure.appendChild(img);

    if (caption) {
      const cap = document.createElement("figcaption");
      cap.textContent = caption;
      cap.style.cssText = `font-size:13px;color:${T.warmGray};font-style:italic;text-align:center;margin-top:8px`;
      figure.appendChild(cap);
    }

    const sel = window.getSelection();
    if (sel.rangeCount) {
      const range = sel.getRangeAt(0);
      range.collapse(false);
      range.insertNode(figure);

      // Add a paragraph after for continued editing
      const p = document.createElement("p");
      p.innerHTML = "<br>";
      figure.parentNode.insertBefore(p, figure.nextSibling);

      const newRange = document.createRange();
      newRange.setStart(p, 0);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }

    fireChange();
  }, [fireChange]);

  const insertHR = useCallback(() => {
    exec("insertHorizontalRule");
  }, [exec]);

  return (
    <div
      style={{
        border: `1.5px solid ${T.stone}`,
        borderRadius: 10,
        overflow: "hidden",
        background: "#fff",
        transition: "border-color 0.2s",
      }}
      onFocus={() => {}}
    >
      {/* ── Toolbar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          padding: "8px 12px",
          background: T.cream,
          borderBottom: `1px solid ${T.stone}`,
        }}
      >
        <ToolbarBtn icon={Bold} label="Bold (Ctrl+B)" active={activeFormats.bold} onClick={() => exec("bold")} />
        <ToolbarBtn icon={Italic} label="Italic (Ctrl+I)" active={activeFormats.italic} onClick={() => exec("italic")} />
        <div style={DIVIDER} />
        <ToolbarBtn icon={Heading2} label="Section Heading" onClick={() => insertHeading(2)} />
        <ToolbarBtn icon={Heading3} label="Sub-heading" onClick={() => insertHeading(3)} />
        <div style={DIVIDER} />
        <ToolbarBtn icon={Quote} label="Blockquote" onClick={insertQuote} />
        <ToolbarBtn icon={MessageSquareText} label="Callout Box" onClick={insertCallout} />
        <ToolbarBtn icon={List} label="Bullet List" onClick={() => exec("insertUnorderedList")} />
        <div style={DIVIDER} />
        <ToolbarBtn icon={Image} label="Insert Image" onClick={insertImage} />
        <ToolbarBtn icon={Minus} label="Horizontal Rule" onClick={insertHR} />
        <div style={DIVIDER} />
        <ToolbarBtn icon={Undo2} label="Undo" onClick={() => exec("undo")} size={15} />
        <ToolbarBtn icon={Redo2} label="Redo" onClick={() => exec("redo")} size={15} />
      </div>

      {/* ── Editable area ── */}
      <div
        ref={editorRef}
        contentEditable
        role="textbox"
        aria-label="Blog post content"
        aria-multiline="true"
        data-placeholder={placeholder || "Start writing your article..."}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={updateFormats}
        onKeyUp={updateFormats}
        className="rich-editor-content"
        style={{
          minHeight: 380,
          maxHeight: 600,
          overflowY: "auto",
          padding: "24px 28px",
          outline: "none",
          fontSize: 16,
          lineHeight: 1.8,
          color: T.charcoal,
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      />
    </div>
  );
}

/**
 * Convert RichEditor HTML output → block-based JSON.
 * This is the bridge between the WYSIWYG and the site's content format.
 */
export function htmlToBlocks(html) {
  if (!html || !html.trim()) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstChild;
  const blocks = [];
  let isFirst = true;

  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text) {
        blocks.push({ type: "paragraph", text });
        isFirst = false;
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const tag = node.tagName.toLowerCase();
    const text = node.textContent.trim();

    if (!text && !["hr", "img", "figure", "br"].includes(tag)) return;

    switch (tag) {
      case "h1":
      case "h2":
        if (text) blocks.push({ type: "heading", level: 2, text });
        break;

      case "h3":
      case "h4":
        if (text) blocks.push({ type: "heading", level: 3, text });
        break;

      case "blockquote": {
        // Check for attribution pattern: text + "— source"
        const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
        const block = { type: "quote", text: lines[0] || text };
        if (lines.length > 1) {
          const lastLine = lines[lines.length - 1];
          if (/^[—–\-]/.test(lastLine)) {
            block.text = lines.slice(0, -1).join(" ");
            block.attribution = lastLine.replace(/^[—–\-]\s*/, "");
          }
        }
        blocks.push(block);
        break;
      }

      case "ul":
      case "ol": {
        const items = [];
        node.querySelectorAll("li").forEach((li) => {
          const t = li.textContent.trim();
          if (t) items.push(t);
        });
        if (items.length) {
          blocks.push({ type: "list", items, ordered: tag === "ol" });
        }
        break;
      }

      case "figure": {
        const img = node.querySelector("img");
        if (img) {
          const block = { type: "image", src: img.src, alt: img.alt || "" };
          const cap = node.querySelector("figcaption");
          if (cap) {
            block.caption = cap.textContent.trim();
            block.alt = block.caption;
          }
          blocks.push(block);
        }
        break;
      }

      case "img":
        blocks.push({ type: "image", src: node.src, alt: node.alt || "" });
        break;

      case "div":
        if (node.classList.contains("editor-callout")) {
          if (text) blocks.push({ type: "callout", text });
        } else {
          // Recurse into generic divs
          Array.from(node.childNodes).forEach(processNode);
        }
        break;

      case "p":
        if (text) {
          blocks.push({ type: "paragraph", text });
          isFirst = false;
        }
        break;

      case "br":
        break;

      case "hr":
        // Skip — visual only
        break;

      default:
        if (text) {
          blocks.push({ type: "paragraph", text });
          isFirst = false;
        }
    }
  };

  Array.from(root.childNodes).forEach(processNode);

  return blocks;
}

/**
 * Convert block-based JSON → HTML for editing.
 */
export function blocksToHtml(blocks) {
  if (!blocks || !blocks.length) return "";

  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
          return `<h${block.level || 2}>${esc(block.text)}</h${block.level || 2}>`;
        case "paragraph":
          return `<p>${esc(block.text)}</p>`;
        case "quote": {
          let inner = esc(block.text);
          if (block.attribution) inner += `\n— ${esc(block.attribution)}`;
          return `<blockquote>${inner}</blockquote>`;
        }
        case "callout":
          return `<div class="editor-callout">${esc(block.text)}</div>`;
        case "list": {
          const tag = block.ordered ? "ol" : "ul";
          const items = (block.items || []).map((i) => `<li>${esc(i)}</li>`).join("");
          return `<${tag}>${items}</${tag}>`;
        }
        case "image": {
          let fig = `<figure class="editor-image" contenteditable="false"><img src="${esc(block.src)}" alt="${esc(block.alt || "")}" style="max-width:100%;border-radius:6px">`;
          if (block.caption) {
            fig += `<figcaption style="font-size:13px;color:${T.warmGray};font-style:italic;text-align:center;margin-top:8px">${esc(block.caption)}</figcaption>`;
          }
          fig += `</figure>`;
          return fig;
        }
        default:
          return "";
      }
    })
    .join("\n");
}

function esc(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
