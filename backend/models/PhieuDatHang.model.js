const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const PhieuDatHang = {};

PhieuDatHang.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataPhieuDatHang = [
    data.MaNguoiDung,
    data.MaNhaCungCap,
    data.NgayLap,
    data.ChiTietPhieuDatHang,
  ];

  var queryString = sqlString.format(
    "CALL USP_ThemPhieuDatHang(?,?,?,?);",
    dataPhieuDatHang
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created PhieuDatHang successfully`);
      data.ChiTietPhieuDatHang.map(function await(chiTietPhieuBanHang) {
        let qr = sqlString.format(
          `CALL USP_ThemChiTietPhieuDatHang();`
        );
        conn.query(qr, (error, response) => {
          if (error) {
            console.log(error);
          } else {
          }
        });
      });
      result(res[0]);
    }
  });
};

PhieuDatHang.GetByID = (soPhieuDatHang, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetPhieuDatHangByID(${soPhieuDatHang});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Order:".yellow.bold, res[0]);
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetPhieuDatHangByMaKhachHang(${maKhachHang});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Order:".yellow.bold, res[0]);
      callBack(res[0]);
    }
  });
};
// Fetch all PhieuDatHang in DataBase
PhieuDatHang.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListPhieuDatHang();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }

    callBack(results[0]);
  });
};
PhieuDatHang.Edit = async function (data, result) {
  var conn = db.getConnection();
  var dataPhieuDatHang = [
    data.SoPhieuDatHang,
    data.MaNguoiDung,
    data.MaNhaCungCap,
    data.NgayLap,
    data.ChiTietPhieuDatHang,
  ];

  var queryString = sqlString.format(
    "CALL USP_CapNhatThongTinPhieuDatHang(?,?,?,?,?,?,?);",
    dataPhieuDatHang
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Updated Phieu Dat Hang ${data.SoPhieuDatHang} successfully`);
      result(res[0]);
    }
  });
};
module.exports = PhieuDatHang;
