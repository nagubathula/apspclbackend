const Office = require('../models/Office');

// Create a new office
exports.createOffice = async (req, res) => {
  try {
    const newOffice = new Office(req.body);
    const savedOffice = await newOffice.save();
    res.status(201).json(savedOffice);
  } catch (error) {
    res.status(500).json({ message: "Error creating office", error });
  }
};

// Get all offices
exports.getAllOffices = async (req, res) => {
  try {
    const offices = await Office.find();
    res.status(200).json(offices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching offices", error });
  }
};

// Get a specific office by ID
exports.getOfficeById = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);
    if (!office) {
      return res.status(404).json({ message: "Office not found" });
    }
    res.status(200).json(office);
  } catch (error) {
    res.status(500).json({ message: "Error fetching office", error });
  }
};

// Update an office by ID
exports.updateOffice = async (req, res) => {
  try {
    const updatedOffice = await Office.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOffice) {
      return res.status(404).json({ message: "Office not found" });
    }
    res.status(200).json(updatedOffice);
  } catch (error) {
    res.status(500).json({ message: "Error updating office", error });
  }
};

// Delete an office by ID
exports.deleteOffice = async (req, res) => {
  try {
    const deletedOffice = await Office.findByIdAndDelete(req.params.id);
    if (!deletedOffice) {
      return res.status(404).json({ message: "Office not found" });
    }
    res.status(200).json({ message: "Office deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting office", error });
  }
};
