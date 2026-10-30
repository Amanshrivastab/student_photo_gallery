
const express = require("express");

const {
  uploadPhoto,
  getPhotos,
  deletePhoto,
} = require("../controllers/photoController");

const upload = require("../middleware/upload");
const {
  deleteLimiter,
} = require("../middleware/rateLimiter");

const router = express.Router();

// GET: Retrieve all certificates or filter by category
router.get("/", getPhotos);

// POST: Upload a new certificate
router.post("/", upload.single("certificate"), uploadPhoto);

// DELETE: Delete a certificate by ID
router.delete("/:id", deleteLimiter, deletePhoto);

module.exports = router;
