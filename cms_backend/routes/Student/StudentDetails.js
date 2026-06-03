const express = require("express");
const route = express.Router();
const  authMiddleware  = require("../../middleware/auth-middleware")

//import controller
// const {createStudent} = require("../../controller/student.controller");
const { loginStudent } = require("../../controller/Auth/studentAuth.controller");
const { user, changePasswordStudent,  } = require("../../controller/Student/profile.controller");
const { getStudentTimetable } = require("../../controller/Student/timetable.controller");
const { getSubjects, getMaterialBySubject } = require("../../controller/Student/material.controller");
const { getStudentMarks} = require("../../controller/Student/marks.controller");

// add student API
// route.post("/add-student",createStudent);


route.post("/student-login", loginStudent);

route.get("/student-profile",authMiddleware, user );
// Get timetable for logged-in student
route.get("/timetable", authMiddleware, getStudentTimetable);

// Get all subjects for logged-in student
route.get("/subjects", authMiddleware, getSubjects);

// Get material for selected subject
route.get("/material/:subjectId", authMiddleware, getMaterialBySubject);

route.get("/marks", authMiddleware, getStudentMarks);

// Change password route
route.put("/change-password-student", authMiddleware, changePasswordStudent);

module.exports = route;