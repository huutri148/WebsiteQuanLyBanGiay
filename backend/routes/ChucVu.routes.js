const express = require("express");
const router = express.Router();
const { getList,getListPermissions,getAllPermissions,addPermissions, registerDuty, updateDuty, deleteDuty } = require("../controllers/ChucVu.controller");

router.route("/").get(getList).post(registerDuty);
router.route("/:id").delete(deleteDuty).patch(updateDuty);
router.route("/permissions").get(getAllPermissions);
router.route("/permissions/:id").get(getListPermissions).post(addPermissions);
module.exports = router;
