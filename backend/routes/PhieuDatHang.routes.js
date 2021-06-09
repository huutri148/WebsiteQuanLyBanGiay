const express = require("express");
const router = express.Router();
const {
  getList,
  createOrder,
  updateOrder,
  getByID,
  removeOrder,
} = require("../controllers/PhieuDatHang.controller");

router.route("/").get(getList).post(createOrder).patch(updateOrder);
router.route("/:id").get(getByID).delete(removeOrder);
module.exports = router;
