
const Photo = require("../models/Photo");
const cloudinary = require("../config/cloudinary");

const ALLOWED_CATEGORIES = [
  "Academic",
  "Course Completion",
  "Internship",
  "Hackathon",
  "Achievement",
  "Workshop & Webinar",
  "Other",
];




async function removeUploadedFile(file) {
  if (!file?.filename) return;

  try {
    await cloudinary.uploader.destroy(file.filename, {
      resource_type: "image",
    });
  } catch (error) {
    console.error("Cloudinary cleanup failed:", error.message);
  }
}
 


async function uploadPhoto(req, res) {
  let uploadedPublicId = null;

  try {
    const { name, rollNumber, category } = req.body;

    // Check required text fields
    if (
      !name?.trim() ||
      !rollNumber?.trim() ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, roll number and category are required",
      });
    }

    // Check category
    if (!ALLOWED_CATEGORIES.includes(category)) {
          await removeUploadedFile(req.file);

      return res.status(400).json({
        success: false,
        message: "Invalid certificate category",
      });
    }

    // Check uploaded file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PNG certificate",
      });
    }

    uploadedPublicId = req.file.filename;

    // Save certificate details in MongoDB
    const photo = await Photo.create({
      name: name.trim(),
      rollNumber: rollNumber.trim(),
      category,
      imageUrl: req.file.path,
      cloudinaryPublicId: uploadedPublicId,
    });

    return res.status(201).json({
      success: true,
      message: "Certificate uploaded successfully",
      data: photo,
    });
  } catch (error) {
    // Remove the Cloudinary file if database saving fails
    if (uploadedPublicId) {
      try {
        await cloudinary.uploader.destroy(uploadedPublicId, {
          resource_type: "image",
        });
      } catch (cleanupError) {
        console.error(
          "Cloudinary cleanup failed:",
          cleanupError.message
        );
      }
    }

    console.error("Certificate upload failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save certificate",
    });
  }
}

module.exports = { uploadPhoto };
