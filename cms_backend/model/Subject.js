const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  branch: {
    type: mongoose.Schema.Types.ObjectId, // link to Branch collection
    ref: "Branch",
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);
