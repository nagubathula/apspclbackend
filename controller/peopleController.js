const PeopleData = require("../models/peopleData");

// Controller to handle file upload and data insertion
exports.createPerson = async (req, res) => {
  try {
    const { name, designation } = req.body;
    const imagePath = `/peopleData/${req.file.filename}`;

    const newPerson = new PeopleData({
      name,
      designation,
      imagePath,
    });

    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
