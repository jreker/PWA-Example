var push_wrapper = require('./push.js');
const express = require('express');
var cors = require('cors')

var app = express();
app.use(express.json());
app.use(cors())

const port = 3300;

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var subscriptions = [];

app.get('/subscriptions',cors(corsOptions), (req, res) => {
    res.send(subscriptions.toString())
})

app.post('/sendmessage', cors(corsOptions), (req, res) => {
    subscriptions.forEach(sub => {
        console.log("Send push message to " + sub.endpoint);
        push_wrapper.sendMessage(req.body.message, req.body.url, sub);
    });    
    res.send("Push Message send!")
});

app.post('/subscribe', cors(corsOptions), (req,res) => {
    console.log("Client subscribed.");
    subscriptions.push(req.body);

    const response = {
        "result":"registered",
        "endpoint":req.body.endpoint
    }

    res.send(JSON.stringify(response));
});

app.listen(port, () => {
    console.log('Web Push Server listening on port ' + port)
});