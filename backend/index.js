// @ts-check
const server = require("./lib/server");
const { io, connectionHandler } = require("./lib/websocket-server");
io.on("connection", connectionHandler);
// start our server
server.listen(process.env.PORT || 80, () => {
  console.log(`Server started on port http://localhost:${process.env.PORT} :)`);
});

