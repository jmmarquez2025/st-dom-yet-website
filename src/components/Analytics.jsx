import { useEffect } from "react";
import { CONFIG } from "../constants/config";

/**
 * Analytics — injects the Plausible script tag if a domain is configured.
 *
 * Reads CONFIG.plausibleDomain (set via VITE_PLAUSIBLE_DOMAIN env var).
 * If the domain is empty or not set, no script is loaded and no tracking occurs.
 */
export default function Analytics() {
  useEffect(() => {
    if (!CONFIG.plausibleDomain) return;

    // Avoid injecting duplicate scripts
    if (document.querySelector('script[data-domain="' + CONFIG.plausibleDomain + '"]')) return;

    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-domain", CONFIG.plausibleDomain);
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
