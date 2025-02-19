const mongoose = require("mongoose");

const QuickLinkSchema = new mongoose.Schema({
  text: String,
  url: String,
});

module.exports = mongoose.model("QuickLink", QuickLinkSchema);
