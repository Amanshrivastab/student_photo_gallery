const mongoose = require('mongoose');
const photoSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        rollNumber: {
            type:String,
            required: true,
            trim: true,
            maxlength: 30,
        },

        imageUrl: {
            type: String,
            required: true,
        },
        cloudinaryPublicId: {
            type:String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Photo",photoSchema);