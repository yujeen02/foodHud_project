const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const port = 3000;

// 파일 업로드 설정
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

// 다른 라우트 추가
const saveRoutes = require("./route/saveRoute");
app.use("/save", saveRoutes);

const mainRoutes = require("./route/mainRoute");
app.use("/", mainRoutes);

const heartRoutes = require("./route/heartRoute");
app.use("/", heartRoutes);

// 정적 파일 제공
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/views", express.static(path.join(__dirname, "views")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine 설정 (EJS 사용)
app.set("view engine", "ejs");

// 메인 페이지
app.get("/", (req, res) => {
  res.render("main/mainPage");
});

app.listen(port, () => {
  console.log(port + "포트에서 서버 실행 중...");
});

module.exports = upload;
