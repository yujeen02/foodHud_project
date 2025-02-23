const savemodel = require("../model/saveModel");

//등록 페이지 테이블
const getAllData = async (req, res) => {
  const food = await savemodel.allData();
  res.render("save", { food });
};

//등록
const createTest = async (req, res) => {
  const images = {
    image: `/uploads/${req.files["image"][0].filename}`,
    subImage1: `/uploads/${req.files["subImage1"][0].filename}`,
    subImage2: `/uploads/${req.files["subImage2"][0].filename}`,
  };
  console.log(images);
  const createData = await savemodel.postData({ ...req.body, ...images });
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

// 수정
const dataUpdate = async (req, res) => {
  try {
    console.log("수정 요청 받은 데이터:", req.body);
    console.log("업로드된 파일들:", req.files);

    // 기존 데이터 가져오기
    const existingData = await savemodel.getOne(req.params.id);

    if (!existingData.length) {
      return res
        .status(404)
        .json({ error: "해당 ID의 데이터를 찾을 수 없습니다." });
    }

    // 이미지 경로 설정
    const imagePath = req.files["image"]
      ? `/uploads/${req.files["image"][0].filename}`
      : existingData[0].image;

    const subImage1Path = req.files["subImage1"]
      ? `/uploads/${req.files["subImage1"][0].filename}`
      : existingData[0].subImage1;

    const subImage2Path = req.files["subImage2"]
      ? `/uploads/${req.files["subImage2"][0].filename}`
      : existingData[0].subImage2;

    console.log("저장될 이미지 경로:", {
      imagePath,
      subImage1Path,
      subImage2Path,
    });

    // 데이터 업데이트 실행
    await savemodel.updateRow({
      ...req.body,
      id: req.params.id,
      image: imagePath,
      subImage1: subImage1Path,
      subImage2: subImage2Path,
    });

    res.status(200).json({ message: "수정 성공" });
  } catch (error) {
    console.error("수정 실패:", error);
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
