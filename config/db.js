const mongoose = require("mongoose");

const connection = mongoose.connect(
  `mongodb+srv://mandar:mandar@cluster0.le1hx.mongodb.net/socialmedia?retryWrites=true&w=majority`
);

module.exports = connection;
