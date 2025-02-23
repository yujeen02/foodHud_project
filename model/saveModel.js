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
const getOne = async (id) => {
  const query = `SELECT * FROM foodlist where id = ${id} `;
  const [rows] = await pool.query(query);
  return rows;
};

//등록하기
const postData = async (data) => {
  const query = `
      INSERT INTO foodlist (image, subImage1, subImage2, resName, foodName, price, comment, address, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
    data.image,
    data.subImage1,
    data.subImage2,
    data.resName,
    data.foodName,
    data.price,
    data.comment,
    data.address,
    data.rating,
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
  try {
    const query = `
      UPDATE foodlist 
      SET image = ?, subImage1 = ?, subImage2 = ?, resName = ?, foodName = ?, price = ?, comment = ?, address = ?, rating = ?
      WHERE id = ?
    `;
    const values = [
      data.image,
      data.subImage1,
      data.subImage2,
      data.resName,
      data.foodName,
      data.price,
      data.comment,
      data.address,
      data.rating,
      data.id,
    ];

    console.log("업데이트할 데이터:", values);
    await pool.query(query, values);
  } catch (e) {
    console.error("❌ 업데이트 실패:", e);
    throw e;
  }
};

module.exports = {
  allData,
  getOne,
  postData,
  deleteRow,
  updateRow,
};
