const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const ChucVu = {};

// Fetch all ChucVu in DataBase
ChucVu.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListChucVu();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      callBack(results[0]);
    }
  });
};

module.exports = ChucVu;
