const mongoose = require('mongoose');

const AwardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  organization: {
    type: String, // Issuing organization
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String, // Brief details about the award
  },
  filePath: {
    type: String, // Path to the award certificate or related file
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Award', AwardSchema);
