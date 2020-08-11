const onChange = require("on-change");
const plugs = require("./plugs");
const utils = require("./utils");
const io = require("./websocket-server");
const initialState = {
  toggles: {
    exhibition: {
      state: false,
      countdownActive: false,
      pgvalue: 0,
      lastSwitchOn: null,
    },
  },
};

const store = onChange(initialState, function (path, value, previousValue) {
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

    if (value) utils.startCountdown(store, utils.calcMillisBeforeRestart());
  }

  // console.log("updating all devices")
  io.emit("toggles", store.toggles);
});
module.exports = store;