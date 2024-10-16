const mongoose = require('mongoose');

const gooSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number },
  gooNumber: { type: String, required: true },
  gooDate: { type: Date, required: true },
  issuedBy: { type: String, required: true },
  link: { type: String }, // File path
});

const GOO = mongoose.model('GOO', gooSchema);

module.exports = GOO;
