Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "localhost:80",
  })
);

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    toggles: function (data) {
      console.log("new toggles received");

      this.toggles = data;

      // this._data = data
      this.isFetching = false;
    },
  },
  data() {
    return {
      isFetching: true,
      toggles: {
        exhibition: {
          state: false,
          countdownActive: false,
          pgvalue: 0,
          lastSwitchOn: null,
        },
      },
    };
  },
  computed: {
    mainToggle() {
      return this.toggles.exhibition;
    },
  },
  mounted() {
    // throw new Error('Oops');
  },
  methods: {
    sendState: function (toggle) {
      console.log("sending toggles");
      this.$socket.emit("toggles", this.toggles);
    },
  },
});
