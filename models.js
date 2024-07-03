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

// Define the People schema and model
const peopleSchema = new mongoose.Schema({
  name: String,
  designation: String,
  filepath: String,
});

const People = mongoose.model("People", peopleSchema);

module.exports = { Report, People };
