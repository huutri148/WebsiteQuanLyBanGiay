const ChucVu = require("../models/ChucVu.model");

// @desc Fetch all duties
// @route Get/api/duties
// @access Public
const getList = async (req, res) => {
  await ChucVu.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Duty not found ");
    }
  });
};
// @desc    Register a duty
// @route   Post /api/duties
// @access  Public
const registerDuty = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const duty = {
    TenChucVu: req.body.TenChucVu,
  };

  await ChucVu.Create(duty, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

// @desc    Update  duty
// @route   PATCH /api/duties/id
// @access  Public
const updateDuty = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const duty = {
    TenChucVu: req.body.TenChucVu,
    MaChucVu: Number(req.params.id),
    ListPhanQuyen: req.body.ListPhanQuyen,
  };
  await ChucVu.Edit(duty, (result) => {
    res.status(200).send({ message: "Updated successfully" });
  });
};

// @desc delete duty by id
// @route DELETE/api/duties/id
// @access Public
const deleteDuty = async (req, res) => {
  const maChucVu = req.params.id;
  await ChucVu.Delete(maChucVu, (result) => {
    if (result) {
      res.status(200).send({ message: "Deleted successfully" });
    } else {
      res.status(404);
    }
  });
};
// @desc Fetch all duty's permissions
// @route Get/api/duties/permissions/id
// @access Public
const getListPermissions = async (req, res) => {
  const dutyID = req.params.id;
  await ChucVu.GetPermissions(dutyID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};
// @desc Fetch all permissions
// @route Get/api/duties/permissions
// @access Public
const getAllPermissions = async (req, res) => {
  await ChucVu.GetAllPermissions((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Duty not found ");
    }
  });
};
// @desc    Add permissions for duty
// @route   Post /api/duties/permissions
// @access  Public
const addPermissions = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }
  console.log(req.params.id)
  const permisions = {
    MaChucVu: req.params.id,
    ListPhanQuyen: req.body.ListPhanQuyen,
  };

  await ChucVu.AddPermissions(permisions, (result) => {
    res.status(200).send({ message: "Added successfully" });
  });
};
module.exports = {
  getList,getListPermissions,getAllPermissions,addPermissions, registerDuty, updateDuty, deleteDuty
};
