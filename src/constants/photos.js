/**
 * Parish Photo Configuration
 *
 * Drop photos into public/photos/ and update the paths here.
 * All photos are optional — pages render beautiful gradient fallbacks when
 * no image is configured (path is empty string or the file doesn't exist).
 *
 * Recommended sizes (will be displayed at these max resolutions):
 *   hero:     1920 × 800   (wide banner)
 *   gallery:  800 × 600    (landscape)
 *   square:   600 × 600    (portrait/square)
 *
 * Formats: .webp preferred, .jpg works fine
 */
export const PHOTOS = {
  // ── Hero backgrounds ──
  homeHero: "",                              // Church exterior or interior wide shot
  aboutHero: "",                             // Historical or architectural wide shot
  visitHero: "",                             // Welcoming entrance or exterior shot

  // ── Section backgrounds ──
  aboutArchitecture: "/photos/crucifix-hero.jpg",  // Interior architectural detail — crucifix
  dominicanCharism: "/photos/crucifix-hero.jpg",   // Dominican-themed crucifix on oak paneling

  // ── Gallery (About page) — add as many as you like ──
  gallery: [
    { src: "/photos/gallery/crucifix.jpg", alt: "gallery.crucifix" },
    // { src: "/photos/gallery/church-exterior.webp", alt: "gallery.exterior" },
    // { src: "/photos/gallery/sanctuary.webp",       alt: "gallery.sanctuary" },
    // { src: "/photos/gallery/stained-glass.webp",   alt: "gallery.stainedGlass" },
    // { src: "/photos/gallery/altar.webp",           alt: "gallery.altar" },
    // { src: "/photos/gallery/community.webp",       alt: "gallery.community" },
  ],
};
