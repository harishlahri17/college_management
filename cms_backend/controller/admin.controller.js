const AdminDetails = require("../model/Admin/AdminDetails");// import model
// const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

const createAdmin = async (req, res) => {

    try {
        if (!req.file) {
            return res.status(400).json({ Success: false, Message: "Profile image is required" });
        }
        const { employeeId, firstName, middleName, lastName, email,
            phoneNumber, gender, profile, password } = req.body;

        // Check existing admin by email or employeeId
        const existingAdmin = await AdminDetails.findOne({
            $or: [
                { email: email },
                { employeeId: employeeId }
            ]
        });

        if (existingAdmin) {

            if (existingAdmin.email === email) {
                return res.status(400).json({
                    Success: false,
                    Message: "Admin already added with this email"
                });
            }

            if (existingAdmin.employeeId == employeeId) {
                return res.status(400).json({
                    Success: false,
                    Message: "Admin already added with this Employee ID"
                });
            }
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const adminData = new AdminDetails({
            employeeId: employeeId,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            password: hashedPassword,
            profile: req.file.path, // save url in db
            public_id: req.file.filename,  // Cloudinary public id 
        });

        const saveData = await adminData.save();

        const token = jwt.sign(
            { id: adminData._id, role: "admin" },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );
        res.status(201).json({
            Success: true,
            Message: "Admin added successfully",
            Data: saveData,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ Success: false, Message: error.message });
    }
}


const adminList = async (req, res) => {
    try {
        const list = await AdminDetails.find({})
        return res.status(200).json({
            Message: "All admin fetched successfully",
            Success: true,
            TotalCount: list.length,
            list: list,

        })
    } catch (error) {
        return res.status(400).json({ Success: false, Message: error.message })
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await AdminDetails.findByIdAnd(id);

        // Delete image from Cloudinary
        if (admin.public_id) {
            await cloudinary.uploader.destroy(admin.public_id);
        }

        if (!admin) {
            return res.status(404).json({ Success: false, Message: "Admin not found!" });
        }

        await AdminDetails.findByIdAndDelete(id);

        res.status(200).json({ Success: true, Message: "Admin deleted successfully" });
    } catch (error) {
        return res.status(400).json({ Message: error.message, Success: false });
    }
};

// Get single admin by ID
const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await AdminDetails.findById(id);

        if (!admin) {
            return res.status(404).json({ Success: false, Message: "Admin not found" });
        }

        res.status(200).json({
            Success: true,
            Message: "Admin fetched successfully",
            admin,
        });
    } catch (error) {
        res.status(500).json({ Success: false, Message: error.message });
    }
};


// Update Admin
const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const admin = await AdminDetails.findById(id); //  fixed
        if (!admin) {
            return res.status(404).json({ Success: false, Message: "Admin not found" });
        }
        const { firstName, middleName, lastName, employeeId, email, phoneNumber, gender } = req.body;
        let updateData = {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            employeeId: employeeId,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
        };

        // if (req.file) {
        //     if (admin.profile) {
        //         const oldPath = path.join(__dirname, "../../media/Admin", admin.profile);
        //         if (fs.existsSync(oldPath)) {
        //             fs.unlinkSync(oldPath);
        //         }
        //     }
        //     updateData.profile = req.file.filename;
        // }

        if (req.file) {
            // delete old image 
            if (admin.public_id) {
                await cloudinary.uploader.destroy(admin.public_id);
            }
            updateData.profile = req.file.path;
            updateData.public_id = req.file.filename;
        }

        const updatedAdmin = await AdminDetails.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({
            Success: true,
            Message: "Admin updated successfully",
            admin: updatedAdmin
        });
    } catch (error) {
        console.error("Error updating admin:", error);
        res.status(500).json({ Success: false, Message: error.message });
    }
};


const deleteAdminImage = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await AdminDetails.findById(id);

    if (!admin) {
      return res.status(404).json({
        Success: false,
        Message: "Admin not found"
      });
    }

    if (admin.public_id) {
      await cloudinary.uploader.destroy(
        admin.public_id
      );
    }

    admin.profile = "";
    admin.public_id = "";

    await admin.save();

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


module.exports = { createAdmin, adminList, deleteAdmin, getAdminById, updateAdmin , deleteAdminImage};
