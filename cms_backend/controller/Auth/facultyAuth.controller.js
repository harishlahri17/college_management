const facultyDetail = require("../../model/Faculty/FacultyDetails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  Login Faculty
const loginFaculty = async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    const faculty = await facultyDetail.findOne({ employeeId });
    if (!faculty) {
      return res.status(400).json({ Success: false, Message: "Invalid ID or Password" });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ Success: false, Message: "Invalid ID or Password" });
    }

    const token = jwt.sign(
      { id: faculty._id, role: "faculty" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
      faculty,
    );

    res.json({ Success: true, Message: "Faculty login successful", token });
  } catch (err) {
    res.status(500).json({ Success: false, Message: err.message });
  }
};

module.exports = { loginFaculty };
