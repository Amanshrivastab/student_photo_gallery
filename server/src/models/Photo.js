
const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    rollNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Academic",
        "Course Completion",
        "Internship",
        "Hackathon",
        "Achievement",
        "Workshop & Webinar",
        "Other",
      ],
    },

    imageUrl: {
      type: String,
      required: true,
    },

    cloudinaryPublicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model export
module.exports = mongoose.model("Photo", photoSchema);
