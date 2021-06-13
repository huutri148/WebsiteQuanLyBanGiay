const express = require("express");
const router = express.Router();
const {
  getList,
  createOrder,
  updateOrder,
  getByID,
  removeOrder,
} = require("../controllers/PhieuDatHang.controller");

router.route("/").get(getList).post(createOrder);
router.route("/:id").get(getByID).delete(removeOrder).patch(updateOrder);
module.exports = router;
