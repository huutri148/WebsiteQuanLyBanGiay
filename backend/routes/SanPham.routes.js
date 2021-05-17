const express = require("express");
const router = express.Router();
const {
  getList,
  createProduct,
  removeProduct,
  updateProduct,
  getByID,
  getSizeByID,
} = require("../controllers/SanPham.controller");

router.route("/").get(getList).post(createProduct).delete(removeProduct);
router.route("/:id").get(getByID).patch(updateProduct);
router.route("/:id/sizes").get(getSizeByID);
module.exports = router;
