const db = require("./DataBaseAccessHelper");
const sqlString = require("sqlstring");
const Giay = {};

// Fetch all Giay in DataBase
Giay.Get = function (callBack) {
  var conn = db.getConnection();
  var queryString = sqlString.format("CALL USP_GetListGiay();");

  conn.query(queryString, (err, results, fields) => {
    if (err) {
      throw err;
    }
    callBack(results[0]);
  });
};
Giay.GetByFilter = (data, callBack) => {
  var conn = db.getConnection();
  var dataGiay = [
    data.MaGiay,
    data.TenGiay,
    data.MaHangSanXuat,
    data.MaMau,
    data.GioiTinh,
  ];
  var queryString = sqlString.format(`CALL USP_GetGiayByID(${maGiay})`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0].length) {
      console.log("Found Product:".yellow.bold, res[0]);
      callBack(res[0]);
      return;
    }
  });
};
Giay.GetByID = (maGiay, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_GetGiayByID(${maGiay})`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      console.log("Found Product:".yellow.bold, res[0]);
      callBack(res[0]);
      return;
    }
  });
};
Giay.GetSizeByID = (maGiay, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_GetSizeGiayByID(${maGiay})`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    }
    if (res[0]) {
      callBack(res[0]);
      return;
    }
  });
};
Giay.Create = async function (data, result) {
  var conn = db.getConnection();
  var dataGiay = [
    data.TenGiay,
    data.MaHangSanXuat,
    data.MaMau,
    data.GioiTinh,
    data.Anh,
    data.MoTa,
    data.TyLeLoiNhuan,
    data.DonGiaNhap,
  ];
  var dataSize = data.Size;
  var queryString = sqlString.format(
    "CALL USP_ThemSanPham(?,?,?,?,?,?,?,?);",
    dataGiay
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Created product ${data.TenGiay} successfully`);
      dataSize.map((maSize) => {
        let qr = `CALL USP_ThemChiTietSanPham(${maSize});`;
        conn.query(qr, (error, response) => {
          if (error) {
            throw error;
          } else {
          }
        });
      });
      result(res[0]);
    }
  });
};

Giay.Edit = async function (data, result) {
  var conn = db.getConnection();
  var dataGiay = [
    data.MaGiay,
    data.TenGiay,
    data.MaHangSanXuat,
    data.MaMau,
    data.GioiTinh,
    data.Anh,
    data.MoTa,
    data.TyLeLoiNhuan,
    data.DonGiaNhap,
  ];

  var queryString = sqlString.format(
    "CALL USP_CapNhatThongTinGiay(?,?,?,?,?,?,?,?,?);",
    dataGiay
  );
  conn.query(queryString, (err, res) => {
    if (err) {
      //Todo: Handle error
      throw err;
    } else {
      console.log(`Updated product ${data.TenGiay} successfully`);
      result(res[0]);
    }
  });
};
Giay.Delete = (maGiay, callBack) => {
  var conn = db.getConnection();
  var queryString = sqlString.format(`CALL USP_XoaSanPham(${maGiay})`);
  conn.query(queryString, (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Deleteted Product".yellow.bold);
      callBack(res[0]);
    }
  });
};
module.exports = Giay;
