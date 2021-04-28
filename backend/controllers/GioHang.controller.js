const GioHang = require("../models/PhieuBanHang.model");

// @desc Fetch all GioHang 
// @route Get/api/bills
// @access Public
const getList = async (req, res) => {
  await GioHang.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Product not found ");
    }
  });
};

// @desc Fetch all GioHang by id
// @route Get/api/bills/id
// @access Public
const getByID = async (req, res) => {
  const sanPhamID = req.params.id;
  await GioHang.GetByID(sanPhamID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Add a  bills 
// @route   Post /api/bills
// @access  Public
const createBill= async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const bill= {
    MaNguoiDung: req.body.MaNguoiDung,
    MaKhachHang: req.body.MaKhachHang,
    NgayBan: req.body.NgayBan,
    PhuongThucThanhToan: req.body.PhuongThucThanhToan,
    TongTien: req.body.TongTien,
    GhiChu: req.body.GhiChu,
    ChiTietGioHang: req.body.ChiTietPhieuBanHang
  };

  await GioHang.Create(bill, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

// @desc    Update information of a bill 
// @route   Patch /api/bills/id
// @access  Public
const updateBill= async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }
  const bill = {
    SoGioHang: req.body.SoPhieuBanHang,
    MaNguoiDung: req.body.MaNguoiDung,
    MaKhachHang: req.body.MaKhachHang,
    NgayBan: req.body.NgayBan,
    PhuongThucThanhToan: req.body.PhuongThucThanhToan,
    TongTien: req.body.TongTien,
    GhiChu: req.body.GhiChu,
    ChiTietGioHang: req.body.ChiTietPhieuBanHang
  };

  await GioHang.Edit( bill, (result) => {
    res.status(200).send({ message: "Edited successfully" });
  });
};

module.exports = {getList, createBill, updateBill,getByID};
