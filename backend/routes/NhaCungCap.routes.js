const express = require("express");
const router = express.Router();
const {
    getList,
    getSupplierByID,
    registerSuppiler,
    updateSupplier,
    deleteSupplier,
} = require("../controllers/NhaCungCap.controller");

router.route("/").get(getList).post(registerSuppiler);
router
    .route("/:id")
    .get(getSupplierByID)
    .delete(deleteSupplier)
    .patch(updateSupplier);
module.exports = router;
