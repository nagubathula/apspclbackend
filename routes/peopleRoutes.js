// backend/routes/peopleRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { People } = require("../models");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(
      __dirname,
      "..",
      "..",
      "apspcl",
      "public",
      "peopleData"
    );
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Route to handle file uploads
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, designation } = req.body;
    const filepath = `peopleData/${req.file.filename}`;

    const person = new People({
      name,
      designation,
      filepath,
    });

    await person.save();

    res.status(201).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get all people
router.get("/", async (req, res) => {
  try {
    const people = await People.find({});
    res.status(200).json(people);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
