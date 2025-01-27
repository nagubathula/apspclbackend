const mongoose = require("mongoose");

// Downloads Schema
const ananthapuramudownloadsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  path: { type: String, required: true },
});

// Information Schema
const ananthapuramuinformationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  path: { type: String, required: true },
});

// Land Details Schema
const ananthapuramulanddetailsSchema = new mongoose.Schema({
  villagename: { type: String, required: true, trim: true },
  govtland: { type: Number, required: true, default: 0 },
  assignedland: { type: Number, required: true, default: 0 },
  pattaland: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
});

// Models
const AnanthapuramuDownloads = mongoose.model(
  "AnanthapuramuDownloads",
  ananthapuramudownloadsSchema
);
const AnanthapuramuInformation = mongoose.model(
  "AnanthapuramuInformation",
  ananthapuramuinformationSchema
);
const AnanthapuramuLandDetails = mongoose.model(
  "AnanthapuramuLandDetails",
  ananthapuramulanddetailsSchema
);

module.exports = { AnanthapuramuDownloads, AnanthapuramuInformation, AnanthapuramuLandDetails };
