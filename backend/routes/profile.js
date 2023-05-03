const passport = require("../middleware/passport");

const express = require("express");
const router = express.Router();

router.get("/", passport, (req, res) => {
  res.json("Profile!");
});

module.exports = router;
