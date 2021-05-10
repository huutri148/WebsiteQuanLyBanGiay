const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const PhieuChi = {};

PhieuChi.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataPhieuChi = [
    data.MaNguoiDung,
    data.SoPhieuNhapKho,
    data.NgayLap,
    data.TongTien,
    data.GhiChu,
  ];

  var queryString = sqlString.format(
    "CALL USP_ThemPhieuChi(?,?,?,?,?);",
    dataPhieuChi
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      result(res[0]);
    }
  });
};

PhieuChi.GetByID = (soPhieuChi, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetPhieuChiByID(${soPhieuBanHang});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Payment Voucher:".yellow.bold, res[0]);
      callBack(res[0]);
    }
  });
};
// Fetch all PhieuChi in DataBase
PhieuChi.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListPhieuChi();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }

    callBack(results[0]);
  });
};
module.exports = PhieuChi;
