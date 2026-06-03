const studentDetails = require("../../model/Student/StudentDetails");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


// ✅ Login Student
const loginStudent = async (req, res) => {
  try {
    const { enrollmentNo, password } = req.body;

    const student = await studentDetails.findOne({ enrollmentNo });
    if (!student) {
      return res.status(400).json({ Success: false, Message: "Invalid Enrollment No or Password" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ Success: false, Message: "Invalid Enrollment No or Password" });
    }

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
      student,
    );

    res.json({
      Success: true,
      Message: "Login successful",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ Success: false, Message: err.message });
  }
};


module.exports = {loginStudent};