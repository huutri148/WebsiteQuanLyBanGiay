const db = require("./DataBaseAccessHelper");

const ChiTietGiay = db.sequelize.define(
  "ChiTietGiay",
  {
    MaChiTietGiay: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      allownull: false,
    },
    MaGiay: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    MaSize: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    SoLuong: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
  },
  {
    tableName: "CHITIETGIAY",
    timestamps: false,
  }
);

module.exports = ChiTietGiay;
