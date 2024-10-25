const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  reminder_id: "ObjectId",
  event_id: "ObjectId (references Event)",
  reminder_time: "Date",
  method: "String", // 'email', 'notification', 'sms'
  is_sent: "Boolean",
  created_at: "Date",
});

const ReminderModel = mongoose.model("Reminder", ReminderSchema);

module.exports = ReminderModel;
