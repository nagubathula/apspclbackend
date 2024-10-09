const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

const Download = mongoose.model('Download', downloadSchema);

module.exports = Download;
