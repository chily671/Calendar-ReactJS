// Code for the server
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/calendar");

// const uuid = require("uuid");
const User = require("./models/User");
const Event = require("./models/Event");

app.use(express.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const event = new Event(req.body);
  console.log(event);
  await event.save();
  res.send(event);
});

app.get("/events", async (req, res) => {
  let day = req.query.day;
  const events = await Event.find();
  res.send(events);
});

app.put("/events", async (req, res) => {
  const event = req.body;
  await Event.updateOne({ event_id: event.event_id }, event);
  res.send(event);
});

app.delete("/events", async (req, res) => {
  const event_id = req.body;
  console.log(event_id);
  await Event.delete;
  res.send("Deleted");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
