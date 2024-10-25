const mongoose = require("mongoose");

const EventLabelSchema = new mongoose.Schema({
  event_id: "ObjectId (references Event)",
  label_id: "ObjectId (references Label)",
});

const EventLabelModel = mongoose.model("EventLabel", EventLabelSchema);

module.exports = EventLabelModel;
