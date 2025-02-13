// backend/app.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db");
const peopleRoutes = require("./routes/peopleRoutes");
const reportRoutes = require("./routes/reportRoutes");
const returnRoutes = require("./routes/apreturnRoutes");
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
app.use("/api/apreturns", returnRoutes);
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


const npkuntadownloadsRouter = require("./routes/solarparks/npkunta/downloadroutes");
const npkuntainformationsRouter = require("./routes/solarparks/npkunta/informationroutes");
const npkuntalanddetailRouter = require("./routes/solarparks/npkunta/landdetailroutes");
const npkuntaRichTextRoutes = require("./routes/solarparks/npkunta/richtextroutes")

app.use("/api", npkuntadownloadsRouter);
app.use("/api", npkuntainformationsRouter);
app.use("/api", npkuntalanddetailRouter);
app.use("/api/npkuntarichtext", npkuntaRichTextRoutes);


const gaaliveedudownloadsRouter = require("./routes/solarparks/gaaliveedu/gaaliveedudownloadroutes");
const gaaliveeduinformationsRouter = require("./routes/solarparks/gaaliveedu/gaaliveeduinformationroutes");
const gaaliveedulanddetailRouter = require("./routes/solarparks/gaaliveedu/gaaliveedulanddetailroutes");
const gaaliveeduRichTextRoutes = require("./routes/solarparks/gaaliveedu/gaaliveedurichtextroutes")

app.use("/api", gaaliveedudownloadsRouter);
app.use("/api", gaaliveeduinformationsRouter);
app.use("/api", gaaliveedulanddetailRouter);
app.use("/api/gaaliveedurichtext", gaaliveeduRichTextRoutes);

const ananthapuramudownloadsRouter = require("./routes/solarparks/ananthapuramu/downloadroutes");
const ananthapuramuinformationsRouter = require("./routes/solarparks/ananthapuramu/informationroutes");
const ananthapuramulanddetailRouter = require("./routes/solarparks/ananthapuramu/landdetailroutes");
const ananthapuramuRichTextRoutes = require("./routes/solarparks/ananthapuramu/richtextroutes")

app.use("/api", ananthapuramudownloadsRouter);
app.use("/api", ananthapuramuinformationsRouter);
app.use("/api", ananthapuramulanddetailRouter);
app.use("/api/ananthapuramurichtext", ananthapuramuRichTextRoutes);

const kurnooldownloadsRouter = require("./routes/solarparks/kurnool/downloadroutes");
const kurnoolinformationsRouter = require("./routes/solarparks/kurnool/informationroutes");
const kurnoollanddetailRouter = require("./routes/solarparks/kurnool/landdetailroutes");
const kurnoolRichTextRoutes = require("./routes/solarparks/kurnool/richtextroutes")

app.use("/api", kurnooldownloadsRouter);
app.use("/api", kurnoolinformationsRouter);
app.use("/api", kurnoollanddetailRouter);
app.use("/api/kurnoolrichtext", kurnoolRichTextRoutes);

const kadapadownloadsRouter = require("./routes/solarparks/kadapa/downloadroutes");
const kadapainformationsRouter = require("./routes/solarparks/kadapa/informationroutes");
const kadapalanddetailRouter = require("./routes/solarparks/kadapa/landdetailroutes");
const kadapaRichTextRoutes = require("./routes/solarparks/kadapa/richtextroutes")

app.use("/api", kadapadownloadsRouter);
app.use("/api", kadapainformationsRouter);
app.use("/api", kadapalanddetailRouter);
app.use("/api/kadaparichtext", kadapaRichTextRoutes);

const boardOfDirectorsRoutes = require("./routes/boardofdirectors");
app.use("/api/directors", boardOfDirectorsRoutes);

const ImageRoutes = require("./routes/imageRoutes");
app.use("/api/imageUrl", ImageRoutes);

const menuRoutes = require("./routes/menuRoutes");
app.use("/api/menus", menuRoutes);

const solarparkRoutes = require('./routes/solarparks.routes'); 

app.use('/api/solarparks', solarparkRoutes);

const awardRoutes = require('./routes/awardroutes'); // Import the award routes

app.use('/api/awards', awardRoutes); // Prefix the routes with /api/awards

const galleryRoutes = require("./routes/gallery");

app.use("/api/gallery", galleryRoutes);
const contactUsRoutes = require("./routes/contactUsRoutes")

app.use('/api/contactus', contactUsRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
