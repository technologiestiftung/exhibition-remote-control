const basicAuth = require("express-basic-auth");
const express = require("express");
const path = require("path");
const http = require("http");

const app = express();
// initialize a simple http server
const server = http.createServer(app);

const users = {};
users[process.env.USER_NAME] = process.env.PASSWORD;

app.use(
  basicAuth({
    users: users,
    challenge: true,
  })
);
app.use(express.static(path.resolve(__dirname, '../../client')));

module.exports = server;