const adminDetails = require("../../model/Admin/AdminDetails");
const bcrypt = require("bcrypt");

const userAdmin = async (req, res) => {
    try {
        // req.user contains { id, role } from authMiddleware
        const adminId = req.user.id;

        // Find faculty by ID, exclude password, populate branch name
        const admin = await adminDetails
            .findById(adminId)
            .select("-password");

        if (!admin) {
            return res.status(404).json({ Success: false, Message: "Admin not found" });
        }

        return res.status(200).json({ Success: true, admin });
    } catch (error) {
        console.error(`Error from the Admin profile route: ${error}`);
        return res.status(500).json({ Success: false, Message: "Server Error" });
    }
};

// Change password
const changePasswordAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ Success: false, Message: "All fields are required" });
    }

    // Fetch student
    const admin = await adminDetails.findById(adminId);
    if (!admin) {
      return res.status(404).json({ Success: false, Message: "Admin not found" });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ Success: false, Message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    admin.password = hashedPassword;
    await admin.save();

    return res.status(200).json({ Success: true, Message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Success: false, Message: "Server error" });
  }
};


module.exports = {userAdmin, changePasswordAdmin};