create schema ShoesStoreManagement;
use ShoesStoreManagement;

create Table SIZE 
(
    MaSize INT auto_increment PRIMARY KEY,
    TenSize NVARCHAR(100) NOT NULL,
    IsDeleted BOOLEAN
);

CREATE TABLE HANGSANXUAT
(
    MaHangSanXuat INT auto_increment PRIMARY KEY,
    TenHangSanXuat NVARCHAR(100) NOT NULL,
    IsDeleted BOOLEAN
);


CREATE TABLE  MAU 
(
    MaMau INT auto_increment PRIMARY KEY,
    TenMau NVARCHAR(100) NOT NULL,
    IsDeleted BOOLEAN
);

CREATE TABLE GIAY
(
    MaGiay INT auto_increment UNIQUE,
    TenGiay NVARCHAR(100) NOT NULL, 
    MaHangSanXuat INT ,
    MaMau INT ,
    GioiTinh varchar(100),
    MoTa NVARCHAR(1000),
    TyLeLoiNhuan FLOAT NOT NULL,
    DonGiaNhap DECIMAL(17,2),
    CONSTRAINT PK_GIAY PRIMARY KEY (GioiTinh,MaMau)
);

alter table GIAY
add constraint GIAY_HANGSANXUAT_FK
foreign key(MaHangSanXuat) references HANGSANXUAT(MaHangSanXuat);


alter table GIAY
add constraint GIAY_MAU_FK
foreign key(MaMau) references MAU(MaMau);



CREATE TABLE CHITIETGIAY 
(
    MaChiTietGiay INT auto_increment UNIQUE,
    MaSize INT ,
    MaGiay INT ,
    SoLuong INT NOT NULL,
    CONSTRAINT PK_CHITIETGIAY PRIMARY KEY (MaSize, MaGiay)
);

alter table CHITIETGIAY 
add constraint CHITIETGIAY_GIAY_FK
foreign key(MaGiay) references GIAY(MaGiay);


alter table CHITIETGIAY
add constraint CHITIETGIAY_SIZE_FK
foreign key(MaSize) references SIZE(MaSize);

CREATE TABLE NHACUNGCAP
(
    MaNhaCungCap int auto_increment PRIMARY KEY,
    TenNhaCungCap NVARCHAR(100) NOT NULL,
    SDT NVARCHAR(20) NOT NULL,
    DiaChi NVARCHAR(1000) NOT NULL,
    Email NVARCHAR(1000) NOT NULL,
    IsDeleted BOOLEAN 
);

CREATE TABLE NGUOIDUNG
(
    MaNguoiDung int auto_increment PRIMARY KEY,
    MaChucVu int ,
    TenNguoiDung NVARCHAR(1000) NOT NULL,
    TenDangNhap NVARCHAR(100) NOT NULL,
    MatKhau NVARCHAR(100) NOT NULL,
    SDT NVARCHAR(20) NOT NULL,
    DiaChi NVARCHAR(1000) NOT NULL,
    Email NVARCHAR(1000) NOT NULL,
    Avatar NVARCHAR(1000),
    IsDeleted BOOLEAN 
);

CREATE TABLE CHUCVU
( 
    MaChucVu int auto_increment PRIMARY KEY,
    TenChucVu NVARCHAR(100) NOT NULL,
    IsDeleted BOOLEAN NOT NULL
);

alter table NGUOIDUNG
add constraint NGUOIDUNG_CHUCVU_FK
foreign key(MaChucVu) references CHUCVU(MaChucVu);

CREATE TABLE QUYEN
(
    MaQuyen int auto_increment PRIMARY KEY,
    TenQuyen NVARCHAR(100) NOT NULL
);

CREATE TABLE PHANQUYEN
(
    MaChucVu int not null,
    MaQuyen int not null,
    CONSTRAINT PK_PHANQUYEN PRIMARY KEY (MaChucVu, MaQuyen)
);

alter table PHANQUYEN 
add constraint PHANQUYEN_QUYEN_FK
foreign key(MaQuyen) references QUYEN(MaQuyen);

