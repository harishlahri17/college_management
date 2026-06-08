const studentDetails = require("../model/Student/StudentDetails");
// const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");


const createStudent = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ Success: false, Message: "Profile image is required" });
        }

        const { enrollmentNo, firstName, middleName, lastName, email,
            phoneNumber, gender, branch, semester, profile, password } = req.body;
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const studentData = new studentDetails({
            enrollmentNo: enrollmentNo,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            branch: branch,
            semester: semester,
            profile: req.file.path,
            public_id: req.file.filename,
            password: hashedPassword,
        });

        const saveData = await studentData.save();

        const token = jwt.sign(
            { id: studentData._id, role: "student" },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );
        res.status(201).json({
            Success: true,
            Message: "Student added successfully",
            Data: saveData,
            token: token,
        });

    } catch (error) {
        res.status(500).json({ Success: false, Message: error.message });
    }
}

const studentList = async (req, res) => {
    try {
        // Populate the branch to get branch name instead of ObjectId
        const list = await studentDetails.find({}).populate("branch", "branch"); // only get the branch name
        return res.status(200).json({
            Message: "All student fetched successfully",
            Success: true,
            TotalCount: list.length,
            list: list,

        })
    } catch (error) {
        return res.status(400).json({ Success: false, Message: error.message })
    }
}

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await studentDetails.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ Success: false, Message: " Student not found!" });
        }

        res.status(200).json({ Success: true, Message: "Student deleted successfully" });
    } catch (error) {
        return res.status(400).json({ Message: error.message, Success: false });
    }
};

// Get single student by ID
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await studentDetails.findById(id);

        if (!student) {
            return res.status(404).json({ Success: false, Message: "student not found" });
        }

        res.status(200).json({
            Success: true,
            Message: "student fetched successfully",
            student,
        });
    } catch (error) {
        res.status(500).json({ Success: false, Message: error.message });
    }
};

//  Update student
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await studentDetails.findById(id); //  fixed
        if (!student) {
            return res.status(404).json({ Success: false, Message: "Faculty not found" });
        }

        const { enrollmentNo, firstName, middleName, lastName, email,
            phoneNumber, gender, branch, semester, profile, password } = req.body;
        let updateData = {
            enrollmentNo: enrollmentNo,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            branch: branch,
            semester: semester,

        };

        // if (req.file) {
        //     if (student.profile) {
        //         const oldPath = path.join(__dirname, "../../media/Student", student.profile);
        //         if (fs.existsSync(oldPath)) {
        //             fs.unlinkSync(oldPath);
        //         }
        //     }
        //     updateData.profile = req.file.filename;
        // }

        if (req.file) {
            // delete old image 
            if (student.public_id) {
                await cloudinary.uploader.destroy(student.public_id);
            }
            updateData.profile = req.file.path;
            updateData.public_id = req.file.filename;
        }

        const updatedStudent = await studentDetails.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({
            Success: true,
            Message: "Admin updated successfully",
            student: updatedStudent
        });
    } catch (error) {
        console.error("Error updating Faculty:", error);
        res.status(500).json({ Success: false, Message: error.message });
    }
}

const deleteStudentImage = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await studentDetails.findById(id);

        if (!student) {
            return res.status(404).json({
                Success: false,
                Message: "Admin not found"
            });
        }

        if (student.public_id) {
            await cloudinary.uploader.destroy(
                student.public_id
            );
        }

        student.profile = "";
        student.public_id = "";

        await student.save();

        res.status(200).json({
            Success: true,
            Message: "Profile image deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            Success: false,
            Message: error.message
        });
    }
};

module.exports = { createStudent, studentList, deleteStudent, getStudentById, updateStudent , deleteStudentImage};