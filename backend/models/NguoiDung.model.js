const db = require("./DataBaseAccessHelper");
const bcrypt = require("bcrypt");
const ChucVu = db.sequelize.define(
  "ChucVu",
  {
    MaChucVu: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenChucVu: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    IsDeleted: {
      type: db.Sequelize.BOOLEAN,
      allownull: false,
    },
  },
  {
    tableName: "CHUCVU",
    timestamps: false,
  }
);
const NguoiDung = db.sequelize.define(
  "NguoiDung",
  {
    MaNguoiDung: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenNguoiDung: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    TenDangNhap: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    MatKhau: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    Email: {
      type: db.Sequelize.STRING,
    },
    SDT: {
      type: db.Sequelize.STRING,
      allownull: false,
    },
    DiaChi: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    Avatar: {
      type: db.Sequelize.STRING,
    },
    MaChucVu: {
      type: db.Sequelize.INTEGER,
    },
    IsDeleted: {
      type: db.Sequelize.BOOLEAN,
      allownull: false,
    },
  },
  {
    tableName: "NGUOIDUNG",
    timestamps: false,
    instanceMethods: {
      validPassword: function (enteredPasobjectsword) {
        return bcrypt.compareSync(password, this.password);
      },
    },
  }
);
NguoiDung.beforeCreate(async function (user) {
  const salt = await bcrypt.genSalt(10);
  user.MatKhau = await bcrypt.hash(user.MatKhau, salt);
});

NguoiDung.hasOne(ChucVu, { foreignKey: "MaChucVu" });
module.exports = { NguoiDung, ChucVu };
