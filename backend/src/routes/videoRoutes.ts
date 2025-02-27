import express from "express";
import multer from "multer";
import path from "path";
import { videoController } from "../controllers/VideoController";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "/tmp/uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const allowedVideoTypes = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-matroska",
];

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!allowedVideoTypes.includes(file.mimetype)) {
      cb(new Error("Invalid file type"));
      return;
    }
    cb(null, true);
  },
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

router.post("/upload", upload.single("video"), videoController.uploadVideo);
router.get("/", videoController.getVideos);
router.get("/:id", videoController.getVideo);
router.put("/update/:id", videoController.updateVideo);
router.delete("/delete/:id", videoController.deleteVideo);

export default router;
