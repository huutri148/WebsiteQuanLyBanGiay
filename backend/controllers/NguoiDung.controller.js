const NguoiDung = require("../models/NguoiDung.model");

const getNguoiDung = async (req, res) => {
  const users = await NguoiDung.findAll({});
  res.json(users);
};
module.exports = { getNguoiDung };
