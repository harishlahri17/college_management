const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Storage configuration----------
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'media/Admin/');
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   }
// })

// // File filter (only images allowed)---------------
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

// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
//   fileFilter,
// });

// module.exports = upload;


// Common storage function
const storageConfig = (folderName) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = `media/${folderName}`;
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

// File filter (only images allowed)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

// Separate upload handlers
const uploadAdmin = multer({
  storage: storageConfig("Admin"),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

const uploadStudent = multer({
  storage: storageConfig("Student"),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

const uploadFaculty = multer({
  storage: storageConfig("Faculty"),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

const uploadTimetable = multer({
  storage: storageConfig("Timetable"),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

// Only PDF allowed
const pdfFileFilter = (req, file, cb) => {
  const allowedTypes = /pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype === "application/pdf";

  if (extname && mimetype) cb(null, true);
  else cb(new Error("Only PDF files allowed"));
};

const uploadMaterial = multer({
  storage: storageConfig("Material"),
  pdfFileFilter
});



module.exports = { uploadAdmin, uploadStudent, uploadFaculty, uploadTimetable ,uploadMaterial};