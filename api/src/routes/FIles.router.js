import fs from "fs";
import { Router } from "express";
import path from "path";
import process from "process";

const TARGET_FOLDER = path.join(process.cwd(), "uploads/");

export const FilesRouter = Router().get("/view", (req, res) => {
  try {
    const { path } = req.query;

    let filePath = TARGET_FOLDER + path;

    console.log(filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found", ok: false });
    }

    return res.sendFile(filePath);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message, ok: false });
  }
});
