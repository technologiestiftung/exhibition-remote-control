Vue.use(VueNativeSock.default, 'ws://localhost:80', {
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
  format: 'json'
})

var vm = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  watch: {
    toggleState: function(state) {
      // console.log("exhibition changed" + state)

      if (state) this.startCountdown();
      this.$socket.sendObj({'exhibitionState': state})
    }
  },
  methods : {
    startCountdown: function() {
      this.lastSwitchOn = new Date();

      this.intervalid = setInterval(() => {

        this.pgvalue = (new Date() - this.lastSwitchOn) / this.milliSecondsBeforeRestart

        if (this.pgvalue > 1) {
          // console.log("stop")
          clearInterval(this.intervalid)
        }
        // console.log(this.pgvalue)
      }, 50);
    }
  },
  computed : {
    milliSecondsBeforeRestart : function() {
      return this.minutesBeforeNextToggle * 60 * 1000
    },
    countdownActive : function() {
      return this.pgvalue > 0 && this.pgvalue < 1
    }
  },
  data : function () {
    return {
      toggleState : false,
      // message : '',
      pgvalue : 0,
      lastSwitchOn : null,
      intervalid:'',
      minutesBeforeNextToggle : 0.05
    }
  }
})
