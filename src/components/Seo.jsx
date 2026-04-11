import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CONFIG } from "../constants/config";

const SITE_NAME = "St. Dominic Catholic Church";
const DEFAULT_DESC =
  "St. Dominic Catholic Church — Youngstown, Ohio. Served by the Dominican Friars of the Province of St. Joseph since 1923.";
const SITE_URL = CONFIG.siteUrl;
const DEFAULT_IMAGE = `${SITE_URL}/photos/rose-window-opt.jpg`;

/**
 * Lightweight SEO head manager. Sets document title, meta description,
 * Open Graph, Twitter Card, and per-page image tags.
 *
 * Usage:
 *   <Seo title="About" description="Learn about our church history." image="/photos/interior-nave-opt.jpg" />
 */
export default function Seo({ title, description, image }) {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const desc = description || DEFAULT_DESC;
  const url = `${SITE_URL}${pathname}`;
  const ogImage = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;

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
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1920");
    setMeta("property", "og:image:alt", fullTitle);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", ogImage);

    // Canonical URL
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }, [fullTitle, desc, url, ogImage]);

  return null;
}
