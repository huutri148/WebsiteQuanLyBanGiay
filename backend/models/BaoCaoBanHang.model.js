const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const BaoCaoBanHang = {};

BaoCaoBanHang.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataBaoCaoBanHang = [data.MaNguoiDung, data.NgayBatDau, data.NgayKetThuc];

  var queryString = sqlString.format(
    "CALL USP_ThemBaoCaoBanHang(?,?,?);",
    dataBaoCaoBanHang
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Create BaoCaoBanHang successfully`);
      for (
        var d = data.NgayBatDau;
        d <= data.NgayKetThuc;
        d.setDate(d.getDate() + 1)
      ) {
        let qr = sqlString.format(`CALL USP_ThemChiTietBaoCaoBanHang(${d})`);
      }
    }
    result(res[0]);
  });
};
module.exports = BaoCaoBanHang;
