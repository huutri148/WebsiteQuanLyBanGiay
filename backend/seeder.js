require("dotenv").config();
const colors = require("colors");
const db = require("./models/DataBaseAccessHelper");
const NguoiDung = require("./models/NguoiDung.model");

const users = require("./data/NguoiDung");

db.connect();

const importData = async () => {
  await users.map(async (user) => {
    await NguoiDung.create(user, (result) => {});
  });
  console.log("Data Imported".green.inverse);
};

const destroyData = async () => {
  try {
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
