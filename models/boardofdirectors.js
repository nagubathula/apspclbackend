const mongoose = require("mongoose");

const BoardOfDirectorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Path to the uploaded image
    required: true,
  },
});

module.exports = mongoose.model("BoardOfDirectors", BoardOfDirectorsSchema);
