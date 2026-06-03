const AdminDetails = require("../model/Admin/AdminDetails");// import model
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
    // try {
    //     const adminData = new AdminDetails(req.body);

    //     if(!adminData){
    //         return res.status(404).json({msg: "Admin data not found from body"});
    //     }
    //     const saveData = await adminData.save();
    //     res.status(200).json(saveData);

    // } catch (error) {
    //     res.status(500).json({error: error});
    // }

    
    try {
        if (!req.file) {
            return res.status(400).json({ Success: false, Message: "Profile image is required" });
        }
        const { employeeId, firstName, middleName, lastName, email,
            phoneNumber, gender, profile, password } = req.body;
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
            profile: req.file.filename, // save file name in DB
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
            token:token,
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
        const deleted = await AdminDetails.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ Success: false, Message: "Admin not found!" });
        }

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

        let updateData = {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            employeeId: req.body.employeeId,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
        };

        if (req.file) {
            if (admin.profile) {
                const oldPath = path.join(__dirname, "../../media/Admin", admin.profile);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            updateData.profile = req.file.filename;
        }

        const updatedAdmin = await AdminDetails.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ Success: true, Message: "Admin updated successfully", admin: updatedAdmin });
    } catch (error) {
        console.error("Error updating admin:", error);
        res.status(500).json({ Success: false, Message: error.message });
    }
};


module.exports = { createAdmin, adminList, deleteAdmin, getAdminById, updateAdmin };
