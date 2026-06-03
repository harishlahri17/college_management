const express = require("express");
const route = express.Router();

// import file handeler
const { uploadAdmin, uploadStudent, uploadFaculty } = require("../../controller/fileHandle.controller");

// Import admin Controller
const {createAdmin, adminList, deleteAdmin, getAdminById, updateAdmin} = require("../../controller/admin.controller");

// Insert Admin API
route.post("/add-admin",uploadAdmin.single("profile"),createAdmin);

//fetch all admin API
route.get("/admin-list",adminList);

//delete admin API
route.delete("/delete-admin/:id",deleteAdmin);

// Fetch single admin
route.get("/admin/:id", getAdminById);
// update admin API
route.put("/update-admin/:id", uploadAdmin.single("profile"), updateAdmin);



// Import faculty Controller
const { createFaculty, facultyList, deleteFaculty, getFacultyById, updateFaculty } = require("../../controller/faculty.controller");

// add faculty API
route.post("/add-faculty",uploadFaculty.single("profile"),createFaculty);

//fetch all faculty API
route.get("/faculty-list",facultyList);

// delete faculty API
route.delete("/delete-faculty/:id", deleteFaculty);

// Fetch single faculty
route.get("/single-faculty/:id", getFacultyById);

// update faculty API
route.put("/update-faculty/:id",uploadFaculty.single("profile"), updateFaculty);




// Import Student controller 
const {createStudent, studentList, deleteStudent, updateStudent, getStudentById, } = require("../../controller/student.controller");

// add student API 
route.post("/add-student",uploadStudent.single("profile"), createStudent);

// fetch all student API
route.get("/student-list", studentList);

// delete student API
route.delete("/delete-student/:id",deleteStudent);

// fetch single student
route.get("/single-student/:id", getStudentById);

// update student
route.put("/update-student/:id", uploadStudent.single("profile") , updateStudent);

module.exports = route;


// import controller
const { createBranch, branchList, deleteBranch } = require("../../controller/branch.controller");
// add branch 
route.post("/add-branch", createBranch);

// fetch all branch 
route.get("/branch-list", branchList);

// delete Branch
route.delete("/delete-branch/:id", deleteBranch);


const { addSubject, getSubjectList, deleteSubject } = require("../../controller/subject.controller");
route.post("/add-subject", addSubject);
route.get("/subject-list", getSubjectList);
route.delete("/delete-subject/:id", deleteSubject);


const { createNotice, noticeList, deleteNotice } = require("../../controller/notice.controller");
//add notice API
route.post("/add-notice", createNotice);

// fetch all subject 
route.get("/notice-list", noticeList);

// delete subject
route.delete("/delete-notice/:id", deleteNotice);

const { loginAdmin } = require("../../controller/Auth/adminAuth.controller");
const { userAdmin, changePasswordAdmin } = require("../../controller/Admin/profile.controller");
const authMiddleware = require("../../middleware/auth-middleware");
// login admin
route.post("/admin-login", loginAdmin);

// admin profile 
route.get("/admin-profile", authMiddleware, userAdmin);

route.put("/change-password-admin", authMiddleware, changePasswordAdmin);