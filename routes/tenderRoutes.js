const express = require("express");
const router = express.Router();
const upload = require("../multerConfig");
const { Tender } = require("../models");

// Route to handle file uploads
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { slNo, officeOf, tenderNotification, description, corrigendum, closingDate } = req.body;
    const filepath = `uploads/tenders/${req.file.filename}`;

    const tender = new Tender({
      slNo,
      officeOf,
      tenderNotification,
      description,
      corrigendum: corrigendum || 'N/A', // Default to 'N/A' if not provided
      closingDate: new Date(closingDate), // Ensure closingDate is a Date object
      link: filepath,
    });

    await tender.save();

    res.status(201).json(tender);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get all tenders
router.get("/", async (req, res) => {
  try {
    const tenders = await Tender.find({});
    res.status(200).json(tenders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get a specific tender by ID
router.get("/:id", async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) {
      return res.status(404).json({ message: "Tender not found" });
    }
    res.status(200).json(tender);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to update a tender by ID
router.put("/:id", async (req, res) => {
  try {
    const { slNo, officeOf, tenderNotification, description, corrigendum, closingDate, link } = req.body;
    const updatedTender = await Tender.findByIdAndUpdate(
      req.params.id,
      { 
        slNo, 
        officeOf, 
        tenderNotification, 
        description, 
        corrigendum: corrigendum || 'N/A', // Default to 'N/A' if not provided
        closingDate: new Date(closingDate), // Ensure closingDate is a Date object
        link 
      },
      { new: true, runValidators: true }
    );
    if (!updatedTender) {
      return res.status(404).json({ message: "Tender not found" });
    }
    res.status(200).json(updatedTender);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to delete a tender by ID
router.delete("/:id", async (req, res) => {
  try {
    const tender = await Tender.findByIdAndDelete(req.params.id);
    if (!tender) {
      return res.status(404).json({ message: "Tender not found" });
    }
    res.status(200).json({ message: "Tender deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
