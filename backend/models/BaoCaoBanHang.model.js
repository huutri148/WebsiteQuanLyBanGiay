const db = require("./DataBaseAccessHelper");

const BaoCaoBanHang = db.sequelize.define(
  "BaoCaoBanHang",
  {
    MaBaoCaoBanHang: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MaNguoiDung: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    NgayBatDay: {
      type: db.Sequelize.DATE(6),
      allownull: false,
    },
    NgayKetThuc: {
      type: db.Sequelize.DATE(6),
      allownull: false,
    },

    SoLuongPhieuBanHang: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },

    IsDeleted: {
      type: db.Sequelize.BOOLEAN,
      allownull: false,
    },
  },
  {
    tableName: "BAOCAOBANHANG",
    timestamps: false,
  }
);

module.exports = BaoCaoBanHang;
