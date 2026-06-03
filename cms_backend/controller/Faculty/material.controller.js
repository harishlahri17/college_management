const Material = require("../../model/Material");

// sAdd Material
const addMaterial = async (req, res) => {
  try {
    const { branch, semester, subject } = req.body;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const newMaterial = new Material({
      branch,
      semester,
      subject,
      material: req.file.filename, // store only filename
    });

    await newMaterial.save();
    res.status(201).json({ success: true, material: newMaterial });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//  Get All Materials
const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find()
      .populate("branch", "branch") // branch name
      .populate("subject", "subject") // subject name
      .sort({ createdAt: -1 });

    res.json({ success: true, materials });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//  Delete Material
const deleteMaterial = async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Material deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {addMaterial,getMaterials ,deleteMaterial}