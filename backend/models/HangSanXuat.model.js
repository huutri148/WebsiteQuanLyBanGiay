const db = require("./DataBaseAccessHelper");

const HangSanXuat = db.sequelize.define(
  "HangSanXuat",
  {
    MaHangSanXuat: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenHangSanXuat: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    IsDeleted: {
      type: db.Sequelize.BOOLEAN,
      allownull: false,
    },
  },
  {
    tableName: "HANGSANXUAT",
    timestamps: false,
  }
);

module.exports = HangSanXuat;
