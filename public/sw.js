const CACHE_NAME = "st-dominic-v1";
const BASE = self.registration?.scope || "/";
const STATIC_ASSETS = [
  BASE,
  BASE + "manifest.json",
  BASE + "favicon.svg",
  BASE + "offline.html",
];

// Install: pre-cache essential assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for navigations & API, cache-first for static assets
self.addEventListener("fetch", (e) => {
  const { request } = e;

  // Skip non-GET and chrome-extension requests
  if (request.method !== "GET" || request.url.startsWith("chrome-extension")) return;

  // Google Sheets API calls — network only, don't cache
  if (request.url.includes("docs.google.com/spreadsheets")) {
    e.respondWith(fetch(request).catch(() => new Response("{}", { status: 503 })));
    return;
  }

  // HTML navigations — network first, fall back to cache, then offline page
  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return res;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(BASE + "offline.html"))
        )
    );
    return;
  }

  // Static assets (JS, CSS, images, fonts) — stale-while-revalidate
  e.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return res;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
