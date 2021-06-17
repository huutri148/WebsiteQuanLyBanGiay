const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const GioHang = {};

GioHang.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataGioHang = [data.MaNguoiDung];

  var queryString = sqlString.format("CALL USP_ThemGioHang(?);", dataGioHang);
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Create GioHang successfully`);
      data.ChiTietGioHang.map(function await(chiTietGioHang) {
        console.log(chiTietGioHang);
        let qr = sqlString.format(
          `CALL USP_ThemChiTietGioHang(${chiTietGioHang.MaChiTietGiay},
                            ${chiTietGioHang.SoLuongMua},${chiTietGioHang.ThanhTien});`
        );
        conn.query(qr, (error, response) => {
          if (error) {
            console.log(error);
          }
        });
      });
      result(res[0]);
    }
  });
};

GioHang.GetByID = (maGioHang, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_GetGioHangByID(${maGioHang});`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0].length) {
      console.log("Found GioHang:".yellow.bold, res[0][0]);
      callBack(res[0][0]);
      return;
    }
  });
};

GioHang.Delete = (maGioHang, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_XoaGioHang(${maGioHang});`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Deleted Gio Hang: ", maGioHang);
      callBack(res);
    }
  });
};
// Fetch all GioHang in DataBase
GioHang.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListGioHang();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }

    callBack(results[0]);
  });
};
GioHang.Edit = async function (maGioHang, result) {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_CapNhatGioHang(${maGioHang});`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Updated Gio Hang: ", maGioHang);
      result(res[0]);
    }
  });
};

GioHang.GetDetails = function (maGioHang, callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetChiTietGioHangByID(${maGioHang});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      callBack(res[0]);
    }
  });
};
module.exports = GioHang;
