const crypto = require("crypto");
const Photo = require("../models/Photo");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

const ALLOWED_CATEGORIES = [
  "Academic",
  "Course Completion",
  "Internship",
  "Hackathon",
  "Achievement",
  "Workshop & Webinar",
  "Other",
];

const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/bmp",
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
      await removeUploadedFile(req.file);

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
        message: "Please upload a certificate image",
      });
    }

    // Validate image MIME type
    if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
      await removeUploadedFile(req.file);

      return res.status(400).json({
        success: false,
        message:
          "Only PNG, JPG, JPEG, WEBP, GIF and BMP images are allowed",
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

    // Remove Cloudinary file if database saving fails
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
async function getPhotos(req, res){
  try{

    const {category} = req.query;

    const filter = {};

    if(category){
      if(!ALLOWED_CATEGORIES.includes(category)){
        return res.status(400).json({
          success: false,
          message: "Invalid certificate category",
        });
      }
      filter.category = category;
    }
    const photos = await Photo.find(filter)
  .sort({ createdAt: -1 })
  .lean();    

    return res.status(200).json({
      success: true,
      count: photos.length,
      data: photos,
    });

  }catch(error){
    console.error("Get certficates error: ", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch certificates",
    });
  }
}

async function deletePhoto(req, res) {
  try {
    const { id } = req.params;
   const { password } = req.body || {};

    // Check whether the ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID",
      });
    }

    // Check password
    const correctPassword = process.env.DELETE_PASSWORD;

    if (!correctPassword) {
      return res.status(500).json({
        success: false,
        message: "Delete password is not configured",
      });
    }

    if (typeof password !== "string") {
      return res.status(401).json({
        success: false,
        message: "Incorrect delete password",
      });
    }

    const submitted = Buffer.from(password);
    const expected = Buffer.from(correctPassword);

    const passwordMatches =
      submitted.length === expected.length &&
      crypto.timingSafeEqual(submitted, expected);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Incorrect delete password",
      });
    }

    // Find certificate in MongoDB
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(
      photo.cloudinaryPublicId,
      { resource_type: "image" }
    );

    // Delete certificate record from MongoDB
    await Photo.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Certificate deleted successfully",
    });

  } catch (error) {
    console.error("Delete certificate error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to delete certificate",
    });
  }
}


module.exports = { uploadPhoto , getPhotos , deletePhoto };
