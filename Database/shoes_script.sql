create schema ShoesStoreManagement;
use ShoesStoreManagement;

create Table SIZE 
(
    MaSize INT auto_increment PRIMARY KEY,
    TenSize NVARCHAR(100) NOT NULL,
    IsDeleted BOOLEAN DEFAULT false
);

CREATE TABLE HANGSANXUAT
(
    MaHangSanXuat INT auto_increment PRIMARY KEY,
    TenHangSanXuat NVARCHAR(100) NOT NULL,
    IsDeleted BOOLEAN DEFAULT false
);


CREATE TABLE  MAU 
(
    MaMau INT auto_increment PRIMARY KEY,
    TenMau NVARCHAR(100) NOT NULL,
    IsDeleted BOOLEAN DEFAULT false
);

CREATE TABLE GIAY
(
    MaGiay INT auto_increment UNIQUE NOT NULL,
    TenGiay NVARCHAR(100) NOT NULL, 
    MaHangSanXuat INT NOT NULL,
    MaMau INT NOT NULL,
    GioiTinh varchar(100) DEFAULT "Unisex",
    Anh varchar(100),
    MoTa NVARCHAR(1000),
    TyLeLoiNhuan FLOAT DEFAULT 0 ,
    DonGiaNhap DECIMAL(17,2) DEFAULT 0,
    IsDeleted BOOLEAN DEFAULT false,
    CONSTRAINT PK_GIAY PRIMARY KEY (GioiTinh,MaMau, MaHangSanXuat)
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
    MaSize INT NOT NULL,
    MaGiay INT NOT NULL,
    SoLuong INT DEFAULT 0,
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
    TenDangNhap NVARCHAR(100) NOT NULL UNIQUE,
    MatKhau NVARCHAR(100) NOT NULL,
    SDT NVARCHAR(20) NOT NULL,
    DiaChi NVARCHAR(1000) ,
    Email NVARCHAR(1000) ,
    Avatar NVARCHAR(1000),
    IsDeleted BOOLEAN 

);

