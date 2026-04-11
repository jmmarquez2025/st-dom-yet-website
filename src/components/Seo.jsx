import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CONFIG } from "../constants/config";

const SITE_NAME = "St. Dominic Catholic Parish";
const DEFAULT_DESC =
  "St. Dominic Catholic Parish — Youngstown, Ohio. Served by the Dominican Friars of the Province of St. Joseph since 1923.";
const SITE_URL = CONFIG.siteUrl;

/**
 * Lightweight SEO head manager. Sets document title, meta description,
 * Open Graph, and Twitter Card tags per page.
 *
 * Usage:
 *   <Seo title="About" description="Learn about our parish history." />
 */
export default function Seo({ title, description }) {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const desc = description || DEFAULT_DESC;
  const url = `${SITE_URL}${pathname}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", desc);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);

    // Canonical URL
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }, [fullTitle, desc, url]);

  return null;
}
