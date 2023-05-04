const _ = require("lodash");

const { User } = require("../models/User");
const passport = require("../middleware/passport");
const express = require("express");
const router = express.Router();

router.get("/", passport, async (req, res) => {
  const decoded_payload = req.decoded_payload;
  // console.log(decoded_payload._id);

  const user = await User.findById(decoded_payload._id);

  return res.json({ user });
});

module.exports = router;
