const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const Size = {};

// Fetch all Size in DataBase
Size.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListSize();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }
    callBack(results[0]);
  });
};
module.exports = Size;
