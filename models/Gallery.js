const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: { type: [String], required: true } // Array of image file paths
});

module.exports = mongoose.model('Gallery', GallerySchema);
