const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const PhieuNhapKho = {};

PhieuNhapKho.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataPhieuNhapKho = [
    data.MaNhaCungCap,
    data.MaNguoiDung,
    data.NgayNhapKho,
    data.TongTien,
    data.GhiChu,
    data.ChiTietPhieuNhapKho,
  ];

  var queryString = sqlString.format(
    "CALL USP_ThemPhieuNhapKho(?,?,?,?,?);",
    dataPhieuNhapKho
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created PhieuNhapKho successfully`);
      data.ChiTietPhieuNhapKho.map(function await(chiTietPhieuNhapKho) {
        let qr = sqlString.format(
          `CALL USP_ThemChiTietPhieuNhapKho(${chiTietPhieuNhapKho.MaChiTietGiay},
        ${chiTietPhieuNhapKho.SoLuongNhap},${chiTietPhieuNhapKho.GiaNhap},
        ${chiTietPhieuNhapKho.ThanhTien});`
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

PhieuNhapKho.GetByID = (soPhieuNhapKho, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetPhieuNhapKhoByID(${soPhieuNhapKho});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Docket:".yellow.bold, res[0]);
      callBack(res[0]);
    }
  });
};
PhieuNhapKho.Delete = (soPhieuNhapKho, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_XoaPhieuNhapKho(${soPhieuNhapKho});`
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res) {
      console.log("Delete Docket:".yellow.bold);
      callBack(res);
    }
  });
};
// Fetch all PhieuNhapKho in DataBase
PhieuNhapKho.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListPhieuNhapKho();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }

    callBack(results[0]);
  });
};
PhieuNhapKho.Edit = async function (data, result) {
  var conn = db.getConnection();
  var dataPhieuNhapKho = [
    data.SoPhieuNhapKho,
    data.MaNhaCungCap,
    data.MaNguoiDung,
    data.NgayNhapKho,
    data.TongTien,
    data.GhiChu,
    data.ChiTietPhieuNhapKho,
  ];

  var queryString = sqlString.format(
    "CALL USP_CapNhatThongTinPhieuNhapKho(?,?,?,?,?,?);",
    dataPhieuNhapKho
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      if (data.ChiTietPhieuNhapKho) {
        var query = `CALL USP_XoaTrangPhieuNhapKho(${data.SoPhieuNhapKho})`;
        conn.query(query, function await(err, res) {
          if (err) {
            console.log(err);
          } else {
            data.ChiTietPhieuNhapKho.map(function await(chiTietPhieuNhapKho) {
              let qr = sqlString.format(`CALL USP_ThemChiTietPhieuNhapKhoByID(
                                              ${data.SoPhieuNhapKho},
                                              ${chiTietPhieuNhapKho.MaChiTietGiay},
                                              ${chiTietPhieuNhapKho.SoLuongNhap}, 
                                              ${chiTietPhieuNhapKho.GiaNhap},
                                              ${chiTietPhieuNhapKho.ThanhTien});`);
              conn.query(qr, (error, response) => {
                if (error) {
                  console.log(error);
                } else {
                }
              });
            });
          }
        });
      }
      result(res[0]);
    }
  });
};
PhieuNhapKho.GetDetails = function (soPhieuNhapKho,callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format(
    `CALL USP_GetChiTietPhieuNhapKhoByID(${soPhieuNhapKho});`
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
module.exports = PhieuNhapKho;
