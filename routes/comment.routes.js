const express = require("express");
const commentRouter = express.Router();
const authorize = require("../middleware/authorization");
const commentModel = require("../models/comment.model");

commentRouter.post("/add", authorize, async (req, res, next) => {
  let details = req.body;
  try {
    let comment = new commentModel(details);
    await comment.save();
    res.status(201).send("Comment Created Successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

commentRouter.patch("/update/:id", authorize, async (req, res, next) => {
  let { id } = req.params;
  let details = req.body;
  try {
    await commentModel.findByIdAndUpdate(id, details);
    res.status(200).send("comment updated successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

commentRouter.get("/", authorize, async (req, res, next) => {
  try {
    let comments = await commentModel.find().populate("user");
    res.send(comments);
  } catch (err) {
    res.status(500).send(err);
  }
});

commentRouter.delete("/delete/:id", authorize, async (req, res, next) => {
  try {
    await commentModel.findByIdAndDelete(id);
    res.status(202).send("comment deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = commentRouter;
