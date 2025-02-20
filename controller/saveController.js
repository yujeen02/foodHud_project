const mainmodel = require("../model/saveModel");

//등록 페이지 테이블
const getAllData = async (req, res) => {
  const food = await mainmodel.allData();
  res.render("save", { food });
};

//등록
const createTest = async (req, res) => {
  const filename = req.file.filename;
  const imagePath = `/uploads/${filename}`;
  const createData = await mainmodel.postData(req.body, imagePath);
  res.status(200).json({ message: "등록 성공", data: createData });
};

// 해당 아이디 삭제
const deleteData = async (req, res) => {
  await mainmodel.deleteRow(req.params.id);
  res.send("200");
};

// 수정 페이지 이동
const moveWrite = async (req, res) => {
  const foodByMo = await mainmodel.getOne(req.params.id);
  res.render("write", { foodByMo });
};

// 데이터 업데이트
const dataUpdate = async (req, res) => {
  await mainmodel.updateRow(req.body);
  res.send("200");
};

// 실행순서: control의 allData > model의 allData로 이동해서 가지고 옴 >
module.exports = {
  getAllData,
  createTest,
  deleteData,
  moveWrite,
  dataUpdate,
};
