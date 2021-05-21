const Mau = require("../models/Mau.model");

// @desc Fetch all Colors
// @route Get/api/colors
// @access Public
const getList = async (req, res) => {
  await Mau.Get((result) => {
    if (result) {
      res.send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Color not found ");
    }
  });
};

// @desc Fetch Color by id
// @route Get/api/colors/id
// @access Public
const getColorByID = async (req, res) => {
  const colorID = req.params.id;
  await Mau.GetByID(colorID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Register a color 
// @route   Post /api/colors
// @access  Public
const registerColor = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const color = {
    TenMau: req.body.TenMau,
  };

  await Mau.Create(color, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};


// @desc    Update  branch
// @route   PATCH /api/colors/id
// @access  Public
const updateColor = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const color = {
    MaMau: req.body.MaMau,
    TenMau: req.body.TenMau,
  };

  await Mau.Edit(color, (result) => {
    res.status(200).send({ message: "Updated successfully" });
  });
};

// @desc delete supplier by id
// @route DELETE/api/colors/id
// @access Public
const deleteColor= async (req, res) => {
  const maMau = req.params.id;
  await Mau.Delete(maMau, (result) => {
    if (result) {
      res.status(200).send({message: "Deleted successfully"});
    } else {
      res.status(404);
    }
  });
};
module.exports = {
  getList,
  getColorByID,
  registerColor,
  updateColor,
  deleteColor,
};
