const db = require("./DataBaseAccessHelper");

const BaoCaoLoiNhuan = db.sequelize.define(
  "BaoCaoLoiNhuan",
  {
    MaBaoCaoLoiNhuan: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MaNguoiDung: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    NgayBatDau: {
      type: db.Sequelize.DATE(6),
      allownull: false,
    },
    NgayKetThuc: {
      type: db.Sequelize.DATE(6),
      allownull: false,
    },

    TongDoanhThu: {
      type: db.Sequelize.DECIMAL(17, 2),
      allownull: false,
    },
    TongChi: {
      type: db.Sequelize.DECIMAL(17, 2),
      allownull: false,
    },
    TongLoiNhuan: {
      type: db.Sequelize.DECIMAL(17, 2),
      allownull: false,
    },
    
  },
  {
    tableName: "BAOCAOLOINHUAN",
    timestamps: false,
  }
);

module.exports = BaoCaoLoiNhuan;
