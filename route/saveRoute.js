const express = require("express");
const saveController = require("../controller/saveController");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Multer 설정 (파일 업로드)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

const uploadFiles = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "subImage1", maxCount: 1 },
  { name: "subImage2", maxCount: 1 },
]);

router.get("/", saveController.getAllData);
router.get("/write/:id", saveController.moveWrite);

router.post("/post/test", uploadFiles, saveController.createTest);
router.put("/update/:id", uploadFiles, saveController.dataUpdate);

router.delete("/delete/:id", saveController.deleteData);

module.exports = router;
