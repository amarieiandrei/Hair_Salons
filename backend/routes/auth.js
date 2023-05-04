const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/User");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  if (error) {
    return res.json({
      succes: false,
      msg: "User not found",
    });
  }

  let user = await User.findOne({ email: req.body.email });
  // if (!user) return res.status(400).send("Invalid email or password.");
  if (!user) {
    return res.json({
      success: false,
      msg: "User not found",
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  // if (!validPassword) return res.status(400).send("Invalid email or password.");
  if (!validPassword) {
    return res.json({
      succes: false,
      msg: "User not found",
    });
  } else {
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).json({
      success: true,
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    // res.header("x-auth-token", token).send(token);
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(req);
}
module.exports = router;
