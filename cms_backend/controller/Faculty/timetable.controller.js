const Timetable = require("../../model/Timetable");
const Cloudinary = require("../../config/cloudinary");


// Add timetable
const addTimetable = async (req, res) => {
  try {
    const { branch, semester } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const timetable = await Timetable.create({
      branch,
      semester,
      timetable: req.file.path,
      public_id: req.file.filename,
      originalName: req.file.originalname,
    });

    res.json({ success: true, timetable });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all timetables
const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find()
      .populate("branch", "branch") // branch name
      .sort({ createdAt: -1 });

    res.json({ success: true, timetables });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete timetable
const deleteTimetable = async (req, res) => {
  try {

    const timet = await Timetable.findById(req.params.id);

    if (!timet) {
      return res.status(404).json({
        success: false,
        message: "Timetable not found"
      });
    }

    if (timet.public_id) {
      await Cloudinary.uploader.destroy(timet.public_id);
    }

    await Timetable.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Timetable deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = { addTimetable, getTimetables, deleteTimetable };