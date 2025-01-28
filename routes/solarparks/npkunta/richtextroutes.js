const express = require("express");
const { NpkuntaRichText } = require("../../../models/npkuntaSchema"); // Import the model
const router = express.Router();

// Create or update a single rich text content (one paragraph)
router.post("/createOrUpdate", async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check if there's already an existing rich text content
    let richTextContent = await NpkuntaRichText.findOne();
    if (richTextContent) {
      // If it exists, update it
      richTextContent.title = title;
      richTextContent.content = content;
      richTextContent.updatedAt = Date.now();
      await richTextContent.save();
      return res.status(200).json({ message: "Rich text content updated", data: richTextContent });
    }

    // If it doesn't exist, create a new one
    richTextContent = new NpkuntaRichText({ title, content });
    await richTextContent.save();
    res.status(201).json({ message: "Rich text content created", data: richTextContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating or updating rich text content" });
  }
});

// Get the single rich text content (since there's only one paragraph)
router.get("/", async (req, res) => {
  try {
    const richTextContent = await NpkuntaRichText.findOne();
    if (!richTextContent) {
      return res.status(404).json({ message: "Rich text content not found" });
    }
    res.status(200).json({ data: richTextContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching rich text content" });
  }
});

module.exports = router;
