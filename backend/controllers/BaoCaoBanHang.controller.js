const BaoCaoBanHang = require("../models/BaoCaoBanHang.model");

// @desc    Add a new 
// @route   Post /api/baocaobanhang
// @access  Public
const createReport = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const data = {
    MaNguoiDung: req.body.MaNguoiDung,
    NgayBatDau: req.body.NgayBatDau,
    NgayKetThuc: req.body.NgayKetThuc,
  };

  await BaoCaoBanHang.Create(data, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

module.exports = { createReport };
