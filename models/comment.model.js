const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  text: { type: String, required: true },
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
