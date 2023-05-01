const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  image: { type: String, required: true },
  title: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
