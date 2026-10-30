
const express = require("express");

const {
  uploadPhoto,
  getPhotos,
} = require("../controllers/photoController");

const upload = require("../middleware/upload");

const router = express.Router();

// GET: Retrieve all certificates or filter by category
router.get("/", getPhotos);

// POST: Upload a new certificate
router.post("/", upload.single("certificate"), uploadPhoto);

module.exports = router;
