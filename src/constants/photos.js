/**
 * Parish Photo Configuration
 *
 * All paths are relative to public/ — the Vite base URL is prepended
 * automatically so they work on GitHub Pages.
 */

const B = import.meta.env.BASE_URL;

export const PHOTOS = {
  // ── Hero backgrounds (1920px optimized) ──
  homeHero: `${B}photos/aerial-interior-opt.jpg`,       // Dramatic drone interior — nave from above
  aboutHero: `${B}photos/interior-nave-opt.jpg`,         // Professional interior — nave & altar
  visitHero: `${B}photos/rose-window-opt.jpg`,           // Church exterior with sign & rose window
  bulletinHero: `${B}photos/vigil-candles-opt.jpg`,      // Moody nave interior — Easter Vigil
  getInvolvedHero: `${B}photos/vigil-servers-opt.jpg`,   // Congregation with candles — community

  // ── Section backgrounds ──
  aboutArchitecture: `${B}photos/exterior-facade-opt.jpg`,  // Church façade with rose window
  dominicanCharism: `${B}photos/IMG_4583-opt.jpg`,          // Friar preaching from ambo
  pageHeader: `${B}photos/arched-interior-opt.jpg`,         // Arched corridor interior

  // ── Gallery (About page) ──
  gallery: [
    { src: `${B}photos/gallery/aerial-overview.jpg`, alt: "gallery.aerial" },
    { src: `${B}photos/gallery/aerial-interior.jpg`, alt: "gallery.aerialInterior" },
    { src: `${B}photos/gallery/interior-nave.jpg`, alt: "gallery.nave" },
    { src: `${B}photos/gallery/rose-window.jpg`, alt: "gallery.roseWindow" },
    { src: `${B}photos/gallery/exterior-facade.jpg`, alt: "gallery.facade" },
    { src: `${B}photos/gallery/exterior-statue.jpg`, alt: "gallery.exterior" },
    { src: `${B}photos/gallery/arched-interior.jpg`, alt: "gallery.arches" },
    { src: `${B}photos/gallery/vigil-fire.jpg`, alt: "gallery.easterFire" },
    { src: `${B}photos/gallery/vigil-servers.jpg`, alt: "gallery.community" },
    { src: `${B}photos/gallery/vigil-candles.jpg`, alt: "gallery.vigilCandles" },
    { src: `${B}photos/gallery/F69A5475.jpg`, alt: "gallery.mural" },
    { src: `${B}photos/gallery/F69A5507.jpg`, alt: "gallery.monstrance" },
    { src: `${B}photos/gallery/IMG_4583.jpg`, alt: "gallery.preaching" },
    { src: `${B}photos/gallery/F69A5752.jpg`, alt: "gallery.madonna" },
    { src: `${B}photos/gallery/F69A5784.jpg`, alt: "gallery.alcove" },
    { src: `${B}photos/gallery/crucifix.jpg`, alt: "gallery.crucifix" },
  ],
};
