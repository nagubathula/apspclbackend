const express = require("express");
const multer = require("multer");
const path = require("path");
const circularController = require("../controllers/circularController");

const router = express.Router();

// Set up Multer for file uploads, storing in apspcl/public/uploads/circulars
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the path relative to backend (apspclbackend) for apspcl/public/uploads/circulars
    const uploadPath = path.join(__dirname, "..", "..", "apspcl", "public", "uploads", "circulars");
    cb(null, uploadPath); // Store files in apspcl/public/uploads/circulars
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`; // Unique name to avoid file conflicts
    cb(null, uniqueName);
  },
});

// Initialize Multer upload middleware
const upload = multer({ storage });

// Define routes
router.post("/", upload.single("file"), circularController.createCIRCULAR); // Create CIRCULAR with file upload
router.get("/", circularController.getCIRCULARs); // Get all CIRCULARs
router.get("/:id", circularController.getCIRCULARById); // Get CIRCULAR by ID
router.put("/:id", upload.single("file"), circularController.updateCIRCULAR); // Update CIRCULAR with file upload
router.delete("/:id", circularController.deleteCIRCULAR); // Delete CIRCULAR by ID

module.exports = router;
