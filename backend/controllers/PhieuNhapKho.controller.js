const PhieuNhapKho = require("../models/PhieuNhapKho.model");

// @desc Fetch all PhieuNhapKho
// @route Get/api/recdockets
// @access Public
const getList = async (req, res) => {
  await PhieuNhapKho.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Bills not found ");
    }
  });
};

// @desc Fetch all PhieuNhapKho by id
// @route Get/api/recdockets/id
// @access Public
const getByID = async (req, res) => {
  const docketID = req.params.id;
  await PhieuNhapKho.GetByID(docketID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Add a docket
// @route   Post /api/recdockets
// @access  Public
const createDocket = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const docket = {
    MaNhaCungCap: req.body.MaNhaCungCap,
    MaNguoiDung: req.body.MaNguoiDung,
    NgayNhapKho: req.body.NgayNhapKho,
    TongTien: req.body.TongTien,
    GhiChu: req.body.GhiChu,
    ChiTietPhieuNhapKho: req.body.ChiTietPhieuNhapKho,
  };

  await PhieuNhapKho.Create(docket, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

// @desc    Update information of a docket
// @route   Patch /api/dockets/id
// @access  Public
const updateDocket = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }
  const docket = {
    SoPhieuNhapKho: parseInt(req.params.id),
    MaNhaCungCap: req.body.MaNhaCungCap,
    MaNguoiDung: req.body.MaNguoiDung,
    NgayNhapKho: req.body.NgayNhapKho,
    TongTien: req.body.TongTien,
    GhiChu: req.body.GhiChu,
    ChiTietPhieuNhapKho: req.body.ChiTietPhieuNhapKho,
  };

  await PhieuNhapKho.Edit(docket, (result) => {
    res.status(200).send({ message: "Edited successfully" });
  });
};

// @desc Fetch all PhieuNhapKho by id
// @route Get/api/recdockets/id
// @access Public
const deleteDocket = async (req, res) => {
  const docketID = req.params.id;
  await PhieuNhapKho.Delete(docketID, (result) => {
    if (result) {
      res.status(200).send({message:"Deleted Successfully"});
    } else {
      res.status(404);
    }
  });
};
module.exports = { getList, createDocket, updateDocket, deleteDocket, getByID };
