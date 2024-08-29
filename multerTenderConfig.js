// multerTendersConfig.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure storage for tenders
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(
      __dirname,
      "..",
      "..",
      "apspcl",
      "public",
      "uploads",
      "tenders"
    );
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const uploadTenders = multer({ storage });

module.exports = uploadTenders;
