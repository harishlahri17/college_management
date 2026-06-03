const mongoose = require("mongoose");

const notice = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Notice", notice);