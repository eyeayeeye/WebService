const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var rooms = {};

app.get("/", (req, res) => {
  console.log("Hi");
});
app.get("/allrooms", (req, res) => {
  return res.status(200).send(JSON.stringify(Object.keys(rooms)));
});

app.post("/allrooms", (req, res) => {
  if (!(req.body.id in rooms)) {
    rooms[req.body.id] = {
      users: []
    };
    return res.status(201).send(JSON.stringify({ id: req.body.id }));
  } else {
    return res
      .status(404)
      .send(JSON.stringify(req.body.id + " already exists"));
  }
});

app.put("/allrooms", (req, res) => {
  if (!(req.body.id in rooms)) {
    rooms[req.body.id] = {
      users: []
    };
    return res.status(201).send(JSON.stringify({ id: req.body.id }));
  } else {
    return res.status(200).send(JSON.stringify({ id: req.body.id }));
  }
});

app.delete("/allrooms", (req, res) => {
  if (req.body.id in rooms) {
    delete rooms[req.body.id];
    return res.status(200).send(JSON.stringify(req.body.id + " is deleted"));
  } else {
    return res.status(404).send(JSON.stringify("Room id is not found"));
  }
});

// room
app.get("/room/:id", (req, res) => {
  const room_id = req.params.id;
  try {
    return res.status(200).send(JSON.stringify(rooms[room_id].users));
  } catch (e) {
    return res.status(404).send(JSON.stringify('Room does not exist"'));
  }
});
app.post("/room/:id", (req, res) => {
  const room_id = req.params.id;
  const username = req.body.user;
  const idx = rooms[room_id].users.indexOf(username);
  if (idx !== -1) {
    return res.status(200).send(JSON.stringify({}));
  } else {
    rooms[room_id].users.push(username);
    return res.status(201).send(JSON.stringify({}));
  }
});
app.put("/room/:id", (req, res) => {
  const room_id = req.params.id;
  const username = req.body.user;
  const idx = rooms[room_id].users.indexOf(username);
  if (idx !== -1) {
    return res.status(200).send(JSON.stringify({}));
  } else {
    rooms[room_id].users.push(username);
    return res.status(201).send(JSON.stringify({}));
  }
});
app.delete("/room/:id", (req, res) => {
  const room_id = req.params.id;
  const username = req.body.user;
  try {
    const idx = rooms[room_id].users.indexOf(username);
    if (idx !== -1) {
      rooms[room_id].users = rooms[room_id].users.filter(
        user => user !== username
      );
      return res
        .status(200)
        .send(JSON.stringify(`${username} leaves the room`));
    } else {
      rooms[room_id].users.push(username);
      return res.status(404).send(JSON.stringify(`User id is not found`));
    }
  } catch (e) {
    return res.status(404).send(JSON.stringify(`User id is not found`));
  }
});
// user
app.get("/users", (req, res) => {
  const users_temp = {};
  for (let key of Object.keys(rooms)) {
    for (let user of room[key].users) {
      users_temp[user] = "";
    }
  }
  return res.status(200).send(JSON.stringify(Object.keys(users_temp)));
});
module.exports = app;
