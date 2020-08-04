require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
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

var io = require('socket.io').listen(server);

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

io.on('connection', (socket) => {
  console.log('socket.io client connected')

  socket.emit('state', state)

  // ws.send(JSON.stringify(state));

  socket.on('state', (data) => {
    console.log("new state received")
    // state = parseMessage(data)
    // console.log(data)
    state = data

    let i = 0
    for (const plug of plugs) {
      setTimeout(() => plug.setPowerState(state.exhibition), i * 1000); // staggered on/off
      i++
    }

    io.emit('state', state);

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
