const bookmarkModel = require("../model/heartModel");

// 📌 북마크 추가/삭제
const toggleBookmark = async (req, res) => {
  try {
    const { foodListId } = req.body;
    if (!foodListId) {
      return res.status(400).json({ error: "foodListId가 필요합니다." });
    }
    const result = await bookmarkModel.toggleBookmark(foodListId);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ 북마크 처리 실패:", error);
    res.status(500).json({ error: "서버 오류" });
  }
};

// 📌 북마크된 음식 목록 가져오기
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await bookmarkModel.getBookmarks();
    res.render("bookmarks", { bookmarks });
  } catch (error) {
    console.error("❌ 북마크 목록 로드 실패:", error);
    res.status(500).send("서버 오류");
  }
};

module.exports = {
  toggleBookmark,
  getBookmarks,
};
