const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Gallery = require("../models/Gallery");

const router = express.Router();

// Multer Storage Config
const storage = multer.diskStorage({
  destination: "uploads/images/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// 📌 CREATE: Upload images & save metadata
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    const { title } = req.body;
    const imagePaths = req.files.map((file) => file.path.replace(/\\/g, "/"));

    const gallery = new Gallery({ title, images: imagePaths });
    await gallery.save();

    res.status(201).json({ message: "Gallery created", gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 READ: Get all galleries
router.get("/", async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 UPDATE: Edit title & add new images
router.put("/:id", upload.array("images", 10), async (req, res) => {
  try {
    const { title } = req.body;
    const newImages = req.files.map((file) => file.path.replace(/\\/g, "/"));

    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ error: "Gallery not found" });

    gallery.title = title || gallery.title;
    gallery.images = [...gallery.images, ...newImages]; // Append new images
    await gallery.save();

    res.json({ message: "Gallery updated", gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 DELETE IMAGE: Remove a specific image
router.put("/:id/remove-image", async (req, res) => {
  try {
    const { image } = req.body;
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) return res.status(404).json({ error: "Gallery not found" });

    gallery.images = gallery.images.filter((img) => img !== image);
    await gallery.save();

    res.json({ message: "Image removed", gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 DELETE: Remove entire gallery
router.delete("/:id", async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ error: "Gallery not found" });

    await gallery.deleteOne();
    res.json({ message: "Gallery deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
