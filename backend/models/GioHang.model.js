const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const GioHang = {};

GioHang.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataGioHang = [
    data.MaKhachHang,
    data.NgayLap
  ];


  var queryString = sqlString.format(
    "CALL USP_ThemGioHang(?,?);",
    dataGioHang
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Create GioHang successfully`);
      data.ChiTietGioHang.map((chiTietGioHang) => {
        let qr = sqlString.format(
          "CALL USP_ThemChiTietGioHang(?,?);",
          chiTietGioHang
        );
        conn.query(qr, (error, response) => {});
      });
      result(res[0]);
    }
  });
};

GioHang.GetById = (maGioHang, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetGioHangByID(${maGioHang})`
  );
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
GioHang.Edit = async function (data, result) {
  var conn = db.getConnection();
  var dataGioHang = [
    data.MaGioHang,
    data.MaKhachHang,
    data.NgayLap
  ];

  var queryString = sqlString.format(
    "CALL USP_CapNhatThongTinGioHang(?,?,?);",
    dataGioHang
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Updated GioHang ${data.MaGioHang} successfully`);
      result(res[0]);
    }
  });
};
module.exports = GioHang;
