
const express = require("express");
const { uploadPhoto } = require("../controllers/photoController");
const upload = require("../middleware/upload");

const router = express.Router();

// POST /api/photos
router.post("/", upload.single("certificate"), uploadPhoto);

module.exports = router;
