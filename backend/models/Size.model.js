const db = require("./DataBaseAccessHelper");

const Size = db.sequelize.define(
  "Size",
  {
    MaSize: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenSize: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    IsDeleted: {
      type: db.Sequelize.BOOLEAN,
      allownull: false,
    },
  },
  {
    tableName: "SIZE",
    timestamps: false,
  }
);

module.exports = Size;
