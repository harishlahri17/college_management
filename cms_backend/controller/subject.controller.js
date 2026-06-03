// const Subject = require("../model/Subject");

// const createSubject = async(req, res) => {
//     try {
//         const subjectData = new Subject(req.body);

//         if (!subjectData) {
//             return res.status(404).json({ msg: "Subject data not found from body" });
//         }
//         const saveData = await subjectData.save();
//         res.status(201).json({
//             Success: true,
//             Message: "Subject added successfully",
//             Data: saveData,
//         });

//     } catch (error) {
//         res.status(500).json({ error: error });
//     }

// }

// const subjectList = async (req, res) => {
//     try {
//         const list = await Subject.find()
//         return res.status(200).json({
//             Message: "All Subject fetched successfully",
//             Success: true,
//             TotalCount: list.length,
//             list: list,

//         })
//     } catch (error) {
//         return res.status(400).json({ Success: false, Message: error.message })
//     }
// }

// const deleteSubject = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleted = await Subject.findByIdAndDelete(id);

//         if (!deleted) {
//             return res.status(404).json({ Success: false, Message: " Subject not found!" });
//         }

//         res.status(200).json({ Success: true, Message: "Subject deleted successfully" });
//     } catch (error) {
//         return res.status(400).json({ Message: error.message, Success: false });
//     }
// };

// module.exports = {createSubject, subjectList, deleteSubject};


const Subject = require("../model/Subject");
const Branch = require("../model/Branch");

// Add subject branch & semester wise
const addSubject = async (req, res) => {
  try {
    const { branchId, semester, code, subject } = req.body;

    if (!branchId || !semester || !code || !subject) {
      return res.status(400).json({ Success: false, Message: "All fields are required" });
    }

    const branchExists = await Branch.findById(branchId);
    if (!branchExists) {
      return res.status(404).json({ Success: false, Message: "Branch not found" });
    }

    const newSubject = new Subject({ branch: branchId, semester, code, subject });
    await newSubject.save();

    res.json({ Success: true, Message: "Subject added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Success: false, Message: "Server error" });
  }
};

// Get all subjects with branch
const getSubjectList = async (req, res) => {
  try {
    const list = await Subject.find().populate("branch", "branch");
    res.json({ Success: true, list });
  } catch (error) {
    res.status(500).json({ Success: false, Message: "Server error" });
  }
};

// Delete subject
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    await Subject.findByIdAndDelete(id);
    res.json({ Success: true, Message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ Success: false, Message: "Server error" });
  }
};

module.exports = {addSubject,getSubjectList,deleteSubject};
