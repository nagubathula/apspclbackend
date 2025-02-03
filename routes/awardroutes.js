const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Award = require('../models/award');

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/awards/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Create folder if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File Filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Only images and PDFs are allowed!'), false);
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// ✅ 1️⃣ Create an Award (POST /awards)
router.post('/add', upload.single('file'), async (req, res) => {
  try {
    const { title, organization, date, description } = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!title || !organization || !date) {
      return res.status(400).json({ message: 'Title, organization, and date are required' });
    }

    const newAward = new Award({
      title,
      organization,
      date,
      description,
      filePath
    });

    await newAward.save();
    res.status(201).json({ message: 'Award added successfully', award: newAward });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ 2️⃣ Read All Awards (GET /awards)
router.get('/', async (req, res) => {
  try {
    const awards = await Award.find();
    res.status(200).json(awards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ 3️⃣ Read Award by ID (GET /awards/:id)
router.get('/:id', async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    if (!award) return res.status(404).json({ message: 'Award not found' });

    res.status(200).json(award);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ 4️⃣ Update an Award (PUT /awards/:id)
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { title, organization, date, description } = req.body;
    const filePath = req.file ? req.file.path : null;

    let award = await Award.findById(req.params.id);
    if (!award) return res.status(404).json({ message: 'Award not found' });

    // If updating file, remove old file
    if (filePath && award.filePath) {
      fs.unlinkSync(award.filePath);
    }

    award.title = title || award.title;
    award.organization = organization || award.organization;
    award.date = date || award.date;
    award.description = description || award.description;
    award.filePath = filePath || award.filePath;

    await award.save();
    res.status(200).json({ message: 'Award updated successfully', award });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ✅ 5️⃣ Delete an Award (DELETE /awards/:id)
router.delete('/:id', async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    if (!award) return res.status(404).json({ message: 'Award not found' });

    // Delete associated file
    if (award.filePath) {
      fs.unlinkSync(award.filePath);
    }

    await Award.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Award deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
