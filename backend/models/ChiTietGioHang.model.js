const db = require("./DataBaseAccessHelper");

const ChiTietGioHang = db.sequelize.define(
    "ChiTietGioHang",
    {
        MaGioHang: {
            type: db.Sequelize.INTEGER,
            allownull: false,
        },
        MaChiTietGiay: {
            type: db.Sequelize.INTEGER,
            allownull: false,
        },
        SoLuongMua: {
            type: db.Sequelize.INTEGER,
            allownull: false,
        },
    },
    {
        tableName: "CHITIETGIOHANG",
        timestamps: false,
    }
);

module.exports = ChiTietGioHang;
