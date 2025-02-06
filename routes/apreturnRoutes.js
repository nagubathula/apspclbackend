const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Apreturn = require("../models/Apreturn"); // Adjust the path as necessary

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/apreturns",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Create a new apreturn
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, title } = req.body;
    const filePath = req.file ? req.file.path : "";
    const apreturn = new Apreturn({ name, title, filePath });
    await apreturn.save();
    res.status(201).json(apreturn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all apreturns
router.get("/", async (req, res) => {
  try {
    const apreturns = await Apreturn.find();
    res.json(apreturns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single apreturn by ID
router.get("/:id", async (req, res) => {
  try {
    const apreturn = await Apreturn.findById(req.params.id);
    if (!apreturn) return res.status(404).json({ error: "Apreturn not found" });
    res.json(apreturn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a apreturn by ID
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const { name, title } = req.body;
    const filePath = req.file ? req.file.path : undefined;
    const updateData = filePath ? { name, title, filePath } : { name, title };
    const apreturn = await Apreturn.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!apreturn) return res.status(404).json({ error: "Apreturn not found" });
    res.json(apreturn);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a apreturn by ID
router.delete("/:id", async (req, res) => {
  try {
    const apreturn = await Apreturn.findByIdAndDelete(req.params.id);
    if (!apreturn) return res.status(404).json({ error: "Apreturn not found" });
    res.json({ message: "Apreturn deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
