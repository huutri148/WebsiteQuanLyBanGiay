const express = require("express");
const router = express.Router();
const { getList } = require("../controllers/Size.controller");

router.route("/").get(getList);
module.exports = router;
