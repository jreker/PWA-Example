var webpush = require('web-push');

const vapidKeys = {
    publicKey: '<PUBLIC KEY>',
    privateKey: '<PRIVATE KEY>',
}

webpush.setVapidDetails(
    'mailto:mail@mymail.de',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

exports.sendMessage = function (message, url, push_subscription) {
    const payload = JSON.stringify({
        message: message,
        url: url
    });

    const options = {
        TTL: 60
    }
    webpush.sendNotification(push_subscription, payload, options);
}