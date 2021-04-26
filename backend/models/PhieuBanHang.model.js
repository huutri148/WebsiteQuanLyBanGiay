const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const bcrypt = require("bcrypt");
const PhieuBanHang = {};

PhieuBanHang.create = async function (data, result) {
  var conn = db.getConnection();
};

PhieuBanHang.findById = (soPhieuBanHang, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_GetPhieuBanHang(${maNguoiDung})`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0].length) {
      console.log("Found user:".yellow.bold, res[0][0]);
      callBack(res[0][0]);
      return;
    }
  });
};

// Fetch all PhieuBanHang in DataBase
PhieuBanHang.getAll = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListPhieuBanHang();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }

    callBack(results[0]);
  });
};

module.exports = PhieuBanHang;
