const Marks = require("../../model/Marks");
const Student = require("../../model/Student/StudentDetails");
const Subject = require("../../model/Subject");

// Fetch students by branch + semester
const getStudentsByBranchSemester = async (req, res) => {
  try {
    const { branchId, semester } = req.query;
    const students = await Student.find({ branch: branchId, semester }).populate("branch", "branch");
    res.json({ Success: true, students });
  } catch (error) {
    res.status(500).json({ Success: false, Message: error.message });
  }
};

// Fetch subjects by branch + semester
const getSubjectsByBranchSemester = async (req, res) => {
  try {
    const { branchId, semester } = req.query;
    const subjects = await Subject.find({ branch: branchId, semester }).populate("branch", "branch");
    res.json({ Success: true, subjects });
  } catch (error) {
    res.status(500).json({ Success: false, Message: error.message });
  }
};


// Upload marks (internal/external)
const uploadMarks = async (req, res) => {
  try {
    const { studentId, branchId, semester, subjectId, examType, marks } = req.body;

    if (!studentId || !branchId || !semester || !subjectId || !examType || marks == null) {
      return res.status(400).json({ Success: false, Message: "All fields required" });
    }

    // Find if marks already exist for this student + subject
    let existingMark = await Marks.findOne({
      student: studentId,
      branch: branchId,
      semester,
      subject: subjectId,
    });

    if (!existingMark) {
      existingMark = new Marks({
        student: studentId,
        branch: branchId,
        semester,
        subject: subjectId,
      });
    }

    // Update internal/external field based on examType
    if (examType === "internal") {
      existingMark.internalMarks = marks;
    } else if (examType === "external") {
      existingMark.externalMarks = marks;
    }

    await existingMark.save();

    res.json({ Success: true, Message: "Marks uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Success: false, Message: error.message });
  }
};

module.exports = { getStudentsByBranchSemester, getSubjectsByBranchSemester, uploadMarks };
