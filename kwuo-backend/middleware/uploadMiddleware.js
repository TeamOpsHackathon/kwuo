// //import the multer library for handling file uploads
// import { mkdirSync } from "fs";
// import multer  from "multer";

// //import nodes path modeule for working with file paths
// import path, { dirname } from "path";

// //import utilities from URL module for ES module compatibility
// import { fileURLToPath } from "url";

// //converts import.meta.url for file path
// const __filename = fileURLToPath(import.meta.url);

// //Gets the directory name from the full file path
// const __dirname = dirname(__filename);


// // Configure storage settinfs for uploaded files
// const storage = multer.diskStorage({
//     //Define where to store upload files
//     destination: (req, file, cb) =>{
//         //Create the full path to uploads directroy (one level up from current dir)
//         const uploadDir = path.join(__dirname, "../uploads");

//         //This creates the folder
//         mkdirSync(uploadDir,{recursive: true});

//         //Callback to indicate where to streo the file
//         cb(null, uploadDir);
//     },

//     //Define how to name uploaded files
//     filename: (req, file,cb) =>{
//         //Create a unique suffix using timestamp and random number
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);

//         //Get the orignal file extension
//         const ext = path.extname(file.originalname);
//     }
// }


// );


import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 50 * 1024 * 1024,
    files: 5
  }
});

export const uploadPostFiles = upload.array('attachments');