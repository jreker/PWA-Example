const currentCacheName = "cache-v2";
const resourcesToCache = [
    'index.html',
    'images/icon-48.png',
    '/'
]


self.addEventListener('install',function(event) {
    //if skipWaiting is called, the activate event will directly called after install
    //maybe your application can have a problem with this skipWaiting
    self.skipWaiting();
    
    //fires when sw is installed
    console.log("Service worker installed!");
    //wait (synch function) till the cache is filled
    event.waitUntil(
        caches.open(currentCacheName)
        .then(function(cache) {
            return cache.addAll(resourcesToCache);
        })
    );
});

//activate event will be thrown for example when something inside the service worker changed and the new service worker will be activated.
//but you have to visit the page again to activate it (refresh is not enougth)
// https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
self.addEventListener('activate', function(event) {
    //console.log(caches);
    console.log("Service worker activated.");
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
              if(cacheName !== currentCacheName){
                return true;
                }
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
       })
    );
});

self.addEventListener('fetch', function(event) {
    //first try to get everything from over the network
    //if it fails try to get it from the cache.
    event.respondWith(async function() {
        try {
          return await fetch(event.request);
        } catch (err) {
          return caches.match(event.request);
        }
      }());
});