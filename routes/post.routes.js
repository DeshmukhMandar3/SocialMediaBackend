const express = require("express");
const postModel = require("../models/post.model");
const authorize = require("../middleware/authorization");

const postRouter = express.Router();

postRouter.post("/add", authorize, async (req, res, next) => {
  try {
    let post = new postModel(req.body);
    await post.save();
    res.status(201).send("Post added to database");
  } catch (err) {
    res.status(500).send(err);
  }
});

postRouter.patch("/update/:id", authorize, async (req, res, next) => {
  let details = req.body;
  let { id } = req.params;
  try {
    await postModel.findByIdAndUpdate(id, details);
    res.status(200).send("Post updated successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

postRouter.get("/", authorize, async (req, res, next) => {
  try {
    let posts = await postModel.find().populate("likes").populate("user");
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

postRouter.get("/get/:id", authorize, async (req, res, next) => {
  let { id } = req.params;

  try {
    let post = await postModel.findById(id).populate("user").populate("likes");
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

postRouter.delete("/delete/:id", async (req, res, next) => {
  let { id } = req.params;
  try {
    await postModel.findByIdAndDelete(id);
    res.status(202).send("Post Deleted Successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = postRouter;
