const db = require("./DataBaseAccessHelper");

const NhaCungCap = db.sequelize.define("NhaCungCap", {
    MaNhaCungCap: {
        type: db.Sequelize.INTEGER,
        allownull: false,
    },
    TenNhaCungCap: {
        type: db.Sequelize.STRING,
        allownull: false,
    },
    DiaChi: {
        type: db.Sequelize.STRING,
    },
    Email: {
        type: db.Sequelize.STRING,
    },
    SDT: {
        type: db.Sequelize.STRING,
        allownull: false,
    },
    IsDeleted: {
        type: db.Sequelize.BOOLEAN,
        allownull: false,
    },
});

module.exports = NhaCungCap;
