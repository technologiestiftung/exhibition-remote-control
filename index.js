require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const basicAuth = require('express-basic-auth');

const tplink = new (require('tplink-smarthome-api').Client)()

// load IPs from config. Alternatively, startDiscovery() could be used.
const config = require('./config.json');

let plugs = []
for (const ip of config.plugs) {
  plugs.push(tplink.getPlug({ host: ip }))
}

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

let state = {
  'exhibition': false
}

function parseMessage(str) {
  try {
      return JSON.parse(str);
  } catch (e) {
      return str;
  }
}

wss.on('connection', (ws) => {
  // console.log('websocket connected')

  // ws.send(state);

  ws.on('message', (message) => {
      state = parseMessage(message)

      let i = 0
      for (const plug of plugs) {
        setTimeout(() => plug.setPowerState(state.exhibition), i * 1000); // staggered on/off
        i++
      }

  });

});

//start our server
server.listen(process.env.PORT || 80, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

const users = {}
users[process.env.USER_NAME] = process.env.PASSWORD

app.use(basicAuth({
    users: users,
    challenge: true
}))
app.use(express.static('public'))
