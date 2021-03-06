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
ChucVu.Create = async function (data, result) {
  var conn = db.getConnection();
  console.log(data);
  var queryString = sqlString.format(
    "CALL USP_ThemChucVu(?);",
    data.TenChucVu
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created duty ${data.TenChucVu} successfully`);
      result(res[0]);
    }
  });
};

ChucVu.Edit = async function (data, result) {
  var conn = db.getConnection();
  var dataChucVu = [data.MaChucVu, data.TenChucVu];
  var queryString = sqlString.format(
    "CALL USP_SuaChucVu(?,?);",
    dataChucVu
  );
  conn.query(queryString, (err, res) => {
    if (err)
      throw err;
    else 
    {
      var xquery = `CALL USP_XoaTrangPhanQuyen(${data.MaChucVu})`;
      conn.query(xquery, function await(xerr, xres) {
        if (xerr)
          console.log(xerr);
        else 
        {
          data.ListPhanQuyen.map(function await(permision) {
          var dataPhanQuyen = [data.MaChucVu, permision.MaQuyen];
          let qr = sqlString.format("CALL USP_ThemPhanQuyen(?,?);",dataPhanQuyen);
          conn.query(qr, (error, response) => {
            if (error)
              console.log(error); 
            });
          });
        }
      });
      console.log(`Updated duty ${data.MaChucVu} successfully`);
      result(res[0]);
    }
  });
};

ChucVu.Delete = (maChucVu, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_XoaChucVu(${maChucVu});`
  );
  conn.query(queryString, (err, res) => {
    if (err)
      throw err;
    else {
      console.log("Delete duty:".yellow.bold);
      callBack(res);
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
