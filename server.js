// backend/app.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db");
const peopleRoutes = require("./routes/peopleRoutes");
const reportRoutes = require("./routes/reportRoutes");
const tenderRoutes = require("./routes/apspcltenderRoutes");
const newsRouter = require("./routes/news");
const tendersRouter = require("./routes/tenders");
const authRoutes = require("./routes/authRoutes");
const officeRoutes = require("./routes/officeRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const goosRouter = require("./routes/gooRoutes");
const circularsRouter = require("./routes/circularRoutes");
const helmet = require("helmet"); // Import helmet for security headers

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors()); // Use the defined cors options
app.use(express.json());
app.use(helmet()); // Apply helmet to set various security headers

// Serve static files from public/uploads
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "..", "..", "apspcl", "public", "uploads")
  )
);

// Additional static file serving if needed
app.use(
  "/uploads/peopleData",
  express.static(path.join(__dirname, "..", "apspcl", "public", "peopleData"))
);

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/tenders", tenderRoutes);
app.use("/api/people", peopleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/downloads", downloadRoutes);
app.use("/api", newsRouter);
app.use("/api/latest", tendersRouter);
app.use("/api/goos", goosRouter); // The news routes are now accessible via /api/news
app.use("/api/circulars", circularsRouter); // The news routes are now accessible via /api/news
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
// Use the npkunta downloads routes
const npkuntadownloadsRouter = require("./routes/npkuntadownloadroutes");
const npkuntainformationsRouter = require("./routes/npkuntainformationroutes");
const npkuntalanddetailRouter = require("./routes/npkuntalanddetailroutes");

app.use("/api", npkuntadownloadsRouter);
app.use("/api", npkuntainformationsRouter);
app.use("/api", npkuntalanddetailRouter);

const kurnooldownloadsRouter = require("./routes/kurnooldownloadroutes");
const kurnoolinformationsRouter = require("./routes/kurnoolinformationroutes");
const kurnoollanddetailRouter = require("./routes/kurnoollanddetailroutes");

app.use("/api", kurnooldownloadsRouter);
app.use("/api", kurnoolinformationsRouter);
app.use("/api", kurnoollanddetailRouter);

const gaaliveedudownloadsRouter = require("./routes/gaaliveedudownloadroutes");
const gaaliveeduinformationsRouter = require("./routes/gaaliveeduinformationroutes");
const gaaliveedulanddetailRouter = require("./routes/gaaliveedulanddetailroutes");

app.use("/api", gaaliveedudownloadsRouter);
app.use("/api", gaaliveeduinformationsRouter);
app.use("/api", gaaliveedulanddetailRouter);

const ananthapuramudownloadsRouter = require("./routes/ananthapuramudownloadroutes");
const ananthapuramuinformationsRouter = require("./routes/ananthapuramuinformationroutes");
const ananthapuramulanddetailRouter = require("./routes/ananthapuramulanddetailroutes");
app.use("/api", ananthapuramudownloadsRouter);
app.use("/api", ananthapuramuinformationsRouter);
app.use("/api", ananthapuramulanddetailRouter);

const boardOfDirectorsRoutes = require("./routes/boardofdirectors");
app.use("/api/directors", boardOfDirectorsRoutes);

const ImageRoutes = require("./routes/imageRoutes");
app.use("/api/imageUrl", ImageRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
