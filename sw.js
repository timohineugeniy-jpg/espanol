// Сначала сеть, потом кэш: новые темы приходят сразу, без интернета работает последняя версия.
const CACHE = 'es-app';
const FILES = ['./', 'index.html', 'style.css', 'app.js', 'data/grammar.js', 'data/vocab.js', 'manifest.json', 'icons/icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
