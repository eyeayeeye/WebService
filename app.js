const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var rooms = {};

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

module.exports = app;
