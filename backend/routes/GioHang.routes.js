const express = require("express");
const router = express.Router();
const {
  getList,
  createCart,
  removeCart,
  updateCart,
  getByID,
  getDetails,
} = require("../controllers/GioHang.controller");

router.route("/").get(getList).post(createCart);
router.route("/:id").get(getByID).patch(updateCart).delete(removeCart);
router.route("/details/:id").get(getDetails);
module.exports = router;
