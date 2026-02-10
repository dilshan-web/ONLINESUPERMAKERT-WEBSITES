const CACHE_NAME = 'rubik-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/shop.html',
    '/cart.html',
    '/about.html',
    '/assets/css/style.css',
    '/assets/js/app.js',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
