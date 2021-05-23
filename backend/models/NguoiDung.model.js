const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const bcrypt = require("bcrypt");

const NguoiDung = {};

NguoiDung.create = async function (data, result) {
  var conn = db.getConnection();
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.MatKhau, salt);
  var dataNguoiDung = [
    data.TenNguoiDung,
    data.TenDangNhap,
    password,
    data.MaChucVu,
    data.SDT,
    data.DiaChi,
    data.Email,
    data.Avatar,
    data.IsDeleted,
  ];

  var queryString = sqlString.format(
    "CALL USP_ThemNguoiDung(?,?,?,?,?,?,?,?,?);",
    dataNguoiDung
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created user ${data.TenDangNhap} successfully`);
      result(res[0]);
    }
  });
};

NguoiDung.findById = (maNguoiDung, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_GetNguoiDung(${maNguoiDung})`);
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

// Fetch all user in DataBase
NguoiDung.getAll = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListNguoiDung();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }

    callBack(results[0]);
  });
};

NguoiDung.login = async function (data, callBack) {
  var conn = db.getConnection();

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.MatKhau, salt);

  const login = [data.TenDangNhap, password];
  var queryString = sqlString.format("CALL USP_DangNhap(?,?);", login);

  conn.query(queryString, async (err, results) => {
    if (err) {
      throw err;
    }
    if (results[0][0]) {
      const isMatch = await bcrypt.compare(data.MatKhau, results[0][0].MatKhau);
      if (isMatch) {
        callBack(results[0][0]);
      }
    }
  });
};
module.exports = NguoiDung;
