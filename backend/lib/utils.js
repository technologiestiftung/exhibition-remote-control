// @ts-check
const config = require("../config.json");
const TPLinkClient = require("tplink-smarthome-api").Client;
const tplink = new TPLinkClient();
const minutesBeforeNextToggle = process.env.EXPECTED_BOOT_DURATION_IN_MIN ? parseInt(process.env.EXPECTED_BOOT_DURATION_IN_MIN) : 3;

module.exports = {
  calcMillisBeforeRestart: function () {
    const milliSecondsBeforeRestart = minutesBeforeNextToggle * 60 * 1000;
    return milliSecondsBeforeRestart;
  },
  setupPlugs: function () {
    const plugs = [];
    for (const ip of config.plugs) {
      plugs.push(tplink.getPlug({ host: ip }));
    }
    return plugs;
  },
  startCountdown: /**
   * @param {{ toggles: { exhibition: {lastSwitchOn: number|Date,countdownActive: boolean; pgvalue: number}; }; }} store
   * @param {number} milliSecondsBeforeRestart
   */
    function (store, milliSecondsBeforeRestart) {
      console.log("startCountdown");
      const toggle = store.toggles.exhibition;
      toggle.lastSwitchOn = new Date();
      toggle.countdownActive = true;

      const intervalid = setInterval(() => {
        console.log('toggle.lastSwitchOn ', toggle.lastSwitchOn);
        //
        // The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type. @jvolker
        const now = new Date();
        toggle.pgvalue =
          (now - toggle.lastSwitchOn) / milliSecondsBeforeRestart;

        if (toggle.pgvalue > 1) {
          console.log("stop");
          clearInterval(intervalid);
          toggle.countdownActive = false;
        }
        // console.log(toggle.pgvalue)
      }, 50);
    }
};