const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const NhaCungCap = {};

NhaCungCap.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataNhaCungCap = [data.TenNhaCungCap, data.SDT, data.DiaChi, data.Email];

  var queryString = sqlString.format(
    "CALL USP_ThemNhaCungCap(?,?,?,?);",
    dataNhaCungCap
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created NhaCungCap successfully`);
      result(res[0]);
    }
  });
};

NhaCungCap.GetByID = (maNhaCungCap, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetNhaCungCapByID(${maNhaCungCap});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Supplier:".yellow.bold, res[0]);
      callBack(res[0]);
    }
  });
};
// Fetch all NhaCungCap in DataBase
NhaCungCap.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListNhaCungCap();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      callBack(results[0]);
    }
  });
};
NhaCungCap.Edit = async function (data, result) {
  var conn = db.getConnection();
  var dataNhaCungCap = [
    data.MaNhaCungCap,
    data.TenNhaCungCap,
    data.SDT,
    data.DiaChi,
    data.Email,
  ];

  var queryString = sqlString.format(
    "CALL USP_CapNhatThongTinNhaCungCap(?,?,?,?,?);",
    dataNhaCungCap
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Updated supplier ${data.MaNhaCungCap} successfully`);
      result(res[0]);
    }
  });
};
NhaCungCap.Delete = (maNhaCungCap, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_XoaNhaCungCap(${maNhaCungCap});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Delete Supplier:".yellow.bold);
      callBack(res);
    }
  });
};
module.exports = NhaCungCap;
