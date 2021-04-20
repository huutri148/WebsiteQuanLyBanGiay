const dbConfig = require("../config/db.config");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};
db.testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully".cyan.underline);
  } catch (error) {
    console.error(
      `Unable to connect to the database: ${error}`.red.underline.bold
    );
  }
};
db.syncConnection = () => {
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Database synced".cyan.underline);
    })
    .catch(() => {
      console.log("Error syncing database".red.underline.bold);
    });
};

module.exports = db;
