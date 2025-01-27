const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const BoardOfDirectors = require("../models/boardofdirectors");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/directors_images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      "director_" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Multer middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png) are allowed!"));
    }
  },
});

// POST route to add a director
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, position } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const newDirector = new BoardOfDirectors({
      name,
      position,
      image: `/uploads/directors_images/${req.file.filename}`,
    });

    await newDirector.save();
    res.status(201).json({ message: "Director added successfully.", director: newDirector });
  } catch (error) {
    console.error("Error adding director:", error.message);
    res.status(500).json({ message: "Server error." });
  }
});

// GET route to fetch all directors
router.get("/", async (req, res) => {
  try {
    const directors = await BoardOfDirectors.find();
    res.status(200).json(directors);
  } catch (error) {
    console.error("Error fetching directors:", error.message);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
