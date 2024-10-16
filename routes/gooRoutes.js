const express = require("express");
const multer = require("multer");
const path = require("path");
const gooController = require("../controllers/gooController");

const router = express.Router();

// Set up Multer for file uploads, storing in apspcl/public/uploads/goos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the path relative to backend (apspclbackend) for apspcl/public/uploads/goos
    const uploadPath = path.join(__dirname, "..", "..", "apspcl", "public", "uploads", "goos");
    cb(null, uploadPath); // Store files in apspcl/public/uploads/goos
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`; // Unique name to avoid file conflicts
    cb(null, uniqueName);
  },
});

// Initialize Multer upload middleware
const upload = multer({ storage });

// Define routes
router.post("/", upload.single("file"), gooController.createGOO); // Create GOO with file upload
router.get("/", gooController.getGOOs); // Get all GOOs
router.get("/:id", gooController.getGOOById); // Get GOO by ID
router.put("/:id", upload.single("file"), gooController.updateGOO); // Update GOO with file upload
router.delete("/:id", gooController.deleteGOO); // Delete GOO by ID

module.exports = router;
