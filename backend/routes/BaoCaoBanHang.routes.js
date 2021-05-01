const express = require("express");
const router = express.Router();
const {
createReport
} = require("../controllers/BaoCaoBanHang.controller");

router.route("/").post(createReport);
module.exports = router;
