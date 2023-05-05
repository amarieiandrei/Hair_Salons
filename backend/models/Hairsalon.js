const mongoose = require("mongoose");

const HairsalonSchema = mongoose.Schema({
  slides: [{ url: String, title: String }],
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  details: {
    isDetails: { type: Boolean },
    text: { type: String },
  },
  program: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  },
});

module.exports = mongoose.model("Hairsalon", HairsalonSchema);
