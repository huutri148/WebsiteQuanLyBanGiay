const express = require("express");
const router = express.Router();
const {
  getList,
  getUserByID,
  registerUser,
  authenUser,
  refreshToken,
  authenUserWithToken,
  getCustomers,
  getEmployees,
} = require("../controllers/NguoiDung.controller");
const { isAuth } = require("../middelwares/auth.middleware");
router.route("/").get(getList).post(registerUser);
router.route("/customers").get(getCustomers);
router.route("/employees").get(getEmployees);
router.route("/login").post(authenUser);
router.route("/:id").get(getUserByID);
router.use(isAuth);
router.route("/login/token").get(authenUserWithToken);
module.exports = router;
