const express = require("express");
const router = express.Router();
const upload = require("../multerConfig");
const { Report } = require("../models");

// Route to handle file uploads
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { type, reportname, title } = req.body;
    const filepath = `uploads/reportsandreturns/${req.file.filename}`;

    const report = new Report({
      type,
      reportname,
      title,
      filepath,
    });

    await report.save();

    res.status(201).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get a specific report by ID
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to update a report by ID
// Route to update a report by ID
router.put("/:id", async (req, res) => {
  try {
    const { type, reportname, title, filepath } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { type, reportname, title, filepath },
      { new: true, runValidators: true }
    );
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// Route to delete a report by ID
router.delete("/:id", async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
