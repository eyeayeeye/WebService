const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var rooms = {};
var mongoose = require("mongoose");
const dev_db_url =
  "mongodb+srv://admineq:admineq@parallel-fnvjs.mongodb.net/test?retryWrites=true";
mongoose.connect(dev_db_url);

var Schema = mongoose.Schema;

var rooms = new Schema({
  id: String,
  user_id: [String]
});

var Room = mongoose.model("Room", rooms);

app.get("/", (req, res) => {
  console.log("Hi");
});
app.get("/allrooms", async (req, res) => {
  const room = await Room.find({});
  return res.status(200).send(
    JSON.stringify(
      room.map(r => {
        return r.id;
      })
    )
  );
});

app.post("/allrooms", async (req, res) => {
  const room = await Room.find({ id: req.body.id });
  if (room.length == 0) {
    await Room.create({ id: req.body.id, user_id: [] });
    return res.status(201).send(JSON.stringify({ id: req.body.id }));
  }
  return res.status(404).send(JSON.stringify(req.body.id + " already exists"));
});

app.put("/allrooms", async (req, res) => {
  const room = await Room.find({ id: req.body.id });
  if (room.length == 0) {
    await Room.create({ id: req.body.id, user_id: [] });
    return res.status(201).send(JSON.stringify({ id: req.body.id }));
  }
  return res.status(200).send(JSON.stringify({ id: req.body.id }));
});

app.delete("/allrooms", async (req, res) => {
  const room = await Room.find({ id: req.body.id });
  if (room.length == 0) {
    return res.status(404).send(JSON.stringify("Room id is not found"));
  }
  await Room.deleteOne({ id: req.body.id });
  return res.status(200).send(JSON.stringify(req.body.id + " is deleted"));
});

// room
app.get("/room/:id", async (req, res) => {
  const room = await Room.find({ id: req.params.id });
  if (room.length == 0) {
    return res.status(404).send(JSON.stringify("Room does not exist"));
  }
  return res.status(200).send(JSON.stringify(room[0].user_id));
});

app.post("/room/:id", async (req, res) => {
  const room_id = req.params.id;
  const username = req.body.user;
  const room = await Room.find({ id: req.params.id });
  if (room.length != 0) {
    if (room[0].user_id.indexOf(req.body.user) != -1) {
      return res.status(200).send(JSON.stringify({}));
    }
    await Room.update(
      { id: req.params.id },
      { user_id: [...room[0].user_id, req.body.user] }
    );
    return res.status(201).send(JSON.stringify({}));
  }
});

app.put("/room/:id", async (req, res) => {
  const room_id = req.params.id;
  const username = req.body.user;
  const room = await Room.find({ id: req.params.id });
  if (room.length != 0) {
    if (room[0].user_id.indexOf(req.body.user) != -1) {
      return res.status(200).send(JSON.stringify({}));
    }
    await Room.update(
      { id: req.params.id },
      { user_id: [...room[0].user_id, req.body.user] }
    );
    return res.status(201).send(JSON.stringify({}));
  }
});

app.delete("/room/:id", async (req, res) => {
  const room_id = req.params.id;
  const username = req.body.user;
  const room = await Room.find({ id: req.params.id });
  if (room.length != 0) {
    if (room[0].user_id.indexOf(req.body.user) != -1) {
      await Room.update(
        { id: req.params.id },
        { user_id: room[0].user_id.filter(user => user !== username) }
      );
      return res
        .status(200)
        .send(JSON.stringify(`${username} leaves the room`));
    }
    await Room.update(
      { id: req.params.id },
      { user_id: [...room[0].user_id, req.body.user] }
    );
    return res.status(404).send(JSON.stringify(`User id is not found`));
  }
  return res.status(404).send(JSON.stringify(`User id is not found`));
});

// user
app.get("/users", async (req, res) => {
  const users_temp = {};
  const room = await Room.find({});
  for (let key of Object.keys(room)) {
    for (let user of room[key].user_id) {
      users_temp[user] = "";
    }
  }
  return res.status(200).send(JSON.stringify(Object.keys(users_temp)));
});
module.exports = app;
