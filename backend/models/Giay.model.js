const db = require("./DataBaseAccessHelper");

const Giay = db.sequelize.define(
  "Giay",
  {
    MaGiay: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenGiay: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    GioiTinh: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    MoTa: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    // Anh: {
    //   type: db.Sequelize.STRING,
    //   allownull: false,
    // },
    MaMau: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    MaHangSanXuat: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    TyLeLoiNhuan: {
      type: db.Sequelize.FLOAT,
      allownull: false,
    },
    DonGiaNhap: {
      type: db.Sequelize.DECIMAL(17, 2),
      allownull: false,
    },
  },
  {
    tableName: "GIAY",
    timestamps: false,
  }
);

module.exports = Giay;
