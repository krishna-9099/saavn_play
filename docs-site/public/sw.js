const CACHE_VERSION = 'v2.0.0';
const STATIC_CACHE = `saavn-docs-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `saavn-docs-dynamic-${CACHE_VERSION}`;
const OFFLINE_CACHE = `saavn-docs-offline-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/saavn_play/',
  '/saavn_play/index.html',
  '/saavn_play/favicon.svg',
  '/saavn_play/logo.svg',
  '/saavn_play/manifest.json',
  '/saavn_play/offline.html',
  '/saavn_play/feed.xml',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
      caches.open(OFFLINE_CACHE).then((cache) => cache.add('/saavn_play/offline.html')),
    ])
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE && key !== OFFLINE_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  if (url.pathname.startsWith('/api/') || url.hostname !== location.hostname) {
    event.respondWith(networkFirst(request));
  } else if (url.pathname.endsWith('.html') || url.pathname === '/saavn_play/' || url.pathname === '/saavn_play') {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-feedback') {
    event.waitUntil(syncFeedback());
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    if (request.destination === 'document') {
      return caches.match('/saavn_play/offline.html');
    }
    return new Response('', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.destination === 'document') {
      return caches.match('/saavn_play/offline.html');
    }
    return new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => {
    if (cached) return cached;
    return caches.match('/saavn_play/offline.html');
  });

  return cached || fetchPromise;
}

async function syncFeedback() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    const feedbackRequests = requests.filter((r) => r.url.includes('/api/feedback'));

    for (const request of feedbackRequests) {
      const response = await cache.match(request);
      if (response) {
        const body = await response.json();
        await fetch(request.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        await cache.delete(request);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}
