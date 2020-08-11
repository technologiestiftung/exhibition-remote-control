const socketIo = require('socket.io');
const server = require('./server');
const io = socketIo.listen(server);
const store = require('./store');
const togglesHandler = (data) => {
  console.log("new toggles received");
  for (const key in data) {
    store.toggles[key].state = data[key].state;
  }
};
module.exports = {
  togglesHandler,
  io, connectionHandler: (socket) => {
    console.log("socket.io client connected");

    socket.emit("toggles", store.toggles);

    socket.on("toggles", togglesHandler);
  }
};