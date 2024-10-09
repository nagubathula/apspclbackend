const express = require('express');
const multer = require('multer');
const path = require('path');
const downloadController = require('../controllers/downloadController'); // Adjust the path as necessary

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../apspcl/public/uploads/downloads'); // Folder where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid collisions
    },
});

const upload = multer({ storage });

// Define routes
router.post('/', upload.single('file'), downloadController.createDownload); // Create download
router.get('/', downloadController.getDownloads); // Get all downloads
router.get('/:id', downloadController.getDownloadById); // Get download by ID
router.put('/:id', upload.single('file'), downloadController.updateDownload); // Update download by ID
router.delete('/:id', downloadController.deleteDownload); // Delete download by ID

module.exports = router; // Export the router
