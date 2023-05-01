const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const commentRouter = require("./routes/comment.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.use("/post", postRouter);

app.use("/comment", commentRouter);

app.get("/", (req, res) => {
  res.send("Home Route");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to the database");
  } catch (err) {
    console.log(err);
  }
  console.log("Connected to the Server at port 8080");
});
