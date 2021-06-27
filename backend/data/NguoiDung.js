const NguoiDung = require("../models/NguoiDung.model");

const users = [
  {
    TenNguoiDung: "Khách Vãng Lai",
    TenDangNhap: "â",
    MatKhau: "â",
    MaChucVu: "5",
    SDT: "",
    IsDeleted: false,
  },
  {
    TenNguoiDung: "Nguyen Huu Tri 1",
    TenDangNhap: "huutri1480",
    MatKhau: "123456",
    MaChucVu: "1",
    Email: "123@example.com",
    SDT: "0987654567",
    DiaChi: "Thanh Hoa",
    Avatar:
      "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2Favatar.jpg?alt=media&token=f4541838-9024-4859-b287-4cdbbebcf181",
    IsDeleted: false,
  },
  {
    TenNguoiDung: "Nguyen Huu Tri 2",
    TenDangNhap: "huutri14",
    MatKhau: "123456",
    Email: "123@example.com",
    SDT: "0987654567",
    MaChucVu: "2",
    DiaChi: "Thanh Hoa",
    Avatar:
      "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2Favatar.jpg?alt=media&token=f4541838-9024-4859-b287-4cdbbebcf181",
    IsDeleted: false,
  },
  {
    TenNguoiDung: "Nguyen Huu Tri 3",
    TenDangNhap: "huutri18",
    MatKhau: "123456",
    Email: "123@example.com",
    SDT: "0987654567",
    DiaChi: "Thanh Hoa",
    MaChucVu: "3",
    Avatar:
      "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2Favatar.jpg?alt=media&token=f4541838-9024-4859-b287-4cdbbebcf181",
    IsDeleted: false,
  },
  {
    TenNguoiDung: "Nguyen Huu Tri 4",
    TenDangNhap: "huutri148",
    MatKhau: "123456",
    Email: "123@example.com",
    SDT: "0987654567",
    MaChucVu: "4",
    DiaChi: "Thanh Hoa",
    Avatar:
      "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2Favatar.jpg?alt=media&token=f4541838-9024-4859-b287-4cdbbebcf181",
    IsDeleted: false,
  },
];

module.exports = users;
