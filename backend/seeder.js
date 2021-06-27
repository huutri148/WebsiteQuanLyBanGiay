require("dotenv").config();
const colors = require("colors");
const db = require("./models/DataBaseAccessHelper");
const NguoiDung = require("./models/NguoiDung.model");
const PhieuBanHang = require("./models/PhieuBanHang.model");

const users = require("./data/NguoiDung");
const bills = require("./data/PhieuBanHang");

db.connect();

const importData = async () => {
  await NguoiDung.create(users[0], (result) => {});
  users.forEach((element,index) => {
    if(index != 0)
      NguoiDung.create(element, (result) => {});
  });
  //   await bills.map(async (bill) => {
  //    await PhieuBanHang.Create(bill, (result) => {});
  //  });
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
