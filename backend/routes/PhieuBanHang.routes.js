const express = require("express");
const router = express.Router();
const {
  getList,
  createBill,
  updateBill,
  getByID,
  getDetails
} = require("../controllers/PhieuBanHang.controller");

router.route("/").get(getList).post(createBill);
router.route("/:id").get(getByID).post(updateBill).patch(updateBill);
router.route("/details/:id").get(getDetails);
module.exports = router;
