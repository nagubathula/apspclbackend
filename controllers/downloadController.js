const Download = require('../models/downloads'); // Adjust the path as necessary
const fs = require('fs');
const path = require('path');

// Create a new download
exports.createDownload = async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileLink = req.file ? `/uploads/downloads/${req.file.filename}` : null;

    const newDownload = new Download({
      title,
      description,
      link: fileLink
    });

    await newDownload.save();
    res.status(201).json(newDownload);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create download' });
  }
};

// Get all downloads
exports.getDownloads = async (req, res) => {
  try {
    const downloads = await Download.find();
    res.status(200).json(downloads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve downloads' });
  }
};

// Get download by ID
exports.getDownloadById = async (req, res) => {
  try {
    const download = await Download.findById(req.params.id);
    if (!download) {
      return res.status(404).json({ error: 'Download not found' });
    }
    res.status(200).json(download);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve download' });
  }
};

// Update download by ID
exports.updateDownload = async (req, res) => {
  try {
    const { title, description } = req.body;
    let updatedFields = { title, description };

    if (req.file) {
      const download = await Download.findById(req.params.id);
      if (download && download.link) {
        const filePath = path.join(__dirname, '..', 'public', download.link);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete old file
        }
      }
      updatedFields.link = `/uploads/downloads/${req.file.filename}`;
    }

    const updatedDownload = await Download.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!updatedDownload) {
      return res.status(404).json({ error: 'Download not found' });
    }

    res.status(200).json(updatedDownload);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update download' });
  }
};

// Delete download by ID
exports.deleteDownload = async (req, res) => {
  try {
    const download = await Download.findById(req.params.id);
    if (!download) {
      return res.status(404).json({ error: 'Download not found' });
    }

    if (download.link) {
      const filePath = path.join(__dirname, '..', 'public', download.link);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete file from storage
      }
    }

    await Download.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Download deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete download' });
  }
};
