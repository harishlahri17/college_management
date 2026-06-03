const express = require("express");
const databaseConnection = require("./database");
const cors = require("cors");
const bodyParser = require("body-parser");

// Database connection 
databaseConnection();

require("dotenv").config(); // load .env file

const app = express();
// Middlewares
app.use(cors());
app.use(bodyParser.json());


const Port = process.env.PORT || 8000;
app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});


app.get("/",(req,res) => {
    res.send("hello worls !");
});


// app.use("/media/admin", express.static("media/Admin")); // serve file statically

app.use("/media/admin", express.static("media/Admin"));// serve file statically
app.use("/media/student", express.static("media/Student"));
app.use("/media/faculty", express.static("media/Faculty")); 
app.use("/media/material", express.static("media/Material")); // <-- FIXED
app.use("/media/timetable", express.static("media/Timetable")); // optional

const adminRoutes = require("./routes/Admin/AdminDetails"); //import routes
app.use("/api/admin", adminRoutes); // API for admin

const facultyRoutes = require("./routes/Faculty/FacultyDetails");//import routes
app.use("/api/faculty",facultyRoutes);// API for faculty

const studentRoute = require("./routes/Student/StudentDetails"); // import routes
app.use("/api/student",studentRoute); // API for student

