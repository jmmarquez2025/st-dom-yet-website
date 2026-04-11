import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const SCRIPT_SRC = "https://www.vaticannews.va/widget.js";

/**
 * Embeds the Vatican News web-component widget.
 * Loads the external script once, swaps language reactively.
 */
export default function VaticanNews() {
  const containerRef = useRef(null);
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("es") ? "es" : "en";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Build the custom element via DOM API so attributes pass through cleanly
    container.innerHTML = "";
    const widget = document.createElement("vaticannews-widget");
    widget.setAttribute("lang", lang);
    widget.setAttribute("fontSize", "14");
    widget.setAttribute("carouselVideoAuto", "medium");
    container.appendChild(widget);

    // Load the script if not already present
    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [lang]);

  return <div ref={containerRef} />;
}
