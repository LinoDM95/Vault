// service-worker.js

const CACHE_NAME = 'meine-app-cache-v1';
const URLs_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js'
];

self.addEventListener('install', event => {
  console.log('[ServiceWorker] installing');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Caching assets...');
        return cache.addAll(URLs_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] activated.');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] delete cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
