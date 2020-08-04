const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const basicAuth = require('express-basic-auth');

const TpLinkClient = require('tplink-smarthome-api').Client

const tplink = new TpLinkClient();

const plug = tplink.getPlug({ host: '192.168.230.253' });



//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });


function parseMessage(str) {
  try {
      return JSON.parse(str);
  } catch (e) {
      return str;
  }
}

wss.on('connection', (ws) => {

  // console.log('websocket connected')

  //connection is up, let's add a simple simple event
  ws.on('message', (message) => {
      message = parseMessage(message)
      // console.log('received: %s', message);
      // ws.send(`Hello, you sent -> ${message}`);

      // console.log(message.exhibition)

      if (message.exhibitionState) {
        plug.setPowerState(true);
      } else {
        plug.setPowerState(false);
      }
  });

  //send immediatly a feedback to the incoming connection
  // ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 80, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

app.use(basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true
}))
app.use(express.static('public'))
