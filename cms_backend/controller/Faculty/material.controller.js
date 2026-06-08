const Material = require("../../model/Material");
const cloudinary = require("../../config/cloudinary");

// sAdd Material
const addMaterial = async (req, res) => {
  try {
    const { branch, semester, subject } = req.body;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const newMaterial = new Material({
      branch,
      semester,
      subject,
      material: req.file.path, // save url in db
      public_id: req.file.filename,  // Cloudinary public id 
      originalName: req.file.originalname
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
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({success: false,message: "Material not found",});
    }

    // Delete file from Cloudinary
    if (material.public_id) {
      await cloudinary.uploader.destroy(material.public_id,);
    }
    // Delete from MongoDB
    await Material.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Material deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { addMaterial, getMaterials, deleteMaterial }