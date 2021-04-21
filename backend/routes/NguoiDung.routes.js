const express = require("express");
const router = express.Router();
const {
  getList,
  getUserByID,
  registerUser,
} = require("../controllers/NguoiDung.controller");

router.route("/").get(getList).post(registerUser);

router.route("/:id").get(getUserByID);

module.exports = router;
