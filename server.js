// backend/app.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db");
const peopleRoutes = require("./routes/peopleRoutes");
const reportRoutes = require("./routes/reportRoutes");
// const tenderRoutes = require("./routes/tenderRoutes");
const tenderRoutes = require("./routes/apspcltenderRoutes");
const newsRouter = require('./routes/news');
const tendersRouter = require('./routes/tenders'); 
// const apspcltenderRoutes = require("./routes/apspcltenderRoutes");
const authRoutes = require('./routes/authRoutes');
const officeRoutes = require('./routes/officeRoutes')
const helmet = require('helmet'); // Import helmet for security headers

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from the Next.js frontend (remove trailing slash)
  optionsSuccessStatus: 200,
};

app.use(cors()); // Use the defined cors options
app.use(express.json());
app.use(helmet()); // Apply helmet to set various security headers

// Serve static files from public/uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "apspcl", "public", "uploads"))
);

// Additional static file serving if needed
app.use(
  '/uploads/peopleData',
  express.static(path.join(__dirname, '..', 'apspcl', 'public', 'peopleData'))
);

// Routes
app.use("/api/reports", reportRoutes);
// app.use("/api/tenders", tenderRoutes);
app.use("/api/tenders", tenderRoutes);
app.use("/api/people", peopleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/offices', officeRoutes);
app.use('/api', newsRouter); 
app.use('/api/latest', tendersRouter); // The news routes are now accessible via /api/news

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
