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
// get permisions
ChucVu.GetPermissions = function (MaChucVu, callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format( `CALL USP_GetListPhanQuyenById(${MaChucVu});`);

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      callBack(results[0]);
    }
  });
};
// Add permisions
ChucVu.AddPermissions = function (data, result) {
  var conn = db.getConnection();
  var query = `CALL USP_XoaTrangPhanQuyen(${data.MaChucVu})`;
  conn.query(query, function await(err, res) {
    if (err)
      console.log(err);
    else 
    {
      data.ListPhanQuyen.map(function await(permision) {
        let qr = sqlString.format( `CALL USP_ThemPhanQuyen(${data.MaChucVu},${permision.MaQuyen});`);
        conn.query(qr, (error, response) => {
          if (error)
            console.log(error); 
        });
      });
      result(res[0]);
    }
  });
}
// Get all permisions
ChucVu.GetAllPermissions = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format( "CALL USP_GetListQuyen();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      callBack(results[0]);
    }
  });
};
module.exports = ChucVu;
