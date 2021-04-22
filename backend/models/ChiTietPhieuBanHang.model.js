const db = require("./DataBaseAccessHelper");

const ChiTietPhieuBanHang = db.sequelize.define(
    "ChiTietPhieuBanHang",
    {
        MaChiTietGiay: {
            type: db.Sequelize.INTEGER,
            allownull: false,
        },
        SoLuongPhieuBanHang: {
            type: db.Sequelize.INTEGER,
            allownull: false,
        },
        SoLuongMua: {
            type: db.Sequelize.INTEGER,
            allownull: false,
        },
        GiaBan: {
            type: db.Sequelize.DECIMAL(17, 2),
            allownull: false,
        },
        ThanhTien: {
            type: db.Sequelize.DECIMAL(17, 2),
            allownull: false,
        },
    },
    {
        tableName: "CHITIETPHIEUBANHANG",
        timestamps: false,
    }
);

module.exports = ChiTietPhieuBanHang;
