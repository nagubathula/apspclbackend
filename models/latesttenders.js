const mongoose = require('mongoose');

const latestTendersSchema = new mongoose.Schema({
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

const LatestTenders = mongoose.model('LatestTenders', latestTendersSchema);

module.exports = LatestTenders;
