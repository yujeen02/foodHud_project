const express = require("express");
const bookmarkController = require("../controller/heartController");
const router = express.Router();

router.post("/toggle", bookmarkController.toggleBookmark);
router.get("/", bookmarkController.getBookmarks);

module.exports = router;
