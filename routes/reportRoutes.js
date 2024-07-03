// routes/reportRoutes.js
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

module.exports = router;
