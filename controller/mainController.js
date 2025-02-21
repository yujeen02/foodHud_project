const mainmodel = require("../model/mainModel");

// main 화면에 등록
const getAllData = async (req, res) => {
  const food = await mainmodel.allData();
  res.render("main/mainPage", { food });
};

// 하나
const getFoodById = async (req, res) => {
  const food = await mainmodel.getOne(req.params.id);
  res.render("main/detailPage", { food });
};

module.exports = {
  getAllData,
  getFoodById,
};
