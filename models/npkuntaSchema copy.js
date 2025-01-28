const mongoose = require("mongoose");

const kurnoolrichtextSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Downloads Schema
const kurnooldownloadsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  path: { type: String, required: true },
});

// Information Schema
const kurnoolinformationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  path: { type: String, required: true },
});

// Land Details Schema
const kurnoollanddetailsSchema = new mongoose.Schema({
  villagename: { type: String, required: true, trim: true },
  govtland: { type: Number, required: true, default: 0 },
  assignedland: { type: Number, required: true, default: 0 },
  pattaland: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
});

// Models
const KurnoolDownloads = mongoose.model(
  "KurnoolDownloads",
  kurnooldownloadsSchema
);
const KurnoolInformation = mongoose.model(
  "KurnoolInformation",
  kurnoolinformationSchema
);
const KurnoolLandDetails = mongoose.model(
  "KurnoolLandDetails",
  kurnoollanddetailsSchema
);

const KurnoolRichText = mongoose.model(
  "KurnoolRichText",
  kurnoolrichtextSchema
);


module.exports = { KurnoolDownloads, KurnoolInformation, KurnoolLandDetails, KurnoolRichText };
