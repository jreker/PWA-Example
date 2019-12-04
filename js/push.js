import * as Helpers from './helpers.js';

const appServerPubKey = "<appserverkey>";

export function createPush() {

    
}

export function subscribeToPush(swRegistration,setState) {

        const applicationServerKey = Helpers.urlB64ToUint8Array(appServerPubKey);
        swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        })
        .then(function(subscription) {
          console.log('User is subscribed.');
      
          //updateSubscriptionOnServer(subscription);
            setState(true);
        })
        .catch(function(err) {
          console.log('Failed to subscribe the user: ', err);
          setState(false);
        });
}

export function getSubscriptionStatus(swRegistration, setState) {
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
        if(subscription !== null) {
          setState(true);
          console.log("Current subscription: ",subscription);
          console.log("Current subscription: ",JSON.stringify(subscription));
        }
    });
}