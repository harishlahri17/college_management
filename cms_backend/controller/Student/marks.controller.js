const Marks = require("../../model/Marks");
const Subject = require("../../model/Subject");

// Get all marks for logged-in student
const getStudentMarks = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Fetch marks for this student
    const marks = await Marks.find({ student: studentId })
      .populate("subject", "subject code") // populate subject name & code
      .populate("branch", "branch");       // populate branch name if needed

    res.status(200).json({ Success: true, marks });
  } catch (error) {
    console.error("Error fetching student marks:", error);
    res.status(500).json({ Success: false, Message: "Server Error" });
  }
};


module.exports = { getStudentMarks};
