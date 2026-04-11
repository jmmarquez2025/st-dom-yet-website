/**
 * Parish Photo Configuration
 *
 * All paths are relative to public/ — the Vite base URL is prepended
 * automatically so they work on GitHub Pages.
 */

const B = import.meta.env.BASE_URL;

export const PHOTOS = {
  // ── Hero backgrounds (1920px optimized) ──
  homeHero: `${B}photos/IMG_4588-opt.jpg`,           // Full church interior — wide nave shot
  aboutHero: `${B}photos/F69A5475-opt.jpg`,           // Dominican mural — Madonna & Dominican saints
  visitHero: `${B}photos/F69A5752-opt.jpg`,           // Madonna & Child statue
  bulletinHero: `${B}photos/F69A5771-opt.jpg`,        // St. Rose of Lima statue
  getInvolvedHero: `${B}photos/F69A5788-opt.jpg`,     // Dominican friar statue on column

  // ── Section backgrounds ──
  aboutArchitecture: `${B}photos/F69A5507-opt.jpg`,   // Golden monstrance close-up
  dominicanCharism: `${B}photos/IMG_4583-opt.jpg`,    // Friar preaching from ambo
  pageHeader: `${B}photos/F69A5784-opt.jpg`,          // Prayer alcove with votive candles

  // ── Gallery (About page) ──
  gallery: [
    { src: `${B}photos/gallery/IMG_4588.jpg`, alt: "gallery.nave" },
    { src: `${B}photos/gallery/F69A5475.jpg`, alt: "gallery.mural" },
    { src: `${B}photos/gallery/F69A5428.jpg`, alt: "gallery.altar" },
    { src: `${B}photos/gallery/F69A5507.jpg`, alt: "gallery.monstrance" },
    { src: `${B}photos/gallery/IMG_4583.jpg`, alt: "gallery.preaching" },
    { src: `${B}photos/gallery/F69A5752.jpg`, alt: "gallery.madonna" },
    { src: `${B}photos/gallery/F69A5784.jpg`, alt: "gallery.alcove" },
    { src: `${B}photos/gallery/F69A5771.jpg`, alt: "gallery.stRose" },
    { src: `${B}photos/gallery/F69A5788.jpg`, alt: "gallery.friarStatue" },
    { src: `${B}photos/gallery/crucifix.jpg`, alt: "gallery.crucifix" },
  ],
};
