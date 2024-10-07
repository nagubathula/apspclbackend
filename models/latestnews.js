const mongoose = require('mongoose');

const latestNewsSchema = new mongoose.Schema({
  createdDate: {
    type: Date,
    default: Date.now,
    required: true
  },
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
});

const LatestNews = mongoose.model('LatestNews', latestNewsSchema);

module.exports = LatestNews;
