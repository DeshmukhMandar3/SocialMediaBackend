const express = require("express");
const userModel = require("../models/user.model");
const userExists = require("../middleware/userExist");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorization");

const userRouter = express.Router();

userRouter.post("/register", userExists, async (req, res, next) => {
  let details = req.body;

  bcrypt.hash(details.password, 3, async function (err, hash) {
    if (err) {
      res.status(500).send(err);
    } else {
      details.password = hash;
      try {
        let user = new userModel(details);
        await user.save();
        res.status(201).send("User Registered Successfully");
      } catch (err) {
        res.status(500).send(err);
      }
    }
  });
});

userRouter.post("/login", async (req, res, next) => {
  let details = req.body;
  if (!details.password) {
    return res.status(500).send({ error: "Password Missing" });
  }
  try {
    let users = await userModel.find({ email: details.email });
    if (users.length == 0) {
      res.status(401).send({ error: "User does not exist" });
    } else {
      const match = await bcrypt.compare(details.password, users[0].password);
      if (match) {
        let token = jwt.sign({ id: users[0]._id }, "masai");
        res.status(200).send({ token });
      } else {
        res.status(401).send({ error: "Wrong password!" });
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    let users = await userModel.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.delete("/delete/:id", authorize, async (req, res, next) => {
  let { id } = req.params;
  try {
    await userModel.findByIdAndDelete(id);
    res.status(202).send("User deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.patch("/update/:id", authorize, async (req, res, next) => {
  const { id } = req.params;
  const details = req.body;
  try {
    await userModel.findByIdAndUpdate(id, details);
    res.status(200).send("User details updated successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = userRouter;
