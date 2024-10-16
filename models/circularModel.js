const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number },
  circularNumber: { type: String, required: true },
  circularDate: { type: Date, required: true },
  issuedBy: { type: String, required: true },
  link: { type: String }, // File path
});

const CIRCULAR = mongoose.model('CIRCULAR', circularSchema);

module.exports = CIRCULAR;
