const express = require("express");
const router = express.Router();
const {
    getList,
    createProduct,
    removeProduct,
    updateProduct,
    getByID
} = require("../controllers/SanPham.controller");

router.route("/").get(getList).post(createProduct).patch(removeProduct);
router.route("/:id").get(getByID).patch(updateProduct);
module.exports = router;
