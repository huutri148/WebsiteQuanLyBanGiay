const express = require("express");
const router = express.Router();
const { getList, getUserByID } = require("../controllers/NguoiDung.controller");

router.route("/").get(getList);

router.route("/:id").get(getUserByID);

module.exports = router;
