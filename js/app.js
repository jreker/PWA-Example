if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => console.log('Service worker successfully registered for ${registration.scope}'))
      .catch(err => console.log('Service worker registration failed: ${err}'));
  }

console.log("Served from server?");