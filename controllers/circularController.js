const CIRCULAR = require("../models/circularModel");
const path = require("path");
const fs = require("fs");

// Create a new CIRCULAR
// Create a new CIRCULAR
exports.createCIRCULAR = async (req, res) => {
  try {
    const { title, startYear, endYear, circularNumber, circularDate, issuedBy } =
      req.body;

    // Validate required fields
    if (!title || !startYear || !circularNumber || !circularDate || !issuedBy) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Handle file upload (save path relative to 'apspcl/public/uploads/circulars')
    const filePath = req.file
      ? path.join("/uploads/circulars", req.file.filename)
      : null;

    // Create a new CIRCULAR document
    const newCIRCULAR = new CIRCULAR({
      title,
      startYear,
      circularNumber,
      circularDate,
      issuedBy,
      link: filePath, // Save the file path relative to public folder
    });

    await newCIRCULAR.save(); // Save the CIRCULAR document to MongoDB
    res.status(201).json({ message: "CIRCULAR created successfully", circular: newCIRCULAR });
  } catch (error) {
    console.error("Error during CIRCULAR creation:", error); // Log the full error details
    res
      .status(500)
      .json({ message: "Error creating CIRCULAR", error: error.message });
  }
};

// Read all CIRCULARs
exports.getCIRCULARs = async (req, res) => {
  try {
    const circulars = await CIRCULAR.find(); // Retrieve all CIRCULAR documents from MongoDB
    res.status(200).json(circulars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving CIRCULARs", error });
  }
};

// Read a single CIRCULAR by ID
exports.getCIRCULARById = async (req, res) => {
  const { id } = req.params;

  try {
    const circular = await CIRCULAR.findById(id); // Retrieve CIRCULAR by ID
    if (!circular) {
      return res.status(404).json({ message: "CIRCULAR not found" });
    }
    res.status(200).json(circular);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving CIRCULAR", error });
  }
};

// Update a CIRCULAR by ID
exports.updateCIRCULAR = async (req, res) => {
  const { id } = req.params;
  const {
    serialNumber,
    title,
    startYear,
    endYear,
    circularNumber,
    circularDate,
    issuedBy,
  } = req.body;

  try {
    let updatedCIRCULAR = await CIRCULAR.findById(id);
    if (!updatedCIRCULAR) {
      return res.status(404).json({ message: "CIRCULAR not found" });
    }

    // Update fields with new values or retain old ones if not provided
    updatedCIRCULAR.serialNumber = serialNumber || updatedCIRCULAR.serialNumber;
    updatedCIRCULAR.title = title || updatedCIRCULAR.title;
    updatedCIRCULAR.startYear = startYear || updatedCIRCULAR.startYear;
    updatedCIRCULAR.endYear = endYear || updatedCIRCULAR.endYear;
    updatedCIRCULAR.circularNumber = circularNumber || updatedCIRCULAR.circularNumber;
    updatedCIRCULAR.circularDate = circularDate || updatedCIRCULAR.circularDate;
    updatedCIRCULAR.issuedBy = issuedBy || updatedCIRCULAR.issuedBy;

    // Update file if a new one is uploaded
    if (req.file) {
      // Remove the old file if it exists
      if (updatedCIRCULAR.link) {
        const oldFilePath = path.join(__dirname, "..", updatedCIRCULAR.link);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Delete old file
        }
      }
      updatedCIRCULAR.link = path.join("/uploads/circulars", req.file.filename); // Set new file path
    }

    await updatedCIRCULAR.save(); // Save the updated document to MongoDB
    res
      .status(200)
      .json({ message: "CIRCULAR updated successfully", circular: updatedCIRCULAR });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating CIRCULAR", error });
  }
};

// Delete a CIRCULAR by ID
exports.deleteCIRCULAR = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCIRCULAR = await CIRCULAR.findByIdAndDelete(id); // Delete CIRCULAR by ID
    if (!deletedCIRCULAR) {
      return res.status(404).json({ message: "CIRCULAR not found" });
    }

    // Remove the file associated with the CIRCULAR if it exists
    if (deletedCIRCULAR.link) {
      const filePath = path.join(__dirname, "..", deletedCIRCULAR.link);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete file
      }
    }

    res.status(200).json({ message: "CIRCULAR deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting CIRCULAR", error });
  }
};
