// backend/app.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db");
const peopleRoutes = require("./routes/peopleRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/people", peopleRoutes);

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
