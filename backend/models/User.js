const config = require("config");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

const complexityOptions = {
  min: 6,
  max: 1024,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().max(255).required().email(),
    password: passwordComplexity(complexityOptions).required(),
    confirmPassword: passwordComplexity(complexityOptions).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
