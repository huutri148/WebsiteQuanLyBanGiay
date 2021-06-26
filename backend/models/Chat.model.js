const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const Chat = {};

Chat.CreateChatRoom = async function (data, result) {
  var conn = db.getConnection();
  var dataChat = [data.MaNguoiDung, data.ChatTime, data.ChatText];

  var queryString = sqlString.format("CALL USP_ThemChatRoom(?,?,?);", dataChat);
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created Room successfully`);
      result(res[0]);
    }
  });
};

Chat.GetRoomByID = (maPhong, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetNoiDungChatRoom(${maPhong});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Room:".yellow.bold, res[0]);
      callBack(res[0]);
    }
  });
};

// Fetch Chat in DataBase
Chat.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListChatRoom();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      callBack(results[0]);
    }
  });
};

Chat.GetAllDetail = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListDetailRoom();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      callBack(results[0]);
    }
  });
};

Chat.Update = async function (data, result) {
  var conn = db.getConnection();
  var dataChat = [
    data.MaPhong,
    data.MessageTime,
    data.MessageContent,
    data.IsFromAdmin,
  ];

  var queryString = sqlString.format(
    "CALL USP_ThemNoiDungChatRoom(?,?,?,?);",
    dataChat
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Updated RoomChat ${data.MaPhong} successfully`);
      result(res[0]);
    }
  });
};

module.exports = Chat;
