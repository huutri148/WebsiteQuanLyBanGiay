const express = require("express");
const router = express.Router();
const { getNguoiDung } = require("../controllers/NguoiDung.controller");

router.route("/").get(getNguoiDung);

module.exports = router;
