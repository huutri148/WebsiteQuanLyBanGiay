const HangSanXuat = require("../models/HangSanXuat.model");

// @desc Fetch all Brands
// @route Get/api/brands
// @access Public
const getList = async (req, res) => {
  await HangSanXuat.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Brand not found ");
    }
  });
};

// @desc Fetch Brand by id
// @route Get/api/brands/id
// @access Public
const getBrandByID = async (req, res) => {
  const brandID = req.params.id;
  await HangSanXuat.GetByID(brandID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Register a brand 
// @route   Post /api/brands
// @access  Public
const registerBrand = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const brand = {
    TenHangSanXuat: req.body.TenHangSanXuat,
  };

  await HangSanXuat.Create(brand, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};


// @desc    Update  branch
// @route   PATCH /api/brands/id
// @access  Public
const updateBrand = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const brand = {
    MaHangSanXuat: req.body.MaHangSanXuat,
    TenHangSanXuat: req.body.TenHangSanXuat,
  };

  await HangSanXuat.Edit(brand, (result) => {
    res.status(200).send({ message: "Updated successfully" });
  });
};

// @desc delete supplier by id
// @route DELETE/api/brands/id
// @access Public
const deleteBrand= async (req, res) => {
  const maHangSanXuat = req.params.id;
  await HangSanXuat.Delete(maHangSanXuat, (result) => {
    if (result) {
      res.status(200).send({message: "Deleted successfully"});
    } else {
      res.status(404);
    }
  });
};
module.exports = {
  getList,
  getBrandByID,
  registerBrand,
  updateBrand,
  deleteBrand,
};
