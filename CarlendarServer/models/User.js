const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: "ObjectId",
  name: "String",
  email: "String",
  password: "String",
  created_at: "Date",
  updated_at: "Date",
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
