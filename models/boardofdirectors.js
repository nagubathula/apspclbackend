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
  filepath: {
    type: String, // Path where the image file is stored
    required: true, // Set to true if the filepath is mandatory
  },
});

module.exports = mongoose.model("BoardOfDirectors", BoardOfDirectorsSchema);
