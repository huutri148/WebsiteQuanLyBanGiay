const express = require("express");
const router = express.Router();
const { getList,getListPermissions,getAllPermissions,addPermissions } = require("../controllers/ChucVu.controller");

router.route("/").get(getList);
router.route("/permissions").get(getAllPermissions);
router.route("/permissions/:id").get(getListPermissions).post(addPermissions);
module.exports = router;
