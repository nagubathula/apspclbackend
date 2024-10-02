const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const contactSchema = new mongoose.Schema({
  name: String,
  designation: String,
  phone: String,
  email: String,
});

const officeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  addresses: [addressSchema],
  mapUrl: String,
  contacts: [contactSchema],
});

// Create the model from the schema
const Office = mongoose.model("Office", officeSchema);

module.exports = Office;
