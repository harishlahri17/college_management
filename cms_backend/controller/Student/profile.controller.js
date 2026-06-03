const studentDetails = require("../../model/Student/StudentDetails");
const bcrypt = require("bcrypt");

// const user = async (req, res) => {

//     try {
//         const userData = req.user;
//         return res.status(200).json({ msg: userData });

//     } catch (error) {
//         console.log(`error from the user route ${error}`);
//     }
// }

const user = async (req, res) => {
    try {
        // req.user contains { id, role } from authMiddleware
        const studentId = req.user.id;

        // Find student by ID, exclude password, populate branch name
        const student = await studentDetails
            .findById(studentId)
            .select("-password")
            .populate("branch", "branch"); // Assuming Branch model has 'name' field

        if (!student) {
            return res.status(404).json({ Success: false, Message: "Student not found" });
        }

        return res.status(200).json({ Success: true, student });
    } catch (error) {
        console.error(`Error from the student profile route: ${error}`);
        return res.status(500).json({ Success: false, Message: "Server Error" });
    }
};

// Change password
const changePasswordStudent = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ Success: false, Message: "All fields are required" });
    }

    // Fetch student
    const student = await studentDetails.findById(studentId);
    if (!student) {
      return res.status(404).json({ Success: false, Message: "Student not found" });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ Success: false, Message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    student.password = hashedPassword;
    await student.save();

    return res.status(200).json({ Success: true, Message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Success: false, Message: "Server error" });
  }
};


module.exports = { user ,changePasswordStudent };