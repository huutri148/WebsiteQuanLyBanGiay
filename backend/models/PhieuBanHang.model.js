const db = require("./DataBaseAccessHelper");

const PhieuBanHang = db.sequelize.define(
  "PhieuBanHang",
  {
    SoPhieuBanHang: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PhuongThucThanhToan: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    GhiChu: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    MaNguoiDung: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    MaKhachHang: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    NgayBan: {
      type: db.Sequelize.DATE(6),
      allownull: false,
    },
    TongTien: {
      type: db.Sequelize.DECIMAL(17, 2),
      allownull: false,
    },
  },
  {
    tableName: "PHIEUBANHANG",
    timestamps: false,
  }
);

module.exports = PhieuBanHang;
