const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg"];

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "student-certificates",
    allowed_formats: ["png", "jpg", "jpeg"],
    resource_type: "image",
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return callback(
        new Error("Only PNG and JPG/JPEG certificate files are allowed")
      );
    }

    callback(null, true);
  },
});

module.exports = upload;