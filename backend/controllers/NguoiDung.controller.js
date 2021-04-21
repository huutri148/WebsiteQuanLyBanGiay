const { NguoiDung } = require("../models/NguoiDung.model");

// @desc Fetch all Users
// @route Get/api/users
// @access Public
const getList = async (req, res) => {
  await NguoiDung.findAll()
    .then((usersRes) => {
      if (!usersRes) return res.status(404).json({ error: "No user" });
      res.status(200).json(usersRes);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

// @desc Fetch all User by id
// @route Get/api/users/id
// @access Public
const getUserByID = async (req, res) => {
  const userID = req.params.id;
  await NguoiDung.findOne({
    where: { MaNguoiDung: userID },
  })
    .then((userRes) => {
      if (!userRes) return res.status(404).json({ error: "User not found" });
      return res.json(userRes);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

// @desc    Register a new user
// @route   Post /api/users
// @access  Public
const registerUser = async (req, res) => {
  const userData = {
    TenNguoiDung: req.body.TenNguoiDung,
    TenDangNhap: req.body.TenDangNhap,
    MatKhau: req.body.MatKhau,
    Email: req.body.Email,
    SDT: req.body.SDT,
    DiaChi: req.body.DiaChi,
    IsDeleted: req.body.IsDeleted,
  };

  const userExists = await NguoiDung.findOne({
    where: {
      SDT: userData.SDT,
    },
  });

  if (userExists) {
    return res.status(400).json("User already exists!");
  }

  // send back token
  const user = await NguoiDung.create(userData)
    .then((userRes) => {
      res.status(200).json(userRes);
      console.log(userRes);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authenUser = async (req, res) => {
  const userData = {
    TenDangNhap: req.body.TenDangNhap,
    MatKhau: req.body.MatKhau,
  };

  const user = await NguoiDung.findOne({ TenNguoiDung: userData.TenDangNhap });
};

module.exports = { getList, getUserByID, registerUser };
