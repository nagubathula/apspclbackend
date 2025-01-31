const mongoose = require('mongoose');

const InfoTableSchema = new mongoose.Schema({
  infotableTitle: { type: String, required: true },
  infotableDescription: { type: String },
  infotable: { type: mongoose.Schema.Types.Mixed } // Can store different formats (JSON, array, etc.)
});

const SolarparkSchema = new mongoose.Schema({
  solarparkId: {
    type: String,
    required: true,
    unique: true, // Ensures only one document for each solarparkId
    enum: ['npkunta', 'gaaliveedu', 'anathapuramu', 'kurnool', 'kadapa'],
  },
  solarparkName: { 
    type: String, 
    required: true, 
    unique: true
  },
  plotPlan: { type: String }, // File path
  internalEvacuation: { type: String }, // File path
  externalEvacuation: { type: String }, // File path
  infotables: [InfoTableSchema] // Array of infotable objects
});

module.exports = mongoose.model('Solarpark', SolarparkSchema);
