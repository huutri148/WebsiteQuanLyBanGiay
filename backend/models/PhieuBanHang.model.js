const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const PhieuBanHang = {};

PhieuBanHang.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataPhieuBanHang = [
    data.MaNguoiDung,
    data.MaKhachHang,
    data.NgayBan,
    data.PhuongThucThanhToan,
    data.TongTien,
    data.GhiChu,
  ];

  var queryString = sqlString.format(
    "CALL USP_ThemPhieuBanHang(?,?,?,?,?,?);",
    dataPhieuBanHang
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created PhieuBanHang successfully`);
      data.ChiTietPhieuBanHang.map(function await(chiTietPhieuBanHang) {
        let qr = sqlString.format(
          `CALL USP_ThemChiTietPhieuBanHang(${chiTietPhieuBanHang.MaChiTietGiay},
            ${chiTietPhieuBanHang.SoLuongMua},
            ${chiTietPhieuBanHang.GiaBan},
            ${chiTietPhieuBanHang.ThanhTien});`
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

PhieuBanHang.GetByID = (soPhieuBanHang, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetPhieuBanHangByID(${soPhieuBanHang});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Bills:".yellow.bold, res[0]);
      callBack(res[0]);
    }
  });
};
PhieuBanHang.GetByUserID = (maKhachHang, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetPhieuBanHangByMaKhachHang(${maKhachHang});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Bills:".yellow.bold, res[0]);
      callBack(res[0]);
    }
  });
};
// Fetch all PhieuBanHang in DataBase
PhieuBanHang.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListPhieuBanHang();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }

    callBack(results[0]);
  });
};
PhieuBanHang.Edit = async function (data, result) {
  var conn = db.getConnection();
  var dataPhieuBanHang = [
    data.SoPhieuBanHang,
    data.MaNguoiDung,
    data.MaKhachHang,
    data.NgayBan,
    data.PhuongThucThanhToan,
    data.TongTien,
    data.GhiChu,
  ];

  var queryString = sqlString.format(
    "CALL USP_CapNhatThongTinPhieuBanHang(?,?,?,?,?,?,?);",
    dataPhieuBanHang
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Updated product ${data.SoPhieuBanHang} successfully`);
      result(res[0]);
    }
  });
};
module.exports = PhieuBanHang;
