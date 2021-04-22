const db = require("./DataBaseAccessHelper");

const GioHang = db.sequelize.define(
  "GioHang",
  {
    MaGioHang: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MaNguoiDung: {
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
    tableName: "GIOHANG",
    timestamps: false,
  }
);

module.exports = GioHang;
