const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const BaoCaoBanHang = {};
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join("-");
}
BaoCaoBanHang.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataBaoCaoBanHang = [data.MaNguoiDung, data.NgayBatDau, data.NgayKetThuc];

  var queryString = sqlString.format(
    "CALL USP_ThemBaoCaoBanHang(?,?,?);",
    dataBaoCaoBanHang
  );
  conn.query(queryString, (err, res) => {
    if (err) throw err;
    else 
    {
      console.log(`Create BaoCaoBanHang successfully`);
      for 
      (
        var d = new Date(data.NgayBatDau);
        d <= new Date(data.NgayKetThuc);
        d.setDate(d.getDate() + 1)
      ) 
      {
        let qr = sqlString.format("CALL USP_ThemChiTietBaoCaoBanHang(?)",formatDate(d));
        conn.query(qr, (er, re) => {
        if (er) throw er;
        });
      };
    result(res[0]);
  }});
};
BaoCaoBanHang.Get = async function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_ListBaoCaoBanHang();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    } else {
      callBack(results[0]);
    }
  });
};
BaoCaoBanHang.GetDetails = async function (maBaoCaoBanHang,callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_ListChiTietBaoCaoBanHang(${maBaoCaoBanHang});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Details:".yellow.bold, res[0]);
      callBack(res[0]);
    }
  });
};
module.exports = BaoCaoBanHang;
