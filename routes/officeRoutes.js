// routes/officeRoutes.js

const express = require('express');
const officeController = require('../controllers/officeController');

const router = express.Router();

// CRUD routes
router.post('/', officeController.createOffice);
router.get('/', officeController.getAllOffices);
router.get('/:id', officeController.getOfficeById);
router.put('/:id', officeController.updateOffice);
router.delete('/:id', officeController.deleteOffice);

module.exports = router;
