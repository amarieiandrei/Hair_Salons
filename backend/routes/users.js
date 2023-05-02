const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/User");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// * Get request method ( read )
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: err });
  }
});

// * Get request method by id ( read by id )
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

// * Post request method ( create )
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.json({
      success: false,
      msg: "User already registered.",
    });

  if (req.body.password.localeCompare(req.body.confirmPassword) !== 0)
    return res.status(400).send("Password doesn't match.");

  user = new User(
    _.pick(req.body, ["name", "email", "password", "confirmPassword"])
  );

  // * Hash Password and confirmPassword
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.confirmPassword = await bcrypt.hash(user.password, salt);

  // * Save in MongoDB
  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

// * Put request method ( update )
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
        },
      }
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

// * Delete request method ( delete )
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.json(removedUser);
  } catch (error) {
    return res.json({ message: error });
  }
});

// * Delete request method ( detele all )
router.delete("/", async (req, res) => {
  try {
    const removedAllUsers = await User.deleteMany();
    res.json(removedAllUsers);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
