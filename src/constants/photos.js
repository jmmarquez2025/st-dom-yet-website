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

  // ── History page ──
  historyHero: `${B}photos/aerial-overview-opt.jpg`,                   // Aerial campus overview
  historyStorefront: `${B}photos/history/storefront.jpg`,              // 1923 storefront — first Mass
  historyConstruction: `${B}photos/history/inscription.jpg`,           // Church arches under construction 1950s
  historyConstructionExt: `${B}photos/history/construction-exterior.jpg`, // Exterior with steel frame
  historyFoundation: `${B}photos/history/construction-foundation.jpg`, // Foundation work with workers
  historyExteriorOld: `${B}photos/history/exterior-old.jpg`,           // Old entrance B&W
  historyExteriorBw: `${B}photos/history/exterior-bw.jpg`,             // Church front vintage color
  historyAltarboys: `${B}photos/history/altarboys.jpg`,                // 1963 altar boys with mural
  historyMass1979: `${B}photos/history/mass-1979.jpg`,                 // 1979 concelebrated Mass
  historyInteriorVintage: `${B}photos/history/interior-vintage.jpg`,   // Interior showing Loreto symbols
  historyCommunity: `${B}photos/history/community.jpg`,                // Old parish community gathering

  // ── Gallery (About page) ──
  gallery: [
    { src: `${B}photos/gallery/aerial-overview.jpg`, alt: "gallery.aerial" },
    { src: `${B}photos/gallery/aerial-campus.jpg`, alt: "gallery.campus" },
    { src: `${B}photos/gallery/IMG_4588.jpg`, alt: "gallery.nave" },
    { src: `${B}photos/gallery/F69A5771.jpg`, alt: "gallery.stRose" },
    { src: `${B}photos/gallery/F69A5788.jpg`, alt: "gallery.friarStatue" },
    { src: `${B}photos/gallery/exterior-statue.jpg`, alt: "gallery.exterior" },
    { src: `${B}photos/gallery/aerial-rooftop.jpg`, alt: "gallery.rooftop" },
    { src: `${B}photos/gallery/vigil-fire.jpg`, alt: "gallery.easterFire" },
    { src: `${B}photos/gallery/exterior-entrance.jpg`, alt: "gallery.entrance" },
    { src: `${B}photos/gallery/exterior-signage.jpg`, alt: "gallery.signage" },
    { src: `${B}photos/gallery/F69A5475.jpg`, alt: "gallery.mural" },
    { src: `${B}photos/gallery/F69A5507.jpg`, alt: "gallery.monstrance" },
    { src: `${B}photos/gallery/IMG_4583.jpg`, alt: "gallery.preaching" },
    { src: `${B}photos/gallery/F69A5752.jpg`, alt: "gallery.madonna" },
    { src: `${B}photos/gallery/F69A5784.jpg`, alt: "gallery.alcove" },
    { src: `${B}photos/gallery/crucifix.jpg`, alt: "gallery.crucifix" },
  ],
};
