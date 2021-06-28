const express = require("express");
const router = express.Router();
const {
  getList,
  getChatRoomByID,
  registerChatRoom,
  getListDetail,
} = require("../controllers/Chat.controller");

router.route("/").get(getList).post(registerChatRoom);
router.route("/details").get(getListDetail);
router.route("/:id").get(getChatRoomByID);
module.exports = router;
