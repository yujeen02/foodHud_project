const express = require("express");
const saveController = require("../controller/saveController");
const multer = require("multer"); // ❗ multer 직접 가져오기
const path = require("path");
const router = express.Router();

// Multer 설정 (파일 업로드)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // 파일 저장 폴더
  },
  filename(req, file, cb) {
    const ext = require("path").extname(file.originalname);
    cb(null, Date.now() + ext); // 파일명: 타임스탬프 + 확장자
  },
});

const upload = multer({ storage }); // 업로드 미들웨어 생성

router.get("/", saveController.getAllData);
router.get("/write/:id", saveController.moveWrite);

// ✅ 파일 업로드 지원하는 POST 요청
router.post("/post/test", upload.single("image"), saveController.createTest);

router.put("/update/:id", saveController.dataUpdate);
router.delete("/delete/:id", saveController.deleteData);

module.exports = router;
