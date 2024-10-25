const mongoose = require("mongoose");

const LabelSchema = new mongoose.Schema({
  label_id: "ObjectId",
  name: "String",
  color: "String", // e.g., '#FF0000' for red
  user_id: "ObjectId (references User)",
});

const LabelModel = mongoose.model("Label", LabelSchema);

module.exports = LabelModel;
