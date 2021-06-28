const Chat = require("../models/Chat.model");

// @desc Fetch all Supppliers
// @route Get/api/suppliers
// @access Public
const getList = async (req, res) => {
  await Chat.Get((result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("Supplier not found ");
    }
  });
};

// @desc Fetch all Supplier by id
// @route Get/api/suppliers/id
// @access Public
const getChatRoomByID = async (req, res) => {
  const sessionID = req.params.id;
  await Chat.GetRoomByID(sessionID, (result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
    }
  });
};

// @desc    Register a new supplier
// @route   Post /api/suppliers
// @access  Public
const registerChatRoom = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }

  const roomData = {
    MaNguoiDung: req.body.MaNguoiDung,
    ChatTime: req.body.ChatTime,
    ChatText: req.body.ChatText,
  };

  await Chat.CreateChatRoom(roomData, (result) => {
    res.status(200).send({ message: "Created successfully" });
  });
};

const getListDetail = async (req, res) => {
  await Chat.GetAllDetail((result) => {
    if (result) {
      res.status(200).send(JSON.stringify(result));
    } else {
      res.status(404);
      throw new Error("not found ");
    }
  });
};
module.exports = {
  getList,
  getChatRoomByID,
  registerChatRoom,
  getListDetail,
};
