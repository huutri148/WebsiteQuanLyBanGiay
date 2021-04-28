const express = require("express");
const router = express.Router();
const {
} = require("../controllers/.controller");

router.route("/");
router.route("/:id");
module.exports = router;
