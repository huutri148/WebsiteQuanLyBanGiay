const GioHang = require("../models/GioHang.model");

// @desc Fetch all carts
// @route Get/api/carts
// @access Public
const getList = async (req, res) => {
  await GioHang.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Cart not found ");
    }
  });
};

// @desc Fetch all GioHang by id
// @route Get/api/carts/id
// @access Public
const getByID = async (req, res) => {
  const gioHangID = req.params.id;
  await GioHang.GetByID(gioHangID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Add a new gioHang
// @route   Post /api/carts
// @access  Public
const createCart = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const cart = {
    MaNguoiDung: req.body.MaNguoiDung,
    PhuongThucThanhToan: req.body.PhuongThucThanhToan,
    ChiTietGioHang: req.body.ChiTietGioHang,
  };

  await GioHang.Create(cart, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

// @desc    Update information of a cart
// @route   Patch /api/carts/id
// @access  Public
const updateCart = async (req, res) => {
  const gioHangID = req.params.id;

  await GioHang.Edit(gioHangID, (result) => {
    res.status(200).send({ message: "Edited successfully" });
  });
};

// @desc    Remove a cart
// @route   Delete /api/carts
// @access  Public
const removeCart = async (req, res) => {
  const cartID = req.params.id;
  await GioHang.Delete(cartID, (result) => {
    if (result) {
      res.status(200).send({ message: "Deleted Successfully" });
    } else {
      res.status(404);
    }
  });
};

// @desc    get cart detail
// @route   Get /api/carts/details/:id
// @access  Public
const getDetails = async (req, res) => {
  const cartID = req.params.id;
  await GioHang.GetDetails(cartID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

module.exports = {
  getList,
  createCart,
  removeCart,
  updateCart,
  getByID,
  getDetails,
};
