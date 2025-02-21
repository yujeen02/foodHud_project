const savemodel = require("../model/saveModel");

//등록 페이지 테이블
const getAllData = async (req, res) => {
  const food = await savemodel.allData();
  res.render("save", { food });
};

//등록
const createTest = async (req, res) => {
  const filename = req.file.filename;
  const imagePath = `/uploads/${filename}`;
  const createData = await savemodel.postData(req.body, imagePath);
  res.status(200).json({ message: "등록 성공", data: createData });
};

// 해당 아이디 삭제
const deleteData = async (req, res) => {
  await savemodel.deleteRow(req.params.id);
  res.send("200");
};

// 수정 페이지 이동
const moveWrite = async (req, res) => {
  const foodByMo = await savemodel.getOne(req.params.id);
  res.render("write", { foodByMo });
};

const dataUpdate = async (req, res) => {
  try {
    console.log("수정 요청 받은 데이터:", req.body);
    console.log("업로드된 파일:", req.file ? req.file.filename : "파일 없음");

    // 기존 데이터 가져오기
    const existingData = await savemodel.getOne(req.params.id);

    // 기존 이미지 경로 유지
    const filename = req.file
      ? req.file.filename
      : existingData[0].image.replace("/uploads/", "");
    const imagePath = `/uploads/${filename}`;

    console.log("저장될 이미지 경로:", imagePath);

    await savemodel.updateRow({ ...req.body, id: req.params.id }, imagePath);

    res.status(200).json({ message: "수정 성공" });
  } catch (error) {
    console.error("❌ 수정 실패:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 실행순서: control의 allData > model의 allData로 이동해서 가지고 옴 >
module.exports = {
  getAllData,
  createTest,
  deleteData,
  moveWrite,
  dataUpdate,
};
