let swRegistration = null;
let isSubscribed = false;
const btnPush = document.getElementById("btnSubscribe");
const btnRequestAccess = document.getElementById("btnRequestAccess")

// changed this key to the generated key from vapidGen.js
const appServerPubKey = "<<PUBLIC KEY>>";
// web push server url
const url = "http://localhost:3300/subscribe"


//register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')  // Optional (if you have a subfolder and not the root you have to change the scope! Also in the manifest file.): ,{scope: '/app/'})
    .then(
      function (registration) {
        console.log('Service worker successfully registered for:', registration.scope);
        swRegistration = registration;
        //with callback to set the state
        getSubscriptionStatus(swRegistration, setState);
      }
    )
    .catch(
      err => console.log('Service worker registration failed:', err
      ));

  if ('PushManager' in window) {
    console.log("Push messages are supported on your browser!")
  } else {
    console.log("Push messages are not supported by your browser!")
  }
}


navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
  serviceWorkerRegistration.pushManager
  .getSubscription()
  .then((subscription) => {
    getSubscriptionStatus(subscription, setState)
    //TODO: Update server side
  })
})

function getSubscriptionStatus(subscription, setState) {
      if (subscription !== null) {
        setState(true);
        console.log("Current subscription: ", JSON.stringify(subscription));
      }
}

function setState(state) {
  isSubscribed = state;

  if (isSubscribed) {
    btnSubscribe.textContent = "Unsubscribe";
  } else {
    btnSubscribe.textContent = "Subscribe";
  }

  if (Notification.permission === 'denied') {
    btnSubscribe.textContent = "Push denied."
    btnSubscribe.disabled = true;
  }
}


btnSubscribe.addEventListener('click', function () {
  if (isSubscribed) {
    console.log("unsubscribe");
    btnSubscribe.textContent = "Subscribe";
  } else {
    console.log("Subscribe")
    subscribeToPush(swRegistration, setState);
    btnSubscribe.textContent = "Unsubscribe";
  }
});

btnRequestAccess.addEventListener('click', function () {

  const result = Notification.requestPermission();
  if (result === 'granted') {
    console.log("Permission granted!")
  }
});


// +++++++++++++++++++++++++++++++++++++ HELPER FUNCTIONS +++++++++++++++++++++++++++++



function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// ++++++++++++++++++++++++++++++++++++ WEB PUSH ++++++++++++++++++++++++++++++++++

function updateSubscriptionOnServer(subscription) {
  
  const options = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription) 
  };

  fetch(url, options)
    .then(response => response.json()) 
    .then(data => {
      console.log('Subscription successful', data); 
    })
    .catch(error => {
      console.error('Error subscribing push notifications:', error); 
    });
}


/**
 * 
 * @param {*} swRegistration 
 * @param {*} setState 
 */
function subscribeToPush(swRegistration, setState) {

  const applicationServerKey = urlB64ToUint8Array(appServerPubKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
    .then(function (subscription) {
      console.log('User is subscribed.');
      console.log(subscription);
      updateSubscriptionOnServer(subscription);
      setState(true);
    })
    .catch(function (err) {
      console.log('Failed to subscribe the user: ', err);
      setState(false);
    });
}

