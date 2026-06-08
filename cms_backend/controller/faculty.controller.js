const facultyDetail = require("../model/Faculty/FacultyDetails");
// const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

const createFaculty = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ Success: false, Message: "Profile image is required" });
        }
        const { employeeId, firstName, middleName, lastName, email,
            phoneNumber, gender, branch, experience, post, profile, password } = req.body;
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const facultyData = new facultyDetail({
            employeeId: employeeId,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            branch: branch,
            experience: experience,
            post: post,
            profile: req.file.path,
            public_id: req.file.filename,
            password: hashedPassword,
        });

        const saveData = await facultyData.save();

        const token = jwt.sign(
            { id: facultyData._id, role: "faculty" },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );
        res.status(201).json({
            Success: true,
            Message: "Faculty added successfully",
            Data: saveData,
            token: token,
        });

    } catch (error) {
        res.status(500).json({ Success: false, Message: error.message });
    }
}

const facultyList = async (req, res) => {
    try {
        const list = await facultyDetail.find({}).populate("branch", "branch"); // only get the branch name
        return res.status(200).json({
            Message: "All Faculty fetched successfully",
            Success: true,
            TotalCount: list.length,
            list: list,

        })
    } catch (error) {
        return res.status(400).json({ Success: false, Message: error.message })
    }
}

const deleteFaculty = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await facultyDetail.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ Success: false, Message: " Faculty not found!" });
        }

        res.status(200).json({ Success: true, Message: "Faculty deleted successfully" });
    } catch (error) {
        return res.status(400).json({ Message: error.message, Success: false });
    }
};

// Get single faculty by ID
const getFacultyById = async (req, res) => {
    try {
        const { id } = req.params;
        const faculty = await facultyDetail.findById(id);

        if (!faculty) {
            return res.status(404).json({ Success: false, Message: "faculty not found" });
        }

        res.status(200).json({
            Success: true,
            Message: "faculty fetched successfully",
            faculty,
        });
    } catch (error) {
        res.status(500).json({ Success: false, Message: error.message });
    }
};

// Update faculty
const updateFaculty = async (req, res) => {
    try {
        const { id } = req.params;

        const faculty = await facultyDetail.findById(id); // fixed
        if (!faculty) {
            return res.status(404).json({ Success: false, Message: "Faculty not found" });
        }

         const { employeeId, firstName, middleName, lastName, email,
            phoneNumber, gender, branch, experience, post, profile } = req.body;

        let updateData = {
            employeeId: employeeId,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            branch: branch,
            experience: experience,
            post: post,
        };

        // if (req.file) {
        //     if (faculty.profile) {
        //         const oldPath = path.join(__dirname, "../../media/Faculty", faculty.profile);
        //         if (fs.existsSync(oldPath)) {
        //             fs.unlinkSync(oldPath);
        //         }
        //     }
        //     updateData.profile = req.file.filename;
        // }

        if (req.file) {
            // delete old image 
            if (faculty.public_id) {
                await cloudinary.uploader.destroy(faculty.public_id);
            }
            updateData.profile = req.file.path;
            updateData.public_id = req.file.filename;
        }

        const updatedFaculty = await facultyDetail.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ 
            Success: true, 
            Message: "Admin updated successfully", 
            faculty: updatedFaculty 
        });
    } catch (error) {
        console.error("Error updating Faculty:", error);
        res.status(500).json({ Success: false, Message: error.message });
    }
};

const deleteFacultyImage = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await facultyDetail.findById(id);

    if (!faculty) {
      return res.status(404).json({
        Success: false,
        Message: "faculty not found"
      });
    }

    if (faculty.public_id) {
      await cloudinary.uploader.destroy(
        faculty.public_id
      );
    }

    faculty.profile = "";
    faculty.public_id = "";

    await faculty.save();

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

module.exports = { createFaculty, facultyList, deleteFaculty, getFacultyById, updateFaculty , deleteFacultyImage};
