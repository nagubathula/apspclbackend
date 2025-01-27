const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "No description",
  },
});

module.exports = mongoose.model("Image", imageSchema);
