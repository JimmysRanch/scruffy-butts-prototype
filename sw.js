// sw.js — instant update + network-first for HTML

self.addEventListener('install', (event) => {
  self.skipWaiting();              // take over immediately
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // control all open tabs
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Always load fresh HTML (so new deploys show instantly)
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(fetch(req).catch(() => caches.match('/scruffy-butts-prototype/index.html')));
    return;
  }

  // Static assets on same origin: stale-while-revalidate
  if (url.origin === location.origin && ['script','style','image','font'].includes(req.destination)) {
    event.respondWith(staleWhileRevalidate(req));
    return;
  }

  // Everything else: network
  event.respondWith(fetch(req));
});

const RUNTIME = 'runtime-v1';
async function staleWhileRevalidate(req) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(req);
  const network = fetch(req).then(res => {
    if (res && res.status === 200) cache.put(req, res.clone());
    return res;
  }).catch(() => cached);
  return cached || network;
}
