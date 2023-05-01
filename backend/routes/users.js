const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/User");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) console.log("User with Email Exist");
  if (user) return res.status(400).send("User already registered.");

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

module.exports = router;
