const express = require("express");
const mainController = require("../controller/mainController");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Multer 설정 (파일 업로드)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // 파일 저장 폴더
  },
  filename(req, file, cb) {
    const ext = require("path").extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

router.get("/", mainController.getAllData);
router.get("/detail/:id", mainController.getFoodById);

module.exports = router;
