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
const getList = async (req, res) => {
  await BaoCaoBanHang.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Reports not found ");
    }
  });
};
const getDetails = async (req, res) => {
  const id = req.params.id;
  await BaoCaoBanHang.GetDetails(id, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};
module.exports = { createReport, getList, getDetails };
