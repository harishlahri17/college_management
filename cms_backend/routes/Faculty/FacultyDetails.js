const express = require("express");
const route = express.Router();

// Import controller
const { getStudentByEnrollment } = require("../../controller/Faculty/studentInfo.controller");


// Fetch student by enrollment number (under faculty)
route.get("/student-info/:enrollmentNo", getStudentByEnrollment);


const { getStudentsByBranchSemester, getSubjectsByBranchSemester, uploadMarks } = require("../../controller/Faculty/marks.controller");

// Fetch students by branch + semester
route.get("/students", getStudentsByBranchSemester);

// Fetch subjects by branch + semester
route.get("/subjects", getSubjectsByBranchSemester);

// Upload marks
route.post("/upload-marks", uploadMarks);



//import timetable controller
const { addTimetable, getTimetables, deleteTimetable } = require("../../controller/Faculty/timetable.controller");
const { uploadTimetable} = require("../../controller/fileHandle.controller");
// Routes
route.post("/add-timetable", uploadTimetable.single("timetable"), addTimetable);
route.get("/timetable-list", getTimetables);
route.delete("/delete-timetable/:id", deleteTimetable);

//import Material controller
const { addMaterial, getMaterials, deleteMaterial } = require("../../controller/Faculty/material.controller");
const { uploadMaterial } = require("../../controller/fileHandle.controller");
//  Material Routes
route.post("/add-material",uploadMaterial.single("material"), addMaterial);
route.get("/materials", getMaterials);
route.delete("/delete-material/:id", deleteMaterial);


// faculty login---------------------------------
const { loginFaculty } = require("../../controller/Auth/facultyAuth.controller");
const { userFaculty, changePasswordFaculty, } = require("../../controller/Faculty/profile.controller");
const authMiddleware = require("../../middleware/auth-middleware");

route.post("/faculty-login", loginFaculty);

route.get("/faculty-profile", authMiddleware, userFaculty);
// Change password route
route.put("/change-password-faculty", authMiddleware, changePasswordFaculty);

module.exports = route;