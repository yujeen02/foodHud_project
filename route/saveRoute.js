const express = require("express");
const saveController = require("../controller/saveController");
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

router.get("/", saveController.getAllData);
router.get("/write/:id", saveController.moveWrite);

router.post("/post/test", upload.single("image"), saveController.createTest);

router.put("/update/:id", upload.single("image"), saveController.dataUpdate);
router.delete("/delete/:id", saveController.deleteData);

module.exports = router;
