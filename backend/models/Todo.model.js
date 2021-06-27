const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const Todo = {};

Todo.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataTodo = [data.NoiDung];

  var queryString = sqlString.format("CALL USP_ThemTODO(?);", dataTodo);
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created Todo successfully`);
      result(res[0]);
    }
  });
};

Todo.GetByID = (maMau, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_GetTODOByID(${maMau});`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Todo:".yellow.bold, res[0]);
      callBack(res[0]);
    }
  });
};
// Fetch all Todo in DataBase
Todo.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListTODO();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      callBack(results[0]);
    }
  });
};
Todo.Edit = async function (data, result) {
  var conn = db.getConnection();
  var dataTodo = [data.MaTODO, data.NoiDung, data.isDone];

  var queryString = sqlString.format("CALL USP_CapNhatTODO(?,?,?);", dataTodo);
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Updated todo ${data.MaTODO} successfully`);
      result(res[0]);
    }
  });
};
//Todo: Find if it existed
Todo.Delete = (maTODO, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_XoaTODO(${maTODO});`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Delete Color:".yellow.bold);
      callBack(res);
    }
  });
};
module.exports = Todo;
