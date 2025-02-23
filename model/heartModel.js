const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "korizon5479@@",
  database: "foodhub",
});

// 📌 북마크 추가/삭제 기능
const toggleBookmark = async (foodListId) => {
  const checkQuery = `SELECT * FROM heartlist WHERE foodListId = ?`;
  const [exists] = await pool.query(checkQuery, [foodListId]);

  if (exists.length > 0) {
    // 북마크 삭제
    const deleteQuery = `DELETE FROM heartlist WHERE foodListId = ?`;
    await pool.query(deleteQuery, [foodListId]);
    return { message: "북마크에서 삭제되었습니다." };
  } else {
    // 북마크 추가
    const insertQuery = `INSERT INTO heartlist (foodListId) VALUES (?)`;
    await pool.query(insertQuery, [foodListId]);
    return { message: "북마크에 추가되었습니다." };
  }
};

// 📌 북마크된 음식 가져오기
const getBookmarks = async () => {
  const query = `
    SELECT foodlist.* FROM foodlist 
    JOIN heartlist ON foodlist.id = heartlist.foodListId
  `;
  const [rows] = await pool.query(query);
  return rows;
};

module.exports = {
  toggleBookmark,
  getBookmarks,
};
