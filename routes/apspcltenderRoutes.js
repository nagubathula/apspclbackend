const express = require('express');
const multer = require('multer');
const path = require('path');
const tenderController = require('../controllers/tenderController'); // Adjust the path as necessary

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../apspcl/public/uploads/tenders'); // Folder where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid collisions
    },
});

const upload = multer({ storage });

// Define routes
router.post('/', upload.single('file'), tenderController.createTender); // Create tender
router.get('/', tenderController.getTenders); // Get all tenders
router.get('/:id', tenderController.getTenderById); // Get tender by ID
router.put('/:id', upload.single('file'), tenderController.updateTender); // Update tender by ID
router.delete('/:id', tenderController.deleteTender); // Delete tender by ID

module.exports = router; // Export the router
