const Timetable = require("../../model/Timetable");


// Add timetable
const addTimetable = async (req, res) => {
  try {
    const { branch, semester } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const timetable = await Timetable.create({
      branch,
      semester,
      timetable: req.file.filename
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
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Timetable deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {addTimetable, getTimetables, deleteTimetable};