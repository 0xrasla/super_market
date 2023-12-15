import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads";
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    req.body.image = filename;
    cb(null, filename);
  },
});

export const upload = multer({ storage });

export const deleteFile = (filePath) => {
  const BASE_FOLDER = "uploads/";

  if (fs.existsSync(BASE_FOLDER + filePath)) {
    fs.unlinkSync(BASE_FOLDER + filePath);
  }
};
