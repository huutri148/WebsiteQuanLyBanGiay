const express = require("express");
const router = express.Router();
const {
  getList,
  createDocket,
  updateDocket,
  deleteDocket,
  getByID,
} = require("../controllers/PhieuNhapKho.controller");

router.route("/").get(getList).post(createDocket);
router.route("/:id").get(getByID).patch(updateDocket).delete(deleteDocket);
module.exports = router;
