const NguoiDung = require("../models/NguoiDung.model");

// @desc Fetch all Users
// @route Get/api/users
// @access Public
const getList = async (req, res) => {
  await NguoiDung.getAll((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("User not found ");
    }
  });
};

// @desc Fetch all User by id
// @route Get/api/users/id
// @access Public
const getUserByID = async (req, res) => {
  const userID = req.params.id;
  await NguoiDung.findById(userID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Register a new user
// @route   Post /api/users
// @access  Public
const registerUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const user = {
    TenNguoiDung: req.body.TenNguoiDung,
    TenDangNhap: req.body.TenDangNhap,
    MatKhau: req.body.MatKhau,
    MaChucVu: req.body.MaChucVu,
    SDT: req.body.SDT,
    DiaChi: req.body.DiaChi,
    Email: req.body.Email,
    Avatar: req.body.Avatar,
    IsDeleted: req.body.IsDeleted,
  };

  await NguoiDung.create(user, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authenUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const data = {
    TenDangNhap: req.body.TenDangNhap,
    MatKhau: req.body.MatKhau,
  };

  await NguoiDung.login(data, (result) => {
    res.status(200).send({ message: "Login successfully" });
  });
};

module.exports = { getList, getUserByID, registerUser, authenUser };
