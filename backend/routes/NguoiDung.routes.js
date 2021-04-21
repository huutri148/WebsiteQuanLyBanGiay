const express = require("express");
const router = express.Router();
const {
  getList,
  getUserByID,
  registerUser,
  authenUser,
} = require("../controllers/NguoiDung.controller");

router.route("/").get(getList).post(registerUser);

router.route("/:id").get(getUserByID);
router.route("/login").post(authenUser);

module.exports = router;
