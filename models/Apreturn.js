const mongoose = require("mongoose");

const apreturnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Apreturn", apreturnSchema);
