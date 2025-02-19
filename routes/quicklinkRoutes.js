const express = require("express");
const QuickLink = require("../models/quicklinks");

const router = express.Router();

// Create a Quick Link
router.post("/", async (req, res) => {
  try {
    const { text, url } = req.body;
    const newQuickLink = new QuickLink({ text, url });
    await newQuickLink.save();
    res.status(201).json(newQuickLink);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read all Quick Links
router.get("/", async (req, res) => {
  try {
    const quickLinks = await QuickLink.find();
    res.json(quickLinks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Quick Link
router.put("/:id", async (req, res) => {
  try {
    const { text, url } = req.body;
    const updatedQuickLink = await QuickLink.findByIdAndUpdate(
      req.params.id,
      { text, url },
      { new: true }
    );
    res.json(updatedQuickLink);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Quick Link
router.delete("/:id", async (req, res) => {
  try {
    await QuickLink.findByIdAndDelete(req.params.id);
    res.json({ message: "Quick Link deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
