const express = require("express");
const router = express.Router();
const {
  getList,
  getUserByID,
  registerUser,
  authenUser,
  refreshToken,
  authenUserWithToken,
} = require("../controllers/NguoiDung.controller");
const { isAuth } = require("../middelwares/auth.middleware");
router.route("/").get(getList).post(registerUser);
router.route("/login").post(authenUser);
router.route("/:id").get(getUserByID);

router.use(isAuth);
router.route("/login/token").get(authenUserWithToken);
module.exports = router;
