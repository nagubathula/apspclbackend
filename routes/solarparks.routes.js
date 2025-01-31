const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Solarpark = require('../models/solarpark.model'); // Import the Solarpark model

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { solarparkName } = req.body;
    if (!solarparkName) return cb(new Error('SolarparkName is required'), false);

    const uploadPath = `uploads/${solarparkName}`;
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // File type validation (only allowing images and PDFs for now)
    const allowedTypes = /jpg|jpeg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed!'), false);
    }
  }
});

// CREATE - Create a new Solarpark with file upload
router.post('/create', upload.fields([
  { name: 'plotPlan', maxCount: 1 },
  { name: 'internalEvacuation', maxCount: 1 },
  { name: 'externalEvacuation', maxCount: 1 }
]), async (req, res) => {
  try {
    const { solarparkId, solarparkName, infotables } = req.body;

    if (!solarparkId || !solarparkName) {
      return res.status(400).json({ message: 'SolarparkId and SolarparkName are required' });
    }

    const existingSolarpark = await Solarpark.findOne({ solarparkId });
    if (existingSolarpark) {
      return res.status(400).json({ message: 'SolarparkId must be unique!' });
    }

    const newSolarpark = new Solarpark({
      solarparkId,
      solarparkName,
      plotPlan: req.files.plotPlan ? req.files.plotPlan[0].path : null,
      internalEvacuation: req.files.internalEvacuation ? req.files.internalEvacuation[0].path : null,
      externalEvacuation: req.files.externalEvacuation ? req.files.externalEvacuation[0].path : null,
      infotables: infotables ? JSON.parse(infotables) : []
    });

    await newSolarpark.save();
    res.status(201).json({ message: 'Solarpark created successfully!', data: newSolarpark });

  } catch (error) {
    res.status(500).json({ message: 'Error creating Solarpark', error: error.message });
  }
});

// READ - Get all Solarparks
router.get('/', async (req, res) => {
  try {
    const solarparks = await Solarpark.find();
    res.status(200).json(solarparks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching solarparks', error: error.message });
  }
});

// READ - Get a single Solarpark by ID
router.get('/:id', async (req, res) => {
  try {
    const solarpark = await Solarpark.findById(req.params.id);
    if (!solarpark) {
      return res.status(404).json({ message: 'Solarpark not found' });
    }
    res.status(200).json(solarpark);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching solarpark', error: error.message });
  }
});

// UPDATE - Update a Solarpark by ID
router.put('/:id', upload.fields([
  { name: 'plotPlan', maxCount: 1 },
  { name: 'internalEvacuation', maxCount: 1 },
  { name: 'externalEvacuation', maxCount: 1 }
]), async (req, res) => {
  try {
    const { solarparkId, solarparkName, infotables } = req.body;

    // Find the solarpark by ID
    let solarpark = await Solarpark.findById(req.params.id);
    if (!solarpark) {
      return res.status(404).json({ message: 'Solarpark not found' });
    }

    // Update the solarpark fields
    solarpark.solarparkId = solarparkId || solarpark.solarparkId;
    solarpark.solarparkName = solarparkName || solarpark.solarparkName;
    solarpark.plotPlan = req.files.plotPlan ? req.files.plotPlan[0].path : solarpark.plotPlan;
    solarpark.internalEvacuation = req.files.internalEvacuation ? req.files.internalEvacuation[0].path : solarpark.internalEvacuation;
    solarpark.externalEvacuation = req.files.externalEvacuation ? req.files.externalEvacuation[0].path : solarpark.externalEvacuation;
    solarpark.infotables = infotables ? JSON.parse(infotables) : solarpark.infotables;

    // Save the updated solarpark
    await solarpark.save();
    res.status(200).json({ message: 'Solarpark updated successfully!', data: solarpark });

  } catch (error) {
    res.status(500).json({ message: 'Error updating Solarpark', error: error.message });
  }
});

// DELETE - Delete a Solarpark by ID
router.delete('/:id', async (req, res) => {
  try {
    const solarpark = await Solarpark.findByIdAndDelete(req.params.id);
    if (!solarpark) {
      return res.status(404).json({ message: 'Solarpark not found' });
    }
    res.status(200).json({ message: 'Solarpark deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Solarpark', error: error.message });
  }
});

module.exports = router;
