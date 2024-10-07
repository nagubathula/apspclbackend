const express = require('express');
const router = express.Router();
const LatestNews = require('../models/latestnews'); // Adjust the path if needed

// Create a new news item (POST)
router.post('/news', async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const news = new LatestNews({ title, description, link });
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all news items (GET)
router.get('/news', async (req, res) => {
  try {
    const news = await LatestNews.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single news item by ID (GET)
router.get('/news/:id', async (req, res) => {
  try {
    const news = await LatestNews.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News item not found' });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a news item by ID (PUT)
router.put('/news/:id', async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const news = await LatestNews.findByIdAndUpdate(req.params.id, { title, description, link }, { new: true });
    if (!news) return res.status(404).json({ message: 'News item not found' });
    res.status(200).json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a news item by ID (DELETE)
router.delete('/news/:id', async (req, res) => {
  try {
    const news = await LatestNews.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: 'News item not found' });
    res.status(200).json({ message: 'News item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
