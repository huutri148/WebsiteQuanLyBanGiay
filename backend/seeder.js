require("dotenv").config();
const colors = require("colors");
const dataChucVu = require("./data/ChucVu");
const users = require("./data/NguoiDung");
const { NguoiDung, ChucVu } = require("./models/NguoiDung.model");
const db = require("./models/DataBaseAccessHelper");

db.testConnection();

const importData = async () => {
  try {
    //await NguoiDung.destroy({ where: {} });
    //await ChucVu.destroy({ where: {} });

    //const createdChucVu = await ChucVu.bulkCreate(dataChucVu);
    const createUsers = await NguoiDung.bulkCreate(users);
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await NguoiDung.destroy({ where: {} });
    await ChucVu.destroy({ where: {} });
    console.log("Data Destroyed!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
