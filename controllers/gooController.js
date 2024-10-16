const GOO = require("../models/gooModel");
const path = require("path");
const fs = require("fs");

// Create a new GOO
// Create a new GOO
exports.createGOO = async (req, res) => {
    try {
      const { title, startYear, endYear, gooNumber, gooDate, issuedBy } = req.body;
  
      // Validate required fields
      if (!title || !startYear || !gooNumber || !gooDate || !issuedBy) {
        return res.status(400).json({ message: "Please provide all required fields" });
      }
  
      // Handle file upload (save path relative to 'apspcl/public/uploads/goos')
      const filePath = req.file ? path.join("/uploads/goos", req.file.filename) : null;
  
      // Create a new GOO document
      const newGOO = new GOO({
        title,
        startYear,
        endYear,
        gooNumber,
        gooDate,
        issuedBy,
        link: filePath, // Save the file path relative to public folder
      });
  
      await newGOO.save(); // Save the GOO document to MongoDB
      res.status(201).json({ message: "GOO created successfully", goo: newGOO });
    } catch (error) {
      console.error("Error during GOO creation:", error); // Log the full error details
      res.status(500).json({ message: "Error creating GOO", error: error.message });
    }
  };
  

// Read all GOOs
exports.getGOOs = async (req, res) => {
  try {
    const goos = await GOO.find(); // Retrieve all GOO documents from MongoDB
    res.status(200).json(goos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving GOOs", error });
  }
};

// Read a single GOO by ID
exports.getGOOById = async (req, res) => {
  const { id } = req.params;

  try {
    const goo = await GOO.findById(id); // Retrieve GOO by ID
    if (!goo) {
      return res.status(404).json({ message: "GOO not found" });
    }
    res.status(200).json(goo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving GOO", error });
  }
};

// Update a GOO by ID
exports.updateGOO = async (req, res) => {
  const { id } = req.params;
  const { serialNumber, title, startYear, endYear, gooNumber, gooDate, issuedBy } = req.body;

  try {
    let updatedGOO = await GOO.findById(id);
    if (!updatedGOO) {
      return res.status(404).json({ message: "GOO not found" });
    }

    // Update fields with new values or retain old ones if not provided
    updatedGOO.serialNumber = serialNumber || updatedGOO.serialNumber;
    updatedGOO.title = title || updatedGOO.title;
    updatedGOO.startYear = startYear || updatedGOO.startYear;
    updatedGOO.endYear = endYear || updatedGOO.endYear;
    updatedGOO.gooNumber = gooNumber || updatedGOO.gooNumber;
    updatedGOO.gooDate = gooDate || updatedGOO.gooDate;
    updatedGOO.issuedBy = issuedBy || updatedGOO.issuedBy;

    // Update file if a new one is uploaded
    if (req.file) {
      // Remove the old file if it exists
      if (updatedGOO.link) {
        const oldFilePath = path.join(__dirname, "..", updatedGOO.link);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Delete old file
        }
      }
      updatedGOO.link = path.join("/uploads/goos", req.file.filename); // Set new file path
    }

    await updatedGOO.save(); // Save the updated document to MongoDB
    res.status(200).json({ message: "GOO updated successfully", goo: updatedGOO });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating GOO", error });
  }
};

// Delete a GOO by ID
exports.deleteGOO = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGOO = await GOO.findByIdAndDelete(id); // Delete GOO by ID
    if (!deletedGOO) {
      return res.status(404).json({ message: "GOO not found" });
    }

    // Remove the file associated with the GOO if it exists
    if (deletedGOO.link) {
      const filePath = path.join(__dirname, "..", deletedGOO.link);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete file
      }
    }

    res.status(200).json({ message: "GOO deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting GOO", error });
  }
};
