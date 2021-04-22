const db = require("./DataBaseAccessHelper");

const ChiTietPhieuDatHang = db.sequelize.define(
  "ChiTietPhieuDatHang",
  {
    SoPhieuDatHang: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
    },
    MaChiTietGiay: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    SoLuongDat: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
 },
  {
    tableName: "CHITIETPHIEUDATHANG",
    timestamps: false,
  }
);

module.exports = ChiTietPhieuDatHang;
