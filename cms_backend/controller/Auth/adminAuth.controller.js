const AdminDetail = require("../../model/Admin/AdminDetails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  Login Faculty
const loginAdmin = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    const admin = await AdminDetail.findOne({ employeeId });
    if (!admin) {
      return res.status(400).json({ Success: false, Message: "Invalid ID or Password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ Success: false, Message: "Invalid ID or Password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
      admin,
    );

    res.json({ Success: true, Message: "Faculty login successful", token });
  } catch (err) {
    res.status(500).json({ Success: false, Message: err.message });
  }
};

module.exports = { loginAdmin };
