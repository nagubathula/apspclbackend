const express = require("express");
const router = express.Router();
const {
  AnanthapuramuLandDetails,
} = require("../../../models/ananthapuramuSchema");
const path = require("path");
const fs = require("fs").promises;
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const uploadPath = path.join(__dirname, "../uploads/ananthapuramu");
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(new Error("Failed to create upload directory"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, JPEG, and PNG are allowed."));
    }
  },
});

// File Upload Controller
const uploadFile = async (req, res) => {
  try {
    const { villagename, govtland, assignedland, pattaland, total } = req.body;

    if (!villagename || !govtland || !assignedland || !pattaland || !total) {
      return res
        .status(400)
        .json({
          error:
            "All fields (villagename, govtland, assignedland, pattaland, total) are required.",
        });
    }

    const relativePath = req.file
      ? `uploads/ananthapuramu/${req.file.filename}`
      : "";

    const landdetail = new AnanthapuramuLandDetails({
      villagename,
      govtland,
      assignedland,
      pattaland,
      total,
      path: relativePath,
    });

    await landdetail.save();
    res.status(201).json(landdetail);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to upload file", details: error.message });
  }
};

// Get All LandDetails
const getLandDetails = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Added pagination
    const landdetails = await AnanthapuramuLandDetails.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(landdetails);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch land details", details: error.message });
  }
};

// Delete Download by ID
const deleteDownload = async (req, res) => {
  try {
    const { id } = req.params;
    const landdetail = await AnanthapuramuLandDetails.findByIdAndDelete(id);

    if (!landdetail) {
      return res.status(404).json({ error: "Download not found." });
    }

    const filePath = path.join(__dirname, "..", landdetail.path);
    try {
      await fs.unlink(filePath);
      console.log("File deleted successfully");
    } catch {
      console.log("File not found, skipping deletion");
    }

    res.status(200).json({ message: "Download deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete download", details: error.message });
  }
};

// Update Download (PUT)
const updateDownload = async (req, res) => {
  try {
    const { id } = req.params;
    const { villagename, govtland, assignedland, pattaland, total } = req.body;

    const landdetail = await AnanthapuramuLandDetails.findById(id);
    if (!landdetail) {
      return res.status(404).json({ error: "Download not found." });
    }

    if (req.file) {
      const oldFilePath = path.join(__dirname, "..", landdetail.path);
      try {
        await fs.unlink(oldFilePath);
        console.log("Old file deleted successfully");
      } catch {
        console.log("Old file not found, skipping deletion");
      }
      landdetail.path = `uploads/ananthapuramu/${req.file.filename}`;
    }

    landdetail.villagename = villagename || landdetail.villagename;
    landdetail.govtland = govtland || landdetail.govtland;
    landdetail.assignedland = assignedland || landdetail.assignedland;
    landdetail.pattaland = pattaland || landdetail.pattaland;
    landdetail.total = total || landdetail.total;

    await landdetail.save();
    res.status(200).json(landdetail);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update land detail", details: error.message });
  }
};

// API Routes
router.post(
  "/ananthapuramulanddetails/upload",
  upload.single("file"),
  uploadFile
);
router.get("/ananthapuramulanddetails/landdetails", getLandDetails);
router.delete("/ananthapuramulanddetails/landdetails/:id", deleteDownload);
router.put(
  "/ananthapuramulanddetails/landdetails/:id",
  upload.single("file"),
  updateDownload
);

module.exports = router;
