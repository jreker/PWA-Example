const cacheName = "testwebsite-cache";
const thingsToCache = [
    'index.html',
    'images/icon-48.png'
]


self.addEventListener('install',function(event) {
    //fires when sw is installed
    console.log("Service worker installed!");
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
      .then(cachedResponse => cachedResponse || fetch(event.request))
   );
});