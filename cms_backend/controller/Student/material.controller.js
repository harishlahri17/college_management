const Material = require("../../model/Material");
const studentDetails = require("../../model/Student/StudentDetails");
const Subject = require("../../model/Subject");

// Get subjects for logged-in student
const getSubjects = async (req, res) => {
    try {
        const student = await studentDetails.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ Success: false, Message: "Student not found" });
        }

        const subjects = await Subject.find({
            branch: student.branch,
            semester: student.semester
        });

        return res.status(200).json({ Success: true, subjects });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Success: false, Message: "Server Error" });
    }
};

// Get material for selected subject
const getMaterialBySubject = async (req, res) => {
    try {
        const student = await studentDetails.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ Success: false, Message: "Student not found" });
        }

        const { subjectId } = req.params;

        const materials = await Material.find({
            branch: student.branch,
            semester: student.semester,
            subject: subjectId
        }).populate("subject", "subject code");

        return res.status(200).json({ Success: true, materials });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ Success: false, Message: "Server Error" });
    }
};

module.exports = { getSubjects, getMaterialBySubject };
