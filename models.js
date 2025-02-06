// models.js
const mongoose = require("mongoose");


const tenderSchema = new mongoose.Schema({
  slNo: { type: Number, required: true },
  officeOf: { type: String, required: true },
  tenderNotification: { type: String, required: true },
  description: { type: String, required: true },
  corrigendum: { type: String, default: 'N/A' },
  closingDate: { type: Date, required: true },
  link: { type: String, required: true }
});

const Tender = mongoose.model("Tender", tenderSchema);

// Define the People schema and model
const peopleSchema = new mongoose.Schema({
  name: String,
  designation: String,
  filepath: String,
});

const People = mongoose.model("People", peopleSchema);

module.exports = { People,  Tender };
