const NguoiDung = require("../models/NguoiDung.model");
const jwtHelper = require("../helper/jwt.helper");
let tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

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

  await NguoiDung.login(data, async (result) => {
    if (result) {
      try {
        const user = result;
        const userInfo = {
          TenDangNhap: user.TenDangNhap,
          MaChucVu: user.MaChucVu,
          Avatar: user.Avatar,
          MaNguoiDung: user.MaNguoiDung,
          SDT: user.SDT,
          Email: user.Email,
        };
        //if login success, create refresh token
        const accessToken = await jwtHelper.generateToken(
          user,
          accessTokenSecret,
          accessTokenLife
        );

        const refreshToken = await jwtHelper.generateToken(
          user,
          refreshTokenSecret,
          refreshTokenLife
        );
        tokenList[refreshToken] = { accessToken, refreshToken };

        return res.status(200).json({ accessToken, refreshToken, userInfo });
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  });
};
const refreshToken = async (req, res) => {
  const refreshTokenFromClient = req.body.refreshToken;

  if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
    try {
      const decoded = await jwtHelper.verifyToken(
        refreshTokenFromClient,
        refreshTokenSecret
      );

      const userData = decoded.data;

      const accessToken = await jwtHelper.generateToken(
        userData,
        accessTokenSecret,
        accessTokenLife
      );

      return res.status(200).json({ accessToken });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

const authenUserWithToken = async (req, res) => {
  const data = req.jwtDecoded.data;
  try {
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getList,
  getUserByID,
  registerUser,
  authenUser,
  refreshToken,
  authenUserWithToken,
};
