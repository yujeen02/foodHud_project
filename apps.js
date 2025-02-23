const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const port = 3000;

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

// 저장 라우터 추가
const saveRoutes = require("./route/saveRoute");
app.use("/save", saveRoutes);

// main 라우터 추가
const mainRoutes = require("./route/mainRoute");
app.use("/", mainRoutes);

const heartRoutes = require("./route/heartRoute");
app.use("/", heartRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공
app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/views", express.static(path.join(__dirname, "views")));
app.use("/images", express.static(path.join(__dirname, "images")));

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
