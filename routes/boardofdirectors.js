const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const BoardOfDirectors = require("../models/boardofdirectors");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir;

    if (file.fieldname === "image") {
      uploadDir = path.join(__dirname, "../uploads/directors_images");
    } else if (file.fieldname === "file") {
      uploadDir = path.join(__dirname, "../uploads/directors_files");
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

// Multer middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "image") {
      // Validate image file types
      const fileTypes = /jpeg|jpg|png/;
      const extName = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimeType = fileTypes.test(file.mimetype);

      if (extName && mimeType) {
        cb(null, true);
      } else {
        cb(new Error("Only image files (jpeg, jpg, png) are allowed for image!"));
      }
    } else if (file.fieldname === "file") {
      // Validate document file types
      const fileTypes = /pdf|doc|docx/;
      const extName = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimeType = fileTypes.test(file.mimetype);

      if (extName && mimeType) {
        cb(null, true);
      } else {
        cb(
          new Error("Only document files (pdf, doc, docx) are allowed for file!")
        );
      }
    }
  },
});

// CREATE: Add a new director
router.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, position } = req.body;

      // Validate form data
      if (!name || !position || !req.files || !req.files.image || !req.files.file) {
        return res.status(400).json({
          message: "Name, position, image, and file are all required.",
        });
      }

      // Create a new BoardOfDirectors entry
      const newDirector = new BoardOfDirectors({
        name,
        position,
        image: `/uploads/directors_images/${req.files.image[0].filename}`,
        filepath: `/uploads/directors_files/${req.files.file[0].filename}`,
      });

      // Save the director to the database
      await newDirector.save();

      res.status(201).json({
        message: "Director added successfully.",
        director: newDirector,
      });
    } catch (error) {
      console.error("Error adding director:", error.message);
      res.status(500).json({ message: "Server error." });
    }
  }
);

// READ: Fetch all directors
router.get("/", async (req, res) => {
  try {
    const directors = await BoardOfDirectors.find();
    res.status(200).json(directors);
  } catch (error) {
    console.error("Error fetching directors:", error.message);
    res.status(500).json({ message: "Server error." });
  }
});

// UPDATE: Update an existing director
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, position } = req.body;

      const director = await BoardOfDirectors.findById(id);
      if (!director) {
        return res.status(404).json({ message: "Director not found." });
      }

      // Update fields
      director.name = name || director.name;
      director.position = position || director.position;

      if (req.files && req.files.image) {
        // Remove old image
        if (director.image) {
          fs.unlinkSync(path.join(__dirname, "..", director.image));
        }
        director.image = `/uploads/directors_images/${req.files.image[0].filename}`;
      }

      if (req.files && req.files.file) {
        // Remove old file
        if (director.filepath) {
          fs.unlinkSync(path.join(__dirname, "..", director.filepath));
        }
        director.filepath = `/uploads/directors_files/${req.files.file[0].filename}`;
      }

      await director.save();

      res.status(200).json({
        message: "Director updated successfully.",
        director,
      });
    } catch (error) {
      console.error("Error updating director:", error.message);
      res.status(500).json({ message: "Server error." });
    }
  }
);


// Function to delete a file
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  } else {
    console.error(`File not found: ${filePath}`);
  }
};

// Inside DELETE route
router.delete("/:id", async (req, res) => {
  try {
    const director = await BoardOfDirectors.findById(req.params.id);

    if (!director) {
      return res.status(404).json({ message: "Director not found." });
    }

    // Delete associated files
    deleteFile(path.join(__dirname, `../${director.image}`));
    deleteFile(path.join(__dirname, `../${director.filepath}`));

    // Delete the director document from the database
    await BoardOfDirectors.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Director deleted successfully." });
  } catch (error) {
    console.error("Error deleting director:", error.message);
    res.status(500).json({ message: "Server error." });
  }
});


module.exports = router;
