const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const Mau = {};

Mau.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataMau = [data.TenMau];

  var queryString = sqlString.format(
    "CALL USP_ThemMau(?);",
    dataMau
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created Color successfully`);
      result(res[0]);
    }
  });
};

Mau.GetByID = (maMau, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetMauByID(${maMau});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Color:".yellow.bold, res[0]);
      callBack(res[0]);
    }
  });
};
// Fetch all Mau in DataBase
Mau.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListMau();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      callBack(results[0]);
    }
  });
};
Mau.Edit = async function (data, result) {
  var conn = db.getConnection();
  var dataMau = [data.MaMau, data.TenMau];

  var queryString = sqlString.format(
    "CALL USP_CapNhatThongTinMau(?,?);",
    dataMau
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Updated supplier ${data.MaMau} successfully`);
      result(res[0]);
    }
  });
};
//Todo: Find if it existed
Mau.Delete = (maMau, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_XoaMau(${maMau});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Delete Color:".yellow.bold);
      callBack(res);
    }
  });
};
module.exports = Mau;
