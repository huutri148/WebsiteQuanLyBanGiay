const db = require("./DataBaseAccessHelper");

const ChiTietBaoCaoBanHang = db.sequelize.define(
  "ChiTietBaoCaoBanHang",
  {
    MaBaoCaoBanHang: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    Ngay: {
      type: db.Sequelize.DATE(6),
      allownull: false,
    },
    SoLuongPhieuBan: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    DoanhThu: {
      type: db.Sequelize.DECIMAL(17, 2),
      allownull: false,
    },
  },
  {
    tableName: "CHITIETBAOCAOBANHANG",
    timestamps: false,
  }
);

module.exports = ChiTietBaoCaoBanHang;
