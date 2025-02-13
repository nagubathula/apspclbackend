const express = require('express');
const router = express.Router();
const ContactUs = require('../models/ContactUs');

// **1. Create a New Office Contact**
router.post('/', async (req, res) => {
  try {
    const newContact = new ContactUs(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **2. Get All Office Contacts**
router.get('/', async (req, res) => {
  try {
    const contacts = await ContactUs.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **3. Get a Single Office Contact by ID**
router.get('/:id', async (req, res) => {
  try {
    const contact = await ContactUs.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Office not found' });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// **4. Update an Office Contact**
router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await ContactUs.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedContact) return res.status(404).json({ message: 'Office not found' });
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **5. Delete an Office Contact**
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await ContactUs.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: 'Office not found' });
    res.status(200).json({ message: 'Office deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
