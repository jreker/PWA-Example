import * as Push from './push.js';


let swRegistration = null;
let isSubscribed = false;
const button = document.getElementById("btnPush");


//register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')  // Optional (if you have a subfolder and not the root you have to change the scope! Also in the manifest file.): ,{scope: '/app/'})
      .then(
        function(registration) { 
            console.log('Service worker successfully registered for:', registration.scope);
            swRegistration = registration;
            //with callback to set the state
            Push.getSubscriptionStatus(swRegistration,setState);
          }
        )
      .catch(
        err => console.log('Service worker registration failed:',err
        ));

    if('PushManager' in window) {
      console.log("Push messages are supported on your browser!")
    } else {
      console.log("Push messages are not supported by your browser!")
    }
}

function setState(state) {
  isSubscribed = state;
  
  if(isSubscribed) {
    button.textContent = "Unsubscribe";
  } else {
    button.textContent = "Subscribe";
  }

  if(Notification.permission === 'denied') {
    button.textContent = "Push denied."
    button.disabled = true;
  }
}
 

button.addEventListener('click', function() {
  if(isSubscribed) {
    console.log("unsubscribe");
    button.textContent = "Subscribe";
  } else {
    console.log("Subscribe")
    Push.subscribeToPush(swRegistration, setState);
    button.textContent = "Unsubscribe";
  }
});

