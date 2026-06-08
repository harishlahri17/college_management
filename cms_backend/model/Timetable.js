const mongoose = require("mongoose");

const timetable = new mongoose.Schema({
    branch: {
        type: mongoose.Schema.Types.ObjectId, // link to Branch collection
        ref: "Branch",
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    timetable: {
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

module.exports = mongoose.model("timetable", timetable);