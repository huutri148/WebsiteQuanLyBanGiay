const express = require("express");
const router = express.Router();
const {
  getList,
  createCart,
  removeCart,
  updateCart,
  getByID,
} = require("../controllers/GioHang.controller");

router.route("/").get(getList).post(createCart);
router.route("/:id").get(getByID).patch(updateCart).delete(removeCart);
module.exports = router;
