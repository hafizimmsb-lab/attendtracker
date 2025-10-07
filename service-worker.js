
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('scantrack-store').then(function(cache) {
      return cache.addAll([
        'index.html',
        'style.css',
        'app.js',
        'app_database.json'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
