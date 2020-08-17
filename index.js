// @ts-check
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const onChange = require("on-change");
const express = require("express");
const app = express();
const http = require("http");
const basicAuth = require("express-basic-auth");

const tplink = new (require("tplink-smarthome-api").Client)();

// load IPs from config. Alternatively, startDiscovery() could be used.
const config = require("./config.json");

const plugs = [];
for (const ip of config.plugs) {
  plugs.push(tplink.getPlug({ host: ip }));
}

// initialize a simple http server
const server = http.createServer(app);

var io = require("socket.io").listen(server);

const minutesBeforeNextToggle = process.env.EXPECTED_BOOT_DURATION_IN_MIN || 3
const milliSecondsBeforeRestart = minutesBeforeNextToggle * 60 * 1000
let intervalid

const _store = {
  toggles: {
    exhibition: {
      state: false,
      countdownActive: false,
      pgvalue: 0,
      lastSwitchOn: null,
    },
  },
};

const store = onChange(_store, function (path, value, previousValue) {
  // console.log('this:', this);
  // console.log('path:', path);
  // console.log('value:', value);
  // console.log('previousValue:', previousValue);

  // TODO : handle this in receiving toggle changes
  if (path === "toggles.exhibition.state" && value !== previousValue) {
    let i = 0;
    for (const plug of plugs) {
      // console.log(plug, value)
      setTimeout(() => plug.setPowerState(value), i * 1000); // staggered on/off
      i++;
    }

    if (value) startCountdown();
  }

  // console.log("updating all devices")
  io.emit("toggles", store.toggles);
});

function startCountdown() {
  console.log("startCountdown");
  const toggle = store.toggles.exhibition;
  toggle.lastSwitchOn = new Date();
  toggle.countdownActive = true;

  intervalid = setInterval(() => {
    // console.log('toggle.lastSwitchOn ',toggle.lastSwitchOn)
    //
    // The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type. @jvolker
    toggle.pgvalue =
      (new Date() - toggle.lastSwitchOn) / milliSecondsBeforeRestart;

    if (toggle.pgvalue > 1) {
      // console.log("stop")
      clearInterval(intervalid);
      toggle.countdownActive = false;
    }
    // console.log(toggle.pgvalue)
  }, 50);
}

io.on("connection", (socket) => {
  console.log("socket.io client connected");

  socket.emit("toggles", store.toggles);

  socket.on("toggles", (data) => {
    console.log("new toggles received");

    for (const key in data) {
      store.toggles[key].state = data[key].state;
    }
  });
});

// start our server
server.listen(process.env.PORT || 80, () => {
  console.log(`Server started on port ${process.env.PORT} :)`);
});

const users = {};
users[process.env.USER_NAME] = process.env.PASSWORD;

app.use(
  basicAuth({
    users: users,
    challenge: true,
  })
);
app.use(express.static("public"));
