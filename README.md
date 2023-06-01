# Progressive Web App Example

## Getting started
1. Generate VAPID-Keys for securing the communication:
```bash
node ./web-push-server/vapidGen.js
```

2. Take the public and private key and put it into the server (push.js). Also set your e-mail address for contacting
```javascript
const vapidKeys = {
    publicKey: '<PUBLIC KEY>', //set public key to generated one
    privateKey: '<PRIVATE KEY>', // set private key to generated one
} 

webpush.setVapidDetails(
    'mailto:mail@mymail.de', //set this e-mail to yours
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

```
3. Take the public key and put it into the client website (./js/app.js) at the top
```javascript
// changed this key to the generated key from vapidGen.js
const appServerPubKey = "<<PUBLIC KEY>>";
```

4. Run server and open client and subscribe to push service. 

5. Invoke Server POST: http:localhost:3300/sendmessage to send message to subscribed clients:
```json
{
    "message":"This is a new message",
    "url":"http://localhost:3000/myNewMessagePost"
}
```

## Push-API Example
If you want to use push notifications in the browser you need to implement three different technologies:
- Notification API
- Push API 
- HTTP Web Push

## Push API
### Secure communication between client an push api
VAPID keys can be used to secure communication between the push service

## Tech Stack:
- Javascript/HTML
- Bootstrap 5

## PWA
The PWA things in this project are:
- added manifest file
- added service-worker
- added registering of service worker
- added push-api

Have fun!