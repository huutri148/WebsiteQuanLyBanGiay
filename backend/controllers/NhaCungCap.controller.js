const NhaCungCap = require("../models/NhaCungCap.model");

// @desc Fetch all Supppliers
// @route Get/api/suppliers
// @access Public
const getList = async (req, res) => {
  await NhaCungCap.Get((result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Supplier not found ");
    }
  });
};

// @desc Fetch all Supplier by id
// @route Get/api/suppliers/id
// @access Public
const getSupplierByID = async (req, res) => {
  const supplierID = req.params.id;
  await NhaCungCap.GetByID(supplierID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Register a new supplier
// @route   Post /api/suppliers
// @access  Public
const registerSuppiler = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const supplier = {
    TenNhaCungCap: req.body.TenNhaCungCap,
    SDT: req.body.SDT,
    DiaChi: req.body.DiaChi,
    Email: req.body.Email,
  };

  await NhaCungCap.Create(supplier, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

// @desc    Update  supplier
// @route   PATCH /api/suppliers/id
// @access  Public
const updateSupplier = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const supplier = {
    MaNhaCungCap: req.params.id,
    TenNhaCungCap: req.body.TenNhaCungCap,
    SDT: req.body.SDT,
    DiaChi: req.body.DiaChi,
    Email: req.body.Email,
  };

  await NhaCungCap.Edit(supplier, (result) => {
    res.status(200).send({ message: "Updated successfully" });
  });
};

// @desc delete supplier by id
// @route DELETE/api/suppliers/id
// @access Public
const deleteSupplier = async (req, res) => {
  const supplierID = req.params.id;
  await NhaCungCap.Delete(supplierID, (result) => {
    if (result) {
      res.status(200).send({message:"Deleted successfully"});
    } else {
      res.status(404);
    }
  });
};
module.exports = {
  getList,
  getSupplierByID,
  registerSuppiler,
  updateSupplier,
  deleteSupplier,
};
