const db = require("./DataBaseAccessHelper");

const Mau = db.sequelize.define(
  "Mau",
  {
    MaMau: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenMau: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    IsDeleted: {
      type: db.Sequelize.BOOLEAN,
      allownull: false,
    },
  },
  {
    tableName: "MAU",
    timestamps: false,
  }
);

module.exports = Mau;
