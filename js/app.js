//register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')  // Optional (if you have a subfolder and not the root you have to change the scope! Also in the manifest file.): ,{scope: '/app/'})
      .then(registration => console.log('Service worker successfully registered for:', registration.scope))
      .catch(err => console.log('Service worker registration failed:',err));
}