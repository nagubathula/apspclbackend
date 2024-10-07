const express = require('express');
const router = express.Router();
const LatestTenders = require('../models/latesttenders'); // Adjust the path if needed

// Create a new tenders item (POST)
router.post('/tenders', async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const tenders = new LatestTenders({ title, description, link });
    await tenders.save();
    res.status(201).json(tenders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all tenders items (GET)
router.get('/tenders', async (req, res) => {
  try {
    const tenders = await LatestTenders.find();
    res.status(200).json(tenders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single tenders item by ID (GET)
router.get('/tenders/:id', async (req, res) => {
  try {
    const tenders = await LatestTenders.findById(req.params.id);
    if (!tenders) return res.status(404).json({ message: 'Tenders item not found' });
    res.status(200).json(tenders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a tenders item by ID (PUT)
router.put('/tenders/:id', async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const tenders = await LatestTenders.findByIdAndUpdate(req.params.id, { title, description, link }, { new: true });
    if (!tenders) return res.status(404).json({ message: 'Tenders item not found' });
    res.status(200).json(tenders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a tenders item by ID (DELETE)
router.delete('/tenders/:id', async (req, res) => {
  try {
    const tenders = await LatestTenders.findByIdAndDelete(req.params.id);
    if (!tenders) return res.status(404).json({ message: 'Tenders item not found' });
    res.status(200).json({ message: 'Tenders item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
