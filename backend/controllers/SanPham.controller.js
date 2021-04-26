const Giay = require("../models/Giay.model");

// @desc Fetch all products
// @route Get/api/products
// @access Public
const getList = async (req, res) => {
  await Giay.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Product not found ");
    }
  });
};

// @desc Fetch all Giay by id
// @route Get/api/products/id
// @access Public
const getByID = async (req, res) => {
  const sanPhamID = req.params.id;
  await Giay.GetByID(sanPhamID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Add a new product
// @route   Post /api/products
// @access  Public
const createProduct = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const product = {
    TenGiay: req.body.TenGiay,
    MaHangSanXuat: req.body.MaHangSanXuat,
    MaMau: req.body.MaMau,
    GioiTinh: req.body.GioiTinh,
    Anh: req.body.Anh,
    MoTa: req.body.MoTa,
    TyLeLoiNhuan: req.body.TyLeLoiNhuan,
    DonGiaNhap: req.body.DonGiaNhap,
    Size: req.body.Size
  };


  await Giay.Create(product, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

// @desc    Update information of a product
// @route   Patch /api/products/id
// @access  Public
const updateProduct = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }
  const product = {
    MaGiay: req.params.id,
    TenGiay: req.body.TenGiay,
    MaHangSanXuat: req.body.MaHangSanXuat,
    MaMau: req.body.MaMau,
    GioiTinh: req.body.GioiTinh,
    Anh: req.body.Anh,
    MoTa: req.body.MoTa,
    TyLeLoiNhuan: req.body.TyLeLoiNhuan,
    DonGiaNhap: req.body.DonGiaNhap,
  };

  await Giay.Edit( product, (result) => {
    res.status(200).send({ message: "Edited successfully" });
  });
};

// @desc    Remove a product
// @route   Delete /api/products
// @access  Public
const removeProduct = async (req, res) => {
  const sanPhamID = req.body.MaGiay;
  await Giay.Delete(sanPhamID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

module.exports = {getList, createProduct, removeProduct, updateProduct,getByID};
