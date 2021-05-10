const PhieuChi = require("../models/PhieuChi.model");

// @desc Fetch all PhieuChi
// @route Get/api/paymentvouchers
// @access Public
const getList = async (req, res) => {
  await PhieuChi.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Payment Voucher not found ");
    }
  });
};

// @desc Fetch all PhieuChi by id
// @route Get/api/paymentvouchers/id
// @access Public
const getByID = async (req, res) => {
  const voucherID = req.params.id;
  await PhieuChi.GetByID(voucherID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Add a  paymentvouchers
// @route   Post /api/paymentvouchers
// @access  Public
const createPaymentVoucher= async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const paymentVoucher = {
    MaNguoiDung: req.body.MaNguoiDung,
    SoPhieuNhapKho: req.body.SoPhieuNhapKho,
    NgayLap: req.body.NgayLap,
    TongTien: req.body.TongTien,
    GhiChu: req.body.GhiChu,
  };

  await PhieuChi.Create(paymentVoucher, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};


module.exports = { getList, createPaymentVoucher, getByID };
