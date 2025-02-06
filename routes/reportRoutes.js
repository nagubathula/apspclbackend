const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Report = require("../models/Report"); // Adjust the path as necessary

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/reports",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Create a new report
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, title } = req.body;
    const filePath = req.file ? req.file.path : "";
    const report = new Report({ name, title, filePath });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single report by ID
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a report by ID
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const { name, title } = req.body;
    const filePath = req.file ? req.file.path : undefined;
    const updateData = filePath ? { name, title, filePath } : { name, title };
    const report = await Report.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a report by ID
router.delete("/:id", async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
