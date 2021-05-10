const express = require("express");
const router = express.Router();
const {
  getList,
  createPaymentVoucher,
  getByID,
} = require("../controllers/PhieuChi.controller");

router.route("/").get(getList).post(createPaymentVoucher);
router.route("/:id").get(getByID);
module.exports = router;
