const db = require("./DataBaseAccessHelper");

const BaoCaoTonKho = db.sequelize.define(
  "BaoCaoTonKho",
  {
    MaBaoCaoTonKho: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    GhiChu: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    MaNguoiDung: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    NgayLap: {
      type: db.Sequelize.DATE(6),
      allownull: false,
    },
    TongSoHangHoa: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },

    IsDeleted: {
      type: db.Sequelize.BOOLEAN,
      allownull: false,
    },
  },
  {
    tableName: "BAOCAOHANGHOA",
    timestamps: false,
  }
);

module.exports = BaoCaoTonKho;
