const express = require("express");
const router = express.Router();
const {
    getList,
    getColorByID,
    registerColor,
    updateColor,
    deleteColor,
} = require("../controllers/Mau.controller");

router.route("/").get(getList).post(registerColor);
router
    .route("/:id")
    .get(getColorByID)
    .delete(deleteColor)
    .patch(updateColor);
module.exports = router;