alter table PHANQUYEN
add constraint PHANQUYEN_CHUCVU_FKK
foreign key(MaChucVu) references CHUCVU(MaChucVu);

CREATE TABLE PHIEUBANHANG
(
    SoPhieuBanHang int auto_increment primary key,
    MaNguoiDung int not null,
    MaKhachHang int not null,
    NgayBan DATETIME DEFAULT CURRENT_TIMESTAMP,
    PhuongThucThanhToan NVARCHAR(100) NOT NULL,
    TongTien DECIMAL(17,2) DEFAULT 0,
    GhiChu NVARCHAR(100) 
);
alter table PHIEUBANHANG
add constraint PHIEUBANHANG_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);

alter table PHIEUBANHANG
add constraint PHIEUBANHANG_KHACHHANG_FK
foreign key(MaKhachHang) references NGUOIDUNG(MaNguoiDung);

CREATE TABLE CHITIETPHIEUBANHANG
(
    MaChiTietGiay int not null,
    SoPhieuBanHang int not null,
    SoLuongMua int DEFAULT 0,
    GiaBan DECIMAL(17,2) DEFAULT 0,
    ThanhTien DECIMAL(17,2) DEFAULT 0,
    CONSTRAINT PK_CHITIETPHIEUBANHANG PRIMARY KEY (MaChiTietGiay, SoPhieuBanHang)
);

alter table CHITIETPHIEUBANHANG
add constraint CHITIETPHIEUBANHANG_CHITIETGIAY_FK
foreign key(MaChiTietGiay) references CHITIETGIAY(MaChiTietGiay);


alter table CHITIETPHIEUBANHANG
add constraint CHITIETPHIEUBANHANG_PHIEUBANHANG_FK
foreign key(SoPhieuBanHang) references PHIEUBANHANG(SoPhieuBanHang);


CREATE TABLE BAOCAOTONKHO
(
    MaBaoCaoTonKho int auto_increment PRIMARY KEY,
    MaNguoiDung int not null,
    NgayLap DATETIME DEFAULT CURRENT_TIMESTAMP,
    TongSoHangHoa int not null,
    IsDeleted boolean not null,
    GhiChu nvarchar(1000)
);


alter table BAOCAOTONKHO
add constraint BAOCAOTONKHO_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);

CREATE TABLE CHITIETBAOCAOTONKHO
(
    MaChiTietGiay int not null,
    MaBaoCaoTonKho int not null,
    SoLuongTon int not null,
    TrangThaiHangHoa nvarchar(1000) not null,
    CONSTRAINT PK_CHITIETBAOCAOTONKKHO PRIMARY KEY (MaBaoCaoTonKho, MaChiTietGiay)
);

alter table CHITIETBAOCAOTONKHO
add constraint CHITIETBAOCAOTONKHO_BAOCAOTONKHO_FK
foreign key(MaBaoCaoTonKho) references BAOCAOTONKHO(MaBaoCaoTonKho);

alter table CHITIETBAOCAOTONKHO
add constraint CHITIETBAOCAOTONKHO_CHITIETGIAY_FK
foreign key(MaChiTietGiay) references CHITIETGIAY(MaChiTietGiay);


CREATE TABLE BAOCAOBANHANG
(
    MaBaoCaoBanHang int auto_increment PRIMARY KEY,
    MaNguoiDung int not null,
    NgayBatDau DATETIME DEFAULT CURRENT_TIMESTAMP,
    NgayKetThuc DATETIME DEFAULT CURRENT_TIMESTAMP,
    SoLuongPhieuBanHang int DEFAULT 0,
    IsDeleted boolean 
);

alter table BAOCAOBANHANG
add constraint BAOCAOBANHANG_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);


CREATE TABLE CHITIETBAOCAOBANHANG
(
    MaBaoCaoBanHang int not null,
    Ngay DATETIME,
    SoLuongPhieuBan int not null,
    DoanhThu DECIMAL(17,2) not null,
    CONSTRAINT PK_CHITIETPHIEUBANHANG PRIMARY KEY (MaBaoCaoBanHang, Ngay)
);

