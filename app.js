const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var roomList = [];

var rooms = {};

app.get("/", (req, res) => {
  console.log("Hi");
});
app.put("/allrooms", (req, res) => {
  roomList.push(req.body.id);

  console.log(roomList, roomList.indexOf(req.body.id));
});

// room
app.get("/room/:id", (req, res) => {
  const room_id = req.params.id;
  return res.status(200).send(rooms[room_id].users);
});
app.post("/room", (req, res) => {
  const room_id = req.params.id;
  const username = req.body.user;
  const idx = rooms[room_id].users.indexOf(username);
  if (idx !== -1) {
    return res.status(200).send({});
  } else {
    rooms[room_id].users.push(username);
    return res.status(201).send({});
  }
});
app.put("/room/:id", (req, res) => {
  const room_id = req.params.id;
  const username = req.body.user;
  const idx = rooms[room_id].users.indexOf(username);
  if (idx !== -1) {
    return res.status(200).send({});
  } else {
    rooms[room_id].users.push(username);
    return res.status(201).send({});
  }
});
app.delete("/room/:id", (req, res) => {
  const room_id = req.params.id;
  const username = req.body.user;
  const idx = rooms[room_id].users.indexOf(username);
  if (idx !== -1) {
    rooms[room_id].users = rooms[room_id].users.filter(
      user => user !== username
    );
    return res.status(200).send(`${username} leaves the room`);
  } else {
    rooms[room_id].users.push(username);
    return res.status(201).send(`${username} is not found`);
  }
});
// user
app.get("/users", (req, res) => {
  const users = {};
  for (let key of Object.keys(rooms)) {
    for (let user of room[key].users) {
      users[user] = "";
    }
  }
  return res.status(200).send(Object.keys(users));
});
module.exports = app;
