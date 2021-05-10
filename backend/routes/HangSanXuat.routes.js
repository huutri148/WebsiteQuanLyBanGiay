const express = require("express");
const router = express.Router();
const {
    getList,
    getBrandByID,
    registerBrand,
    updateBrand,
    deleteBrand,
} = require("../controllers/HangSanXuat.controller");

router.route("/").get(getList).post(registerBrand);
router
    .route("/:id")
    .get(getBrandByID)
    .delete(deleteBrand)
    .patch(updateBrand);
module.exports = router;
