const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
