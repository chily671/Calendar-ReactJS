const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  event_id: "ObjectId",
  title: "String",
  description: "String",
  start_time: "Date",
  end_time: "Date",
  day: {
    type: Date,
    required: true,
    set: (date) => {
      const formattedDate = new Date(date);
      // Định dạng ngày thành "yyyy-mm-dd"
      return new Date(
        formattedDate.getFullYear(),
        formattedDate.getMonth(),
        formattedDate.getDate()
      );
    },
  },
  type: "String",
  layout: "String",
  location: "String",
  created_at: "Date",
  updated_at: "Date",
  is_all_day: "Boolean",
  is_recurring: "Boolean",
  recurrence_rule: "String", // e.g., 'daily', 'weekly', 'monthly'
});

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;
