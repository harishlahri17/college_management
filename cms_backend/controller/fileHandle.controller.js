// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");


// // Common storage function
// const storageConfig = (folderName) =>
//   multer.diskStorage({
//     destination: function (req, file, cb) {
//       const uploadPath = `media/${folderName}`;
//       if (!fs.existsSync(uploadPath)) {
//         fs.mkdirSync(uploadPath, { recursive: true });
//       }
//       cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   });

// // File filter (only images allowed)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed"));
//   }
// };

// // Separate upload handlers
// const uploadAdmin = multer({
//   storage: storageConfig("Admin"),
//   limits: { fileSize: 2 * 1024 * 1024 },
//   fileFilter,
// });

// const uploadStudent = multer({
//   storage: storageConfig("Student"),
//   limits: { fileSize: 2 * 1024 * 1024 },
//   fileFilter,
// });

// const uploadFaculty = multer({
//   storage: storageConfig("Faculty"),
//   limits: { fileSize: 2 * 1024 * 1024 },
//   fileFilter,
// });

// const uploadTimetable = multer({
//   storage: storageConfig("Timetable"),
//   limits: { fileSize: 2 * 1024 * 1024 },
//   fileFilter,
// });

// // Only PDF allowed
// const pdfFileFilter = (req, file, cb) => {
//   const allowedTypes = /pdf/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = file.mimetype === "application/pdf";

//   if (extname && mimetype) cb(null, true);
//   else cb(new Error("Only PDF files allowed"));
// };

// const uploadMaterial = multer({
//   storage: storageConfig("Material"),
//   pdfFileFilter
// });



// module.exports = { uploadAdmin, uploadStudent, uploadFaculty, uploadTimetable ,uploadMaterial};


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");


// admin storage 
const adminStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Admin",
    allowed_formats: ["jpg", "jpeg", "png"],
  }
});

const uploadAdmin = multer({
  storage: adminStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  }
})

// student storage
const studentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Student",
    allowed_formats: ["jpg", "jpeg", "png"],
  }
});

const uploadStudent = multer({
  storage: studentStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  }

});

// faculty storage 
const facultyStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Faculty",
    allowed_formats: ["jpg", "jpeg", "png"],
  }
});

const uploadFaculty = multer({
  storage: facultyStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  }
});

//timetable storage
const timetableStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Timetable",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  }
});

const uploadTimetable = multer({
  storage: timetableStorage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  }
})

// material storage
const materialStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "Material",
    resource_type: "auto",
    // public_id: `${Date.now()}-${file.originalname}`
    // public_id: `${Date.now()}-${file.originalname.replace(".pdf", "")}`
  }),
});

const pdfFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

const uploadMaterial = multer({
  storage: materialStorage,
  fileFilter: pdfFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024
  }
});

module.exports = { uploadAdmin, uploadStudent, uploadFaculty, uploadTimetable, uploadMaterial };