const webpush = require('web-push');

console.log("Generation of Vapid-Keys for secure Web-Push:");
//initial generation of VAPID-Keys
const vapidKeys = webpush.generateVAPIDKeys();
console.log(vapidKeys);