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

module.exports = {
  allData,
  getOne,
};
