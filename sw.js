// sw.js — instant updates + network-first HTML + offline fallback for GitHub Pages

const ROOT = '/scruffy-butts-prototype/';       // <-- your repo base on GitHub Pages
const INDEX = ROOT + 'index.html';
const RUNTIME = 'runtime-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting(); // take over immediately
  // Pre-cache the shell so offline fallback works
  event.waitUntil((async () => {
    const cache = await caches.open(RUNTIME);
    try {
      const res = await fetch(INDEX, { cache: 'no-store' });
      if (res && res.ok) await cache.put(INDEX, res.clone());
    } catch (_) { /* ignore if offline on first install */ }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // control all open tabs
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Always try fresh HTML first so new deploys show instantly
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith((async () => {
      try {
        // network first for documents
        return await fetch(req);
      } catch {
        // offline fallback to cached index
        return (await caches.match(INDEX)) || Response.error();
      }
    })());
    return;
  }

  // Same-origin static assets: stale-while-revalidate
  if (url.origin === location.origin && ['script','style','image','font'].includes(req.destination)) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Everything else (e.g., cross-origin iframe): just go network
  event.respondWith(fetch(req));
});

async function staleWhileRevalidate(req) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(req);
  const network = fetch(req).then(res => {
    if (res && res.status === 200) cache.put(req, res.clone());
    return res;
  }).catch(() => cached);
  return cached || network;
}
