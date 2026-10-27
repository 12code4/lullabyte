// LULLABYTE service worker.
// Navigations (the app shell) are network-first so updates actually ship;
// hashed build assets are cache-first (their names change every build).
// Offline always falls back to the cache, so the myu is always home.
const CACHE = "lullabyte-v2";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(["./", "./manifest.webmanifest"])),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const sameOrigin = new URL(e.request.url).origin === location.origin;
  if (!sameOrigin) return;

  const put = (res) => {
    if (res && res.ok) {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
    }
    return res;
  };

  if (e.request.mode === "navigate") {
    // network-first: fresh shell when online, cached shell offline
    e.respondWith(
      fetch(e.request).then(put).catch(() =>
        caches.match(e.request).then((hit) => hit ?? caches.match("./")),
      ),
    );
    return;
  }

  // assets: cache-first (build assets are content-hashed)
  e.respondWith(
    caches.match(e.request).then((hit) => hit ?? fetch(e.request).then(put)),
  );
});
