
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const photoRoutes = require("./routes/photoRoutes");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Photo Gallery API is running",
  });
});

// All photo endpoints start with /api/photos
app.use("/api/photos", photoRoutes);

// Handle upload and other Express errors
app.use((error, req, res, next) => {
  if (error instanceof require("multer").MulterError) {
    const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;

    return res.status(status).json({
      success: false,
      message:
        error.code === "LIMIT_FILE_SIZE"
          ? "File size must not exceed 10 MB"
          : error.message,
    });
  }

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Request failed",
    });
  }

  next();
});

module.exports = app;
