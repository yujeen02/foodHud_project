const mysql = require("mysql2/promise");

// DB 연결
const pool = mysql.createPool({
  host: "localhost", // DB가 설치된 호스트 IP 주소
  user: "root", // DB 접속 유저 이름
  password: "korizon5479@@", // DB 접속 비밀번호
  database: "foodhub", // DB 이름
});

// 데이터 전부 가져오기
const allData = async () => {
  const query = "SELECT * FROM foodlist";
  const [rows] = await pool.query(query);
  console.log(rows);
  return rows;
};

// 해당하는 데이터 하나만 가져오기
const getOne = async (userId) => {
  const query = `SELECT * FROM foodlist where id = ${userId} `;
  const [rows] = await pool.query(query);
  return rows;
};

//등록하기
const postData = async (data, imagePath) => {
  const query = `
      INSERT INTO foodlist (image, resName, foodName, price, comment, address, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
    imagePath,
    data.resName,
    data.foodName,
    data.price,
    data.comment,
    data.address,
    data.date,
  ];

  const [result] = await pool.query(query, values);
  return result;
};

// 해당 아이디를 가진 row 삭제
const deleteRow = async (id) => {
  const query = `DELETE FROM foodlist where id = ${Number(id)} `;
  try {
    await pool.query(query, [id]);
  } catch (e) {
    console.log("삭제 실패");
  }
};

//해당아이디를 가진 데이터 수정
const updateRow = async (data) => {
  const query =
    "INSERT INTO foodlist (image, resName, foodName, price, comment, address, createdAt) VALUES ( ?, ?, ?, ?, ?, ?, ?)";
  try {
    await pool.query(query, [
      imagePath,
      data.resName,
      data.foodName,
      data.price,
      data.comment,
      data.address,
      data.date,
    ]);
  } catch (e) {
    console.log("삭제 실패");
  }
};

module.exports = {
  allData,
  getOne,
  postData,
  deleteRow,
  updateRow,
};
