// const mongoose = require("mongoose");

// const marksSchema = new mongoose.Schema({
//   student: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Student-Detail",
//     required: true
//   },
//   branch: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Branch",
//     required: true
//   },
//   semester: {
//     type: Number,
//     required: true
//   },
//   subject: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Subject",
//     required: true
//   },
//   examType: {
//     type: String,
//     enum: ["internal", "external"],
//     required: true
//   },
//   marks: { type: Number, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Marks", marksSchema);

const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student-Detail",
    required: true
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true
  },
  internalMarks: {
    type: Number,
    default: null,
  },
  externalMarks: {
    type: Number,
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model("Marks", marksSchema);

