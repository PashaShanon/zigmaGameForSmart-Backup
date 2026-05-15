const CACHE_NAME = 'zigma-cache-v2.2'; // Bust old cache - fix PWA icon
const ASSETS_TO_CACHE = [
  '/manifest.json',
  '/logo/Zigma-logo-fix.webp',
  '/logo/gameforsmart-logo-fix.webp'
];

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Do NOT cache index.html or '/' — SPA routing must always hit the server/index.html directly.

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener('fetch', (event) => {
  // Only intercept GET requests from same origin
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  // NEVER intercept navigation requests (HTML pages) — let SPA router handle them
  if (event.request.mode === 'navigate') return;

  // NEVER intercept WebSocket upgrade or Colyseus API calls
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/colyseus')) return;

  // Only cache static assets (images, fonts, manifest)
  const isStaticAsset = /\.(png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|eot|json)$/i.test(url.pathname);
  if (!isStaticAsset) return;

  // Network-first for static assets: try network, fall back to cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
