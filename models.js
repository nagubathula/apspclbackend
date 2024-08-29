// models.js
const mongoose = require("mongoose");

// Define the Report schema and model
const reportSchema = new mongoose.Schema({
  type: String,
  reportname: String,
  title: String,
  filepath: String,
});

const Report = mongoose.model("Report", reportSchema);

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

module.exports = { Report, People,  Tender };
