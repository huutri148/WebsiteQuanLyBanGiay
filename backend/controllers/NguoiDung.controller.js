const { NguoiDung } = require("../models/NguoiDung.model");

// @desc Fetch all Users
// @route Get/api/users
// @access Public
const getList = async (req, res) => {
  const users = await NguoiDung.findAll();
  res.json(users);
};

// @desc Fetch all User by id
// @route Get/api/users/id
// @access Public
const getUserByID = async (req, res) => {
  const userID = req.params.id;
  const user = await NguoiDung.findOne({
    where: { MaNguoiDung: userID },
  });
  res.json(user);
};

module.exports = { getList, getUserByID };
