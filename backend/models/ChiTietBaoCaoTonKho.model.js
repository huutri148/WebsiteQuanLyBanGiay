const db = require("./DataBaseAccessHelper");

const ChiTietBaoCaoTonKho = db.sequelize.define(
  "ChiTietBaoCaoTonKho",
  {
    MaBaoCaoTonKho: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    MaChiTietGiay: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    SoLuongTon: {
      type: db.Sequelize.INTEGER,
      allownull: false,
    },
    TrangThaiHangHoa: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
  },
  {
    tableName: "CHITIETBAOCAOTONKHTONKHOO",
    timestamps: false,
  }
);

module.exports = ChiTietBaoCaoTonKho;
