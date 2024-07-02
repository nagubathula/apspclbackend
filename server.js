const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reportsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Report schema and model
const reportSchema = new mongoose.Schema({
  type: String,
  reportname: String,
  title: String,
  filepath: String,
});

const Report = mongoose.model('Report', reportSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'apspcl', 'public', 'uploads', 'reportsandreturns');
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

const upload = multer({ storage });

// Route to handle file uploads
app.post('/api/reports', upload.single('file'), async (req, res) => {
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
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get all reports
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Serve static files from public/uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'apspcl', 'public', 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
