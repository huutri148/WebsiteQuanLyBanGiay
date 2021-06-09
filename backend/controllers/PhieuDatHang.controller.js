const PhieuDatHang = require("../models/PhieuDatHang.model");

// @desc Fetch all PhieuDatHang
// @route Get/api/orders
// @access Public
const getList = async (req, res) => {
  await PhieuDatHang.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Orders not found ");
    }
  });
};

// @desc Fetch all PhieuDatHang by id
// @route Get/api/orders/id
// @access Public
const getByID = async (req, res) => {
  const orderID = req.params.id;
  await PhieuDatHang.GetByID(orderID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Add a  orders
// @route   Post /api/orders
// @access  Public
const createOrder = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const order = {
    MaNguoiDung: req.body.MaNguoiDung,
    MaNhaCungCap: req.body.MaNhaCungCap,
    NgayLap: req.body.NgayLap,
    TrangThai: req.body.TrangThai,
    ChiTietPhieuDatHang: req.body.ChiTietPhieuDatHang,
  };

  await PhieuDatHang.Create(order, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

// @desc    Update information of a order
// @route   Patch /api/orders/id
// @access  Public
const updateOrder = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }
  const order = {
    SoPhieuDatHang: req.body.SoPhieuDatHang,
    MaNguoiDung: req.body.MaNguoiDung,
    MaNhaCungCap: req.body.MaNhaCungCap,
    NgayLap: req.body.NgayLap,
    TrangThai: req.body.TrangThai,
  };

  await PhieuDatHang.Edit(order, (result) => {
    res.status(200).send({ message: "Edited successfully" });
  });
};

// @desc    Remove a order
// @route   Delete /api/orders
// @access  Public
const removeOrder = async (req, res) => {
  const orderID = req.params.id;
  await PhieuDatHang.Delete(orderID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

module.exports = { getList, createOrder, updateOrder, getByID, removeOrder };