alter table CHITIETBAOCAOBANHANG
add constraint CHITIETBAOCAOBANHANG_BAOCAOBANHANG_FK
foreign key(MaBaoCaoBanHang) references BAOCAOBANHANG(MaBaoCaoBanHang);

CREATE TABLE GIOHANG 
(
    MaGioHang int not null,
    MaNguoiDung int not null,
    NgayLap DATETIME ,
    IsDeleted BOOLEAN,
    CONSTRAINT PK_GIOHANG PRIMARY KEY (MaGioHang)
);


alter table GIOHANG
add constraint GIOHANG_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);


CREATE TABLE CHITIETGIOHANG
(
    MaGioHang int not null,
    MaChiTietGiay int not null,
    SoLuongMua int not null, 
    CONSTRAINT PK_CHITIETGIOHANG PRIMARY KEY (MaGioHang, MaChiTietGiay)
);


alter table CHITIETGIOHANG 
add constraint CHITIETGIOHANG_GIOHANG_FK
foreign key(MaGioHang) references GIOHANG(MaGioHang);

alter table CHITIETGIOHANG 
add constraint CHITIETGIOHANG_CHITIETGIAY_FK
foreign key(MaChiTietGiay) references CHITIETGIAY(MaChiTietGiay);



CREATE TABLE PHIEUDATHANG 
(
    SoPhieuDatHang int auto_increment PRIMARY KEY,
    MaNguoiDung int not null,
    MaNhaCungCap int not null,
    NgayLap datetime DEFAULT CURRENT_TIMESTAMP,
    IsDeleted BOOLEAN
);

alter table PHIEUDATHANG
add constraint PHIEUDATHANG_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);


alter table PHIEUDATHANG
add constraint PHIEUDATHANG_NHACUNGCAP_FK
foreign key(MaNhaCungCap) references NHACUNGCAP(MaNhaCungCap);



CREATE TABLE CHITIETPHIEUDATHANG 
(
    SoPhieuDatHang int not null,
    MaChiTietGiay int not null,
    SoLuongDat int not null,
    CONSTRAINT PK_CHITIETPHIEUDATHANG PRIMARY KEY (SoPhieuDatHang, MaChiTietGiay)
);


alter table CHITIETPHIEUDATHANG
add constraint CHITIETPHIEUDATHANG_PHIEUDATHANG_FK
foreign key(SoPhieuDatHang) references PHIEUDATHANG(SoPhieuDatHang);


alter table CHITIETPHIEUDATHANG
add constraint CHITIETPHIEUDATHANG_CHITIETGIAY_FK
foreign key(SoPhieuDatHang) references CHITIETGIAY(MaChiTietGiay);

CREATE TABLE BAOCAOLOINHUAN 
(
    MaBaoCaoLoiNhuan int auto_increment PRIMARY KEY,
    MaNguoiDung int not null,
    NgayBatDau DATETIME DEFAULT CURRENT_TIMESTAMP,
    NgayKetThuc DATETIME DEFAULT CURRENT_TIMESTAMP,
    TongChi DECIMAL(17,2) not null,
    TongDoanhThu DECIMAL(17,2) not null,
    TongLoiNhuan DECIMAL(17,2) not null,
    IsDeleted boolean not null,
);
alter table BAOCAOLOINHUAN 
add constraint BAOCAOLOINHUAN_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);


CREATE TABLE CHITIETBAOCAOLOINHUAN
(
    MaBaoCaoLoiNhuan int NOT NULL,
    Chi DECIMAL(17,2) not null,
    DoanhThu DECIMAL(17,2) not null,
    LoiNhuan DECIMAL(17,2) not null,
    TyLeLoiNhuan FLOAT not null,
    Ngay DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_CHITIETPHIEUDATHANG PRIMARY KEY (MaBaoCaoLoiNhuan, Ngay)
);
alter table CHITIETBAOCAOLOINHUAN 
add constraint CHITIETBAOCAOLOINHUAN_BAOCAOLOINHUAN_FK
foreign key(MaBaoCaoLoiNhuan) references BAOCAOLOINHUAN(MaBaoCaoLoiNhuan);


