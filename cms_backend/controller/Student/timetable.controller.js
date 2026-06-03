const Timetable = require("../../model/Timetable");
const studentDetails = require("../../model/Student/StudentDetails");

const getStudentTimetable = async (req, res) => {
    try {
        const studentId = req.user.id;

        // Find the logged-in student
        const student = await studentDetails.findById(studentId);
        if (!student) {
            return res.status(404).json({ Success: false, Message: "Student not found" });
        }

        // Find timetable for student's branch & semester
        const timetable = await Timetable.findOne({
            branch: student.branch,
            semester: student.semester,
        }).populate("branch", "branch");

        if (!timetable) {
            return res.status(404).json({ Success: false, Message: "No timetable available" });
        }

        return res.status(200).json({ Success: true, timetable });
    } catch (error) {
        console.log(`Error fetching timetable: ${error}`);
        return res.status(500).json({ Success: false, Message: "Server Error" });
    }
};

module.exports = { getStudentTimetable };
