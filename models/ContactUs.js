const mongoose = require('mongoose');

const officialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true }
});

const contactUsSchema = new mongoose.Schema({
  officeName: { type: String, required: true },
  address: { type: String, required: true },
  mapUrl: { type: String },
  officials: [officialSchema]
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;
