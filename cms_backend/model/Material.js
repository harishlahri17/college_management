const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    branch: {
        type: mongoose.Schema.Types.ObjectId, // link to Branch collection
        ref: "Branch",
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId, // link to Subject collection
        ref: "Subject",
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
    },
    originalName: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("material", materialSchema);