const facultyDetails = require("../../model/Faculty/FacultyDetails");
const bcrypt = require("bcrypt");

const userFaculty = async (req, res) => {
    try {
        // req.user contains { id, role } from authMiddleware
        const facultyId = req.user.id;

        // Find faculty by ID, exclude password, populate branch name
        const faculty = await facultyDetails
            .findById(facultyId)
            .select("-password")
            .populate("branch", "branch"); // Assuming Branch model has 'name' field

        if (!faculty) {
            return res.status(404).json({ Success: false, Message: "Faculty not found" });
        }

        return res.status(200).json({ Success: true, faculty });
    } catch (error) {
        console.error(`Error from the faculty profile route: ${error}`);
        return res.status(500).json({ Success: false, Message: "Server Error" });
    }
};

// Change password
const changePasswordFaculty = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ Success: false, Message: "All fields are required" });
    }

    // Fetch student
    const faculty = await facultyDetails.findById(studentId);
    if (!faculty) {
      return res.status(404).json({ Success: false, Message: "faculty not found" });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ Success: false, Message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    faculty.password = hashedPassword;
    await faculty.save();

    return res.status(200).json({ Success: true, Message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Success: false, Message: "Server error" });
  }
};

module.exports = { userFaculty ,changePasswordFaculty};