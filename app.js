const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var rooms = {};

app.get("/", (req, res) => {
  console.log("Hi");

app.get("/allrooms", (req, res) => {
  return res.status(200).send(Object.keys(rooms));
});

app.post("/allrooms", (req, res) => {
  if (!(req.body.id in rooms)) {
    rooms[req.body.id] = {
      users: []
    };
    return res.status(201).send({ id: req.body.id });
  } else {
    return res.status(404).send(req.body.id + " already exists");
  }
});

app.put("/allrooms", (req, res) => {
  if (!(req.body.id in rooms)) {
    rooms[req.body.id] = {
      users: []
    };
    return res.status(201).send({ id: req.body.id });
  } else {
    return res.status(200).send({ id: req.body.id });
  }
});

app.delete("/allrooms", (req, res) => {
  if (req.body.id in rooms) {
    delete rooms[req.body.id];
    return res.status(200).send(req.body.id + " is deleted");
  } else {
    return res.status(404).send(req.body.id + " is not found");
  }
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
