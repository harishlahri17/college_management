const Student = require("../../model/Student/StudentDetails");

// fetch student by enrollment number
const getStudentByEnrollment = async (req, res) => {
    try {
        const { enrollmentNo } = req.params;

        // find student by enrollmentNo (make sure enrollmentNo is stored as Number in DB)
        const student = await Student.findOne({ enrollmentNo: Number(enrollmentNo) }).populate("branch", "branch");

        if (!student) {
            return res.status(404).json({
                Success: false,
                Message: "Student not found",
            });
        }

        res.status(200).json({
            Success: true,
            Data: student,
        });
    } catch (error) {
        res.status(500).json({
            Success: false,
            Message: error.message,
        });
    }
};

module.exports = { getStudentByEnrollment };