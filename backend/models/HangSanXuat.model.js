const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const HangSanXuat = {};

HangSanXuat.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataHangSanXuat = [data.TenHangSanXuat];

  var queryString = sqlString.format(
    "CALL USP_ThemHangSanXuat(?);",
    dataHangSanXuat
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created Brand successfully`);
      result(res[0]);
    }
  });
};

HangSanXuat.GetByID = (maHangSanXuat, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetHangSanXuatByID(${maHangSanXuat});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Brand:".yellow.bold, res[0]);
      callBack(res[0]);
    }
  });
};
// Fetch all HangSanXuat in DataBase
HangSanXuat.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListHangSanXuat();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      callBack(results[0]);
    }
  });
};
HangSanXuat.Edit = async function (data, result) {
  var conn = db.getConnection();
  var dataHangSanXuat = [data.MaHangSanXuat, data.TenHangSanXuat];

  var queryString = sqlString.format(
    "CALL USP_CapNhatThongTinHangSanXuat(?,?);",
    dataHangSanXuat
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Updated supplier ${data.MaHangSanXuat} successfully`);
      result(res[0]);
    }
  });
};
//Todo: Find if it existed
HangSanXuat.Delete = (maHangSanXuat, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_XoaHangSanXuat(${maHangSanXuat});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Delete Brand:".yellow.bold);
      callBack(res);
    }
  });
};
module.exports = HangSanXuat;
