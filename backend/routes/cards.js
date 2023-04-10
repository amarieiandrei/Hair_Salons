const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// * Get Request Method (read all)
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.json({ message: err });
  }
});

// * Get Request Method by Id (read by id)
router.get("/:cardId", async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    res.json(card);
  } catch (err) {
    res.json({ message: err });
  }
});

// * Post Request Method (create)
router.post("/", async (req, res) => {
  const card = new Card({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedCard = await card.save();
    res.json(savedCard);
  } catch (err) {
    res.json({ message: err });
  }
});

// * Put Request Method (update)
router.put("/:cardId", async (req, res) => {
  try {
    const updatedCard = await Card.updateOne(
      { _id: req.params.cardId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedCard);
  } catch (err) {
    res.json({ message: err });
  }
});

// * Delete Request Method (delete)
router.delete("/:cardId", async (req, res) => {
  try {
    const removedCard = await Card.deleteOne({ _id: req.params.cardId });
    res.json(removedCard);
  } catch (err) {
    res.json({ message: err });
  }
});

// * Delete Request Method (delete all)
router.delete("/", async (req, res) => {
  try {
    const removedAllCards = await Card.deleteMany();
    res.json(removedAllCards);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