CREATE TABLE CHUCVU
( 
    MaChucVu int auto_increment PRIMARY KEY,
    TenChucVu NVARCHAR(100) NOT NULL,
    IsDeleted BOOLEAN DEFAULT false 
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
    IsDeleted BOOLEAN DEFAULT false,
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
    TongChi DECIMAL(17,2) ,
    TongDoanhThu DECIMAL(17,2) ,
    TongLoiNhuan DECIMAL(17,2) ,
    IsDeleted boolean 
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

DELIMITER $$
create procedure USP_DangNhap(p_userName VARCHAR(255),p_passWord VARCHAR(255))
BEGIN
select * from ShoesStoreManagement.NGUOIDUNG where TenDangNhap=p_userName and MatKhau=p_passWord;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetListNguoiDung()
BEGIN
select * from ShoesStoreManagement.NGUOIDUNG ;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetNguoiDung(p_MaNguoiDung int )
BEGIN
select * from ShoesStoreManagement.NGUOIDUNG where NGUOIDUNG.MaNguoiDung = p_MaNguoiDung;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemNguoiDung(p_TenNguoiDung NVARCHAR(1000),p_TenDangNhap NVARCHAR(1000),
    p_MatKhau NVARCHAR(1000),p_MaChucVu int,p_SDT NVARCHAR(1000),p_DiaChi NVARCHAR(1000),p_Email NVARCHAR(1000),p_Avatar NVARCHAR(1000)
, p_isDeleted boolean )
BEGIN
INSERT INTO ShoesStoreManagement.NGUOIDUNG (TenNguoiDung ,TenDangNhap ,
    MatKhau ,MaChucVu ,SDT ,DiaChi ,Email ,Avatar , IsDeleted )
VALUES (p_TenNguoiDung ,p_TenDangNhap ,
    p_MatKhau ,p_MaChucVu ,p_SDT ,p_DiaChi ,p_Email ,p_Avatar , p_isDeleted );
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_XoaNguoiDung(p_userName VARCHAR(255))
BEGIN
DELETE  from NGUOIDUNG where NGUOIDUNG.TenDangNhap=p_username;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_CapNhatThongTinNguoiDung(p_TenNguoiDung NVARCHAR(1000),p_TenDangNhap NVARCHAR(1000),
    p_MatKhau NVARCHAR(1000),p_MaChucVu int,p_SDT NVARCHAR(1000),p_DiaChi NVARCHAR(1000),p_Email NVARCHAR(1000),p_Avatar NVARCHAR(1000)
, p_isDeleted boolean )
BEGIN
 UPDATE NGUOIDUNG 
 SET NGUOIDUNG.MatKhau=p_password,NGUOIDUNG.MaChucVu=p_MaChucVu,NGUOIDUNG.DiaChi=p_DiaChi,NGUOIDUNG.Email=p_Email,  
 NGUOIDUNG.SDT=p_SDT,NGUOIDUNG.IsDeleted=p_isDeleted,NGUOIDUNG.TenNguoiDung=p_TenNguoiDung
WHERE NGUOIDUNG.TenDangNhap=p_TenDangNhap;
end; $$
DELIMITER ;


DELIMITER $$
create procedure USP_GetListGiay()
BEGIN
Select E.TenGiay, F.TenHangSanXuat, E.TenMau, E.GioiTinh, E.SoLuong from (
Select C.TenGiay, C.MaHangSanXuat, C.GioiTinh, C.SoLuong, D.TenMau from (
Select A.TenGiay, A.MaMau, A.MaHangSanXuat, A.GioiTinh, B.SoLuong
from (Select MaGiay, Sum(SoLuong) as SoLuong from ShoesStoreManagement.CHITIETGIAY GROUP BY MaGiay) B
LEFT JOIN ShoesStoreManagement.GIAY A USING (MaGiay)) C left join ShoesStoreManagement.MAU D using (MaMau)) E 
LEFT JOIN ShoesStoreManagement.HANGSANXUAT F using (MaHangSanXuat);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetGiayByID(p_MaGiay int )
BEGIN
select * from ShoesStoreManagement.GIAY where GIAY.MaGiay= p_MaGiay;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemSanPham(p_TenGiay NVARCHAR(1000),
    p_MaHangSanXuat int,p_MaMau int ,p_GioiTinh NVARCHAR(1000),
    p_Anh NVARCHAR(1000),p_MoTa NVARCHAR(1000),
    p_TyLeLoiNhuan FLOAT, p_DonGiaNhap DECIMAL(17,2))
BEGIN
INSERT INTO ShoesStoreManagement.GIAY(TenGiay,
    MaHangSanXuat,MaMau,GioiTinh,Anh,MoTa,TyLeLoiNhuan, 
    DonGiaNhap)
VALUES (
    p_TenGiay ,
    p_MaHangSanXuat ,p_MaMau ,p_GioiTinh,p_Anh ,p_MoTa ,
    p_TyLeLoiNhuan , p_DonGiaNhap);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemChiTietSanPham(p_MaSize int)
BEGIN
    declare giayID int;
    set giayID = (select max(MaGiay) from ShoesStoreManagement.GIAY);
    INSERT INTO ShoesStoreManagement.CHITIETGIAY( MaSize,MaGiay)
    VALUES ( p_MaSize,giayID);
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_XoaSanPham(p_MaGiay int)
BEGIN
 UPDATE GIAY  
 SET GIAY.IsDeleted = true 
 WHERE GIAY.MaGiay =p_MaGiay;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_CapNhatThongTinGiay(p_MaGiay int,
    p_TenGiay NVARCHAR(1000),
    p_MaHangSanXuat int,p_MaMau int ,p_GioiTinh NVARCHAR(1000),
    p_Anh NVARCHAR(1000),p_MoTa NVARCHAR(1000),
    p_TyLeLoiNhuan FLOAT, p_DonGiaNhap DECIMAL(17,2))
BEGIN
 UPDATE GIAY  
 SET GIAY.TenGiay = p_TenGiay, GIAY.MaHangSanXuat = p_MaHangSanXuat,
    GIAY.MaMau= p_MaMau,GIAY.GioiTinh= p_GioiTinh,GIAY.Anh= p_Anh,
    GIAY.MoTa= p_MoTa,GIAY.TyLeLoiNhuan= p_TyLeLoiNhuan, 
    GIAY.DonGiaNhap =  p_DonGiaNhap
WHERE GIAY.MaGiay =p_MaGiay;
END; $$
DELIMITER ;







DELIMITER $$
create procedure USP_GetListPhieuBanHang()
BEGIN
Select C.SoPhieuBanHang,C.TenNguoiDung, C.NgayBan, C.TongTien, D.TenNguoiDung as TenKhachHang, D.SDT from (
Select A.SoPhieuBanHang, A.TongTien, A.NgayBan, B.TenNguoiDung, A.MaKhachHang
from (Select *  from ShoesStoreManagement.PHIEUBANHANG ) A 
left join  ShoesStoreManagement.NGUOIDUNG B USING (MaNguoiDung)) C
left join ShoesStoreManagement.NGUOIDUNG D on 
D.MaNguoiDung = C.MaKhachHang;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetPhieuBanHangByID(p_SoPhieuBanHang int )
BEGIN
Select C.SoPhieuBanHang,C.TenNguoiDung, C.NgayBan, C.TongTien, D.TenNguoiDung as TenKhachHang, D.SDT from (
Select A.SoPhieuBanHang, A.NgayBan, A.TongTien,  B.TenNguoiDung, A.MaKhachHang
from (Select *  from ShoesStoreManagement.PHIEUBANHANG ) A
LEFT JOIN   ShoesStoreManagement.NGUOIDUNG B USING (MaNguoiDung) where A.SoPhieuBanHang = p_SoPhieuBanHang) C
left join ShoesStoreManagement.NGUOIDUNG D on 
D.MaNguoiDung = C.MaKhachHang;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetPhieuBanHangByMaKhachHang(p_MaKhachHang int )
BEGIN
Select C.SoPhieuBanHang,C.TenNguoiDung, C.NgayBan, C.TongTien, D.TenNguoiDung as TenKhachHang, D.SDT from (
Select A.SoPhieuBanHang,  A.TongTien, A.NgayBan, B.TenNguoiDung, A.MaKhachHang
from (Select *  from ShoesStoreManagement.NGUOIDUNG) B
LEFT JOIN ShoesStoreManagement.PHIEUBANHANG A  USING (MaNguoiDung) where A.MaKhachHang = p_MaKhachHang) C
left join ShoesStoreManagement.NGUOIDUNG D on 
D.MaNguoiDung = C.MaKhachHang;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_ThemPhieuBanHang(
    p_MaKhachHang int,p_MaNguoiDung int ,
    p_NgayBan DATETIME ,p_PhuongThucThanhToan NVARCHAR(1000),
    p_TongTien DECIMAL(17,2), p_GhiChu NVARCHAR(100))
BEGIN
INSERT INTO ShoesStoreManagement.PHIEUBANHANG(MaKhachHang ,MaNguoiDung ,
    NgayBan ,PhuongThucThanhToan ,
    TongTien , GhiChu )
VALUES (
    p_MaKhachHang ,p_MaNguoiDung ,
    p_NgayBan ,p_PhuongThucThanhToan ,
    p_TongTien , p_GhiChu );
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_CapNhatThongTinPhieuBanHang(
    p_SoPhieuBanHang int,
    p_MaKhachHang int,p_MaNguoiDung int ,
    p_NgayBan DATETIME ,p_PhuongThucThanhToan NVARCHAR(1000),
    p_TongTien DECIMAL(17,2), p_GhiChu NVARCHAR(100))
BEGIN
UPDATE PHIEUBANHANG
SET PHIEUBANHANG.MaKhachHang= p_MaKhachHang, PHIEUBANHANG.MaNguoiDung= p_MaNguoiDung,
    PHIEUBANHANG.NgayBan= p_NgayBan,PHIEUBANHANG.PhuongThucThanhToan= p_PhuongThucThanhToan,
    PHIEUBANHANG.TongTien= p_TongTien,PHIEUBANHANG.TongTien= p_TongTien
WHERE PHIEUBANHANG.SoPhieuBanHang=p_SoPhieuBanHang;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemChiTietPhieuBanHang(p_MaChiTietGiay int,
        p_SoLuongMua int, p_GiaBan Decimal(17,2), p_ThanhTien Decimal(17,2))
BEGIN
    declare phieuBanHangID int;
    set phieuBanHangID = (select max(SoPhieuBanHang) from ShoesStoreManagement.PHIEUBANHANG);
    INSERT INTO ShoesStoreManagement.CHITIETPHIEUBANHANG(MaChiTietGiay ,SoPhieuBanHang, 
        SoLuongMua , GiaBan , ThanhTien)
    VALUES ( p_MaChiTietGiay ,phieuBanHangID,
        p_SoLuongMua , p_GiaBan , p_ThanhTien);
    Update ShoesStoreManagement.CHITIETGIAY 
    set CHITIETGIAY.SoLuong = CHITIETGIAY.SoLuong - p_SoLuongMua 
    where CHITIETGIAY.MaChiTietGiay = p_MaChiTietGiay;
END; $$
DELIMITER ;









DELIMITER $$
create procedure USP_GetListGioHang()
BEGIN
    Select * from ShoesStoreManagement.GIOHANG;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetGioHangByID(p_MaGioHang int )
BEGIN
    Select * from ShoesStoreManagement.GIOHANG 
    WHERE GIOHANG.MaGioHang = p_MaGioHang;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetGioHangByMaKhachHang(p_MaKhachHang int )
BEGIN
    Select * from ShoesStoreManagement.GIOHANG
    WHERE GIOHANG.MaNguoiDung= p_MaKhachHang;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemGioHang(
    p_MaKhachHang int,
    p_NgayLap DATETIME)
BEGIN
INSERT INTO ShoesStoreManagement.PHIEUBANHANG(MaNguoiDung ,
    NgayLap)
VALUES (
    p_MaKhachHang ,p_NgayLap);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemChiTietGioHang(p_MaChiTietGiay int,
        p_SoLuongMua int)
BEGIN
    declare gioHangID int;
    set gioHangID= (select max(MaGioHang) from ShoesStoreManagement.GIOHANG);
    INSERT INTO ShoesStoreManagement.CHITIETGIOHANG(MaGioHang,MaChiTietGiay ,
        SoLuongMua )
    VALUES ( p_MaChiTietGiay ,gioHangID,
        p_SoLuongMua );
END; $$
DELIMITER ;









insert into CHUCVU(TenChucVu, IsDeleted)values ("Admin", false);
insert into CHUCVU (TenChucVu, IsDeleted)values ("NhanVienBanHang", false );
insert into CHUCVU (TenChucVu, IsDeleted)values ("NhanVienKeToan", false);
insert into CHUCVU (TenChucVu, IsDeleted)values ("NhanVienKho", false);
insert into CHUCVU (TenChucVu, IsDeleted)values ("KhachHang", false);



insert into HANGSANXUAT(TenHangSanXuat)values ("Nike");
insert into HANGSANXUAT(TenHangSanXuat)values ("Puma");
insert into HANGSANXUAT(TenHangSanXuat)values ("Sneaker");
insert into HANGSANXUAT(TenHangSanXuat)values ("Adidas");
insert into HANGSANXUAT(TenHangSanXuat)values ("Converse");
insert into HANGSANXUAT(TenHangSanXuat)values ("Vans");
insert into HANGSANXUAT(TenHangSanXuat)values ("Fila");
insert into HANGSANXUAT(TenHangSanXuat)values ("Bitis");


insert into MAU(TenMau)values ("Purple");
insert into MAU(TenMau)values ("White");
insert into MAU(TenMau)values ("Pink");
insert into MAU(TenMau)values ("Blue");

insert into GIAY(    
    TenGiay , 
    MaHangSanXuat ,
    MaMau ,
    GioiTinh ,
    Anh ,
    MoTa,
    TyLeLoiNhuan , 
    DonGiaNhap 
    )values (
    "Van Old Skool Violet", 
    6,
    1,
    "Nu",
    "abcxyz",
    "abcxyz",
    0, 
    "1200000" 
);
insert into GIAY(    
    TenGiay , 
    MaHangSanXuat ,
    MaMau ,
    GioiTinh ,
    Anh ,
    MoTa,
    TyLeLoiNhuan , 
    DonGiaNhap 
    )values (
    "Fila Wave Neo", 
    7,
    2,
    "Nu",
    "abcxyz",
    "abcxyz",
    0, 
    "1250000" 
);

insert into GIAY(    
    TenGiay , 
    MaHangSanXuat ,
    MaMau ,
    GioiTinh ,
    Anh ,
    MoTa,
    TyLeLoiNhuan , 
    DonGiaNhap 
    )values (
    "Converse 70s Hightop ", 
    5,
    4,
    "Unisex",
    "abcxyz",
    "abcxyz",
    0, 
    "1000000" 
);



insert into SIZE(TenSize)values ("38");
insert into SIZE(TenSize)values ("39");
insert into SIZE(TenSize)values ("40");
insert into SIZE(TenSize)values ("41");
insert into SIZE(TenSize)values ("42");
insert into SIZE(TenSize)values ("43");


insert into CHITIETGIAY(    
    MaSize,
    MaGiay,
    SoLuong 
    )values (
    1,
    1,
    100
);

insert into CHITIETGIAY(    
    MaSize,
    MaGiay,
    SoLuong 
    )values (
    2,
    1,
    100
);
insert into CHITIETGIAY(    
    MaSize,
    MaGiay,
    SoLuong 
    )values (
    3,
    1,
    200
);




