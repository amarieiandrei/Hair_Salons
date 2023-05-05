const express = require("express");
const router = express.Router();
const Hairsalon = require("../models/Hairsalon");

// * Get Request Method (read all)
router.get("/", async (req, res) => {
  try {
    const hairsalons = await Hairsalon.find();
    res.json(hairsalons);
  } catch (err) {
    res.json({ message: err });
  }
});

// * Get Request Method by Id (read by id)
router.get("/:hairsalonId", async (req, res) => {
  try {
    const hairsalon = await Hairsalon.findById(req.params.hairsalonId);
    res.json(hairsalon);
  } catch (err) {
    res.json({ message: err });
  }
});

// * Post Request Method (create)
router.post("/", async (req, res) => {
  const hairsalon = new Hairsalon({
    slides: req.body.slides,
    name: req.body.name,
    rating: req.body.rating,
    reviews: req.body.reviews,
    location: req.body.location,
    details: req.body.details,
    program: req.body.program,
  });

  try {
    const savedHairsalon = await hairsalon.save();

    res.json(savedHairsalon);
  } catch (err) {
    res.json({ message: err });
  }
});

// * Put Request Method (update)
router.put("/:hairsalonId", async (req, res) => {
  try {
    const updatedHairsalon = await Hairsalon.updateOne(
      { _id: req.params.hairsalonId },
      {
        $set: {
          slides: req.body.slides,
          name: req.body.name,
          rating: req.body.rating,
          reviews: req.body.reviews,
          location: req.body.location,
          details: req.body.details,
          program: req.body.program,
        },
      }
    );
    res.json(updatedHairsalon);
  } catch (err) {
    res.json({ message: err });
  }
});

// * Delete Request Method (delete)
router.delete("/:hairsalonId", async (req, res) => {
  try {
    const removedHairsalon = await Hairsalon.deleteOne({
      _id: req.params.hairsalonId,
    });
    res.json(removedHairsalon);
  } catch (err) {
    res.json({ message: err });
  }
});

// * Delete Request Method (delete all)
router.delete("/", async (req, res) => {
  try {
    const removedAllHairsalons = await Hairsalon.deleteMany();
    res.json(removedAllHairsalons);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
