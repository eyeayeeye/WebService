const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var roomList = [];
app.get("/", (req, res) => {
  console.log("Hi");
});
app.put("/allrooms", (req, res) => {
  roomList.push(req.body.id);

  console.log(roomList, roomList.indexOf(req.body.id));
});

module.exports = app;
