// Vue.use(VueNativeSock.default, 'ws://localhost:80', {
//   reconnection: true, // (Boolean) whether to reconnect automatically (false)
//   reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
//   reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
//   format: 'json'
// })

const socket = io();

var vm = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  watch: {
    'state.exhibition' : function(state) {
      this.startCountdown();
    },
    // state: function(_state) {
    //   // this.$socket.sendObj(_state)
    //   socket.emit('socket', _state)
    // }
  },
  mounted : function () {

    socket.on('state', data => {
      // this.withoutWatchers(() => {
        console.log('new state received')
        this.state = data
      // })
    });

    // this.$options.sockets.onmessage = (message) => {
    //   this.state = JSON.parse(message.data)
    //   // console.log()
    // }
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
    },
    sendState: function() {
      socket.emit('state', this.state)
      console.log('new state sent')
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
      state : {
        exhibition : false
      },
      // message : '',
      pgvalue : 0,
      lastSwitchOn : null,
      intervalid:'',
      minutesBeforeNextToggle : 0.05
    }
  }
})
