const express = require("express");
const router = express.Router();
const {
createReport,
getList,
getDetails,
} = require("../controllers/BaoCaoBanHang.controller");

router.route("/").get(getList).post(createReport);
router.route("/details/:id").get(getDetails);
module.exports = router;
