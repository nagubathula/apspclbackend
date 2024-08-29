// backend/app.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db");
const peopleRoutes = require("./routes/peopleRoutes");
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require('./routes/authRoutes');
const helmet = require('helmet'); // Import helmet for security headers

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000/', // Allow requests from the Next.js frontend
  optionsSuccessStatus: 200,
};
app.use(cors());
app.use(express.json());
app.use(helmet()); // Apply helmet to set various security headers

// Additional security headers for clickjacking prevention
// app.use((req, res, next) => {
//   res.setHeader('X-Frame-Options', 'DENY'); // Prevent framing
//   res.setHeader('Content-Security-Policy', "frame-ancestors 'none';"); // Prevent framing
//   next();
// });

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/people", peopleRoutes);
app.use('/api/auth', authRoutes);

// Serve static files from public/uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "apspcl", "public", "uploads"))
);

app.use(
  '/uploads/peopleData',
  express.static(path.join(__dirname, '..', 'apspcl', 'public', 'peopleData'))
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
