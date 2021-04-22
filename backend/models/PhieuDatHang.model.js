const db = require("./DataBaseAccessHelper");

const PhieuDatHang = db.sequelize.define(
  "PhieuDatHang",
  {
    MaPhieuDatHang: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MaNguoiDung: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    MaNhaCungCap: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },

    NgayLap: {
      type: db.Sequelize.DATE(6),
      allownull: false,
    },
    IsDeleted: {
      type: db.Sequelize.BOOLEAN,
      allownull: false,
    },
  },
  {
    tableName: "PHIEUDATHANG",
    timestamps: false,
  }
);

module.exports = PhieuDatHang;
