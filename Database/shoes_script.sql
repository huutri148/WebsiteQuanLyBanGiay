drop database ShoesStoreManagement;
create schema ShoesStoreManagement ;
use ShoesStoreManagement;
ALTER DATABASE ShoesStoreManagement CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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
    MaGiay INT auto_increment PRIMARY KEY,
    TenGiay NVARCHAR(100) NOT NULL, 
    MaHangSanXuat INT NOT NULL,
    MaMau INT NOT NULL,
    GioiTinh varchar(100) DEFAULT "Unisex",
    Anh VARCHAR(1000),
    MoTa NVARCHAR(1000),
    DonGiaBan DECIMAL(17,0) DEFAULT 0,
    TongSoLuong int default 0,
    DaBan INT default 0,
    IsDeleted BOOLEAN DEFAULT false
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
    IsDeleted BOOLEAN default false 
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
    TongTien DECIMAL(17,0) DEFAULT 0,
    GhiChu NVARCHAR(1000) 
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
    GiaBan DECIMAL(17,0) DEFAULT 0,
    ThanhTien DECIMAL(17,0) DEFAULT 0,
    CONSTRAINT PK_CHITIETPHIEUBANHANG PRIMARY KEY (MaChiTietGiay, SoPhieuBanHang)
);

alter table CHITIETPHIEUBANHANG
add constraint CHITIETPHIEUBANHANG_CHITIETGIAY_FK
foreign key(MaChiTietGiay) references CHITIETGIAY(MaChiTietGiay);


alter table CHITIETPHIEUBANHANG
add constraint CHITIETPHIEUBANHANG_PHIEUBANHANG_FK
foreign key(SoPhieuBanHang) references PHIEUBANHANG(SoPhieuBanHang);


CREATE TABLE BAOCAOBANHANG
(
    MaBaoCaoBanHang int auto_increment PRIMARY KEY,
    MaNguoiDung int not null,
    NgayBatDau DATETIME DEFAULT CURRENT_TIMESTAMP,
    NgayKetThuc DATETIME DEFAULT CURRENT_TIMESTAMP,
    SoLuongPhieuBanHang int DEFAULT 0,
    TongDoanhThu int DEFAULT 0,
    IsDeleted boolean default false 
);

alter table BAOCAOBANHANG
add constraint BAOCAOBANHANG_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);


CREATE TABLE CHITIETBAOCAOBANHANG
(
    MaBaoCaoBanHang int not null,
    Ngay DATETIME not null,
    SoLuongPhieuBan int default 0,
    DoanhThu DECIMAL(17,0) default 0,
    CONSTRAINT PK_CHITIETPHIEUBANHANG PRIMARY KEY (MaBaoCaoBanHang, Ngay)
);

alter table CHITIETBAOCAOBANHANG
add constraint CHITIETBAOCAOBANHANG_BAOCAOBANHANG_FK
foreign key(MaBaoCaoBanHang) references BAOCAOBANHANG(MaBaoCaoBanHang);

CREATE TABLE GIOHANG 
(
    MaGioHang int auto_increment PRIMARY KEY,
    MaNguoiDung int not null,
    NgayLap DATETIME default CURRENT_TIMESTAMP,
    PhuongThucThanhToan NVARCHAR(100),
    TongTien DECIMAL(17,0) default 0,
    TrangThai varchar(100),
    IsDeleted BOOLEAN DEFAULT false
);


alter table GIOHANG
add constraint GIOHANG_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);


CREATE TABLE CHITIETGIOHANG
(
    MaGioHang int not null,
    MaChiTietGiay int not null,
    SoLuongMua int DEFAULT 0, 
    GiaBan Decimal(17,0) default 0,
    ThanhTien DECIMAL(17,0) default 0,
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
    TrangThai varchar(100),
    IsDeleted BOOLEAN default false
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
    TongChi DECIMAL(17,0) default 0 , 
    TongDoanhThu DECIMAL(17,0) default 0,
    TongLoiNhuan DECIMAL(17,0) default 0,
    IsDeleted boolean  default false
);
alter table BAOCAOLOINHUAN 
add constraint BAOCAOLOINHUAN_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);


CREATE TABLE CHITIETBAOCAOLOINHUAN
(
    MaBaoCaoLoiNhuan int NOT NULL,
    Chi DECIMAL(17,0) not null,
    DoanhThu DECIMAL(17,0) not null,
    LoiNhuan DECIMAL(17,0) not null,
    TyLeLoiNhuan FLOAT not null,
    Ngay DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_CHITIETPHIEUDATHANG PRIMARY KEY (MaBaoCaoLoiNhuan, Ngay)
);
alter table CHITIETBAOCAOLOINHUAN 
add constraint CHITIETBAOCAOLOINHUAN_BAOCAOLOINHUAN_FK
foreign key(MaBaoCaoLoiNhuan) references BAOCAOLOINHUAN(MaBaoCaoLoiNhuan);





CREATE TABLE PHIEUNHAPKHO 
(
    SoPhieuNhapKho int auto_increment PRIMARY KEY,
    MaNguoiDung int not null,
    MaNhaCungCap int not null,
    NgayNhapKho DATETIME DEFAULT CURRENT_TIMESTAMP,
    GhiChu nvarchar(1000),
    TongTien Decimal(17,0) default 0,
    IsPaid boolean  default false,
    IsDeleted boolean  default false
);
alter table PHIEUNHAPKHO 
add constraint PHIEUNHAPKHO_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);


alter table PHIEUNHAPKHO 
add constraint PHIEUNHAPKHO_NHACUNGCAP_FK
foreign key(MaNhaCungCap) references NHACUNGCAP(MaNhaCungCap);



CREATE TABLE CHITIETPHIEUNHAPKHO
(
    MaChiTietGiay int not null, 
    SoPhieuNhapKho int not null,
    SoLuongNhap int default 0,
    GiaNhap DECIMAL(17,0) default 0,
    ThanhTien Decimal(17,0) default 0,
    CONSTRAINT PK_CHITIETPHIEUDATHANG PRIMARY KEY (SoPhieuNhapKho, MaChiTietGiay)
);

alter table CHITIETPHIEUNHAPKHO 
add constraint CHITIETPHIEUNHAPKHO_CHITIETGIAY_FK
foreign key(MaChiTietGiay) references CHITIETGIAY(MaChiTietGiay);




CREATE TABLE PHIEUCHI
(
    SoPhieuChi int auto_increment PRIMARY KEY,
    MaNguoiDung int not null,
    SoPhieuNhapKho int not null,
    NgayLap DATETIME DEFAULT CURRENT_TIMESTAMP,
    GhiChu nvarchar(1000) ,
    TongTien Decimal(17,0) default 0,
    IsDeleted boolean  default false
);
alter table PHIEUCHI
add constraint PHIEUCHI_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);

alter table PHIEUCHI
add constraint PHIEUCHI_PHIEUNHAPKHO_FK
foreign key(SoPhieuNhapKho) references PHIEUNHAPKHO(SoPhieuNhapKho);


CREATE TABLE TODO
(
    MaTODO int auto_increment PRIMARY KEY,
    NoiDung nvarchar(1000),
    NgayLap DATETIME DEFAULT CURRENT_TIMESTAMP,
    isDone boolean default false,
    IsDeleted BOOLEAN DEFAULT false
);



CREATE TABLE CHATROOM
(
    MaPhong int auto_increment PRIMARY key,
    MaNguoiDung int,
    ChatText nvarchar(1000),
    ChatTime DATETIME DEFAULT CURRENT_TIMESTAMP
);

alter table CHATROOM
add constraint CHATROOM_NGUOIDUNG_FK
foreign key(MaNguoiDung) references NGUOIDUNG(MaNguoiDung);


CREATE TABLE NOIDUNGCHAT
(
    MessageID int auto_increment PRIMARY Key,
    MessageTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    MessageContent nvarchar(1000),
    IsFromAdmin BOOLEAN default false,
    MaPhong int
);


alter table NOIDUNGCHAT
add constraint NOIDUNGCHAT_CHATROOM_FK
foreign key(MaPhong) references CHATROOM(MaPhong);



DELIMITER $$
create procedure USP_GetListChatRoom()
BEGIN
select * from ShoesStoreManagement.CHATROOM;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_GetListDetailRoom()
BEGIN
select * from ShoesStoreManagement.NOIDUNGCHAT;
END; $$
DELIMITER ;



DELIMITER $$
create procedure USP_GetNoiDungChatRoom(p_RoomID int)
BEGIN
select * from ShoesStoreManagement.NOIDUNGCHAT where NOIDUNGCHAT.MaPhong = p_RoomID;
END; $$
DELIMITER ;



DELIMITER $$
create procedure USP_ThemChatRoom(p_MaNguoiDung int, p_ChatTime datetime, p_ChatText nvarchar(1000))
BEGIN
    Insert Into ShoesStoreManagement.CHATROOM(
        MaNguoiDung, ChatTime, ChatText
    ) VALUES (
        p_MaNguoiDung, p_ChatTime, p_ChatText
    );
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_ThemNoiDungChatRoom(p_RoomID int, p_time nvarchar(1000), p_NoiDung nvarchar(1000), p_IsFromAdmin boolean)
BEGIN
    insert into ShoesStoreManagement.NOIDUNGCHAT(
        MaPhong, MessageTime, MessageContent, IsFromAdmin
    ) values(
        p_RoomID, STR_TO_DATE( p_time, '%d-%m-%Y %h:%i:%s'), p_NoiDung, p_IsFromAdmin
    );
END; $$
DELIMITER ;




DELIMITER $$
create procedure USP_GetListTODO()
BEGIN
select * from ShoesStoreManagement.TODO where TODO.IsDeleted = false;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_GetTODOByID(p_MaTODO int)
BEGIN
select * from ShoesStoreManagement.TODO where TODO.MaTODO = p_MaTODO and TODO.IsDeleted = false;
END; $$
DELIMITER ; 

DELIMITER $$
create procedure USP_ThemTODO(p_NoiDung NVARCHAR(1000))
BEGIN
INSERT INTO ShoesStoreManagement.TODO (NoiDung)
VALUES (p_NoiDung );
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_CapNhatTODO(p_MaTODO int, p_NoiDung NVARCHAR(1000), p_isDone boolean)
BEGIN
 UPDATE TODO 
 SET TODO.NoiDung=p_NoiDung,
 TODO.isDone=p_isDone
WHERE TODO.MaTODO=p_MaTODO;
end; $$
DELIMITER ;


DELIMITER $$
create procedure USP_XoaTODO(p_MaTODO int)
BEGIN
 UPDATE TODO 
 SET TODO.IsDeleted=true
WHERE TODO.MaTODO=p_MaTODO;
end; $$
DELIMITER ;






DELIMITER $$
create procedure USP_DangNhap(p_userName VARCHAR(255),p_passWord VARCHAR(255))
BEGIN
select * from ShoesStoreManagement.NGUOIDUNG where TenDangNhap=p_userName ;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetListNguoiDung()
BEGIN
select * from ShoesStoreManagement.NGUOIDUNG ;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetListKhachHang()
BEGIN
select * from ShoesStoreManagement.NGUOIDUNG where NGUOIDUNG.MaChucVu = 5 ;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetListNhanVien()
BEGIN
select * from ShoesStoreManagement.NGUOIDUNG where NGUOIDUNG.MaChucVu <> 5 ;
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
create procedure USP_XoaChucVu(p_MaChucVu int)
BEGIN
    UPDATE ShoesStoreManagement.CHUCVU 
    SET CHUCVU.IsDeleted = true
    WHERE CHUCVU.MaChucVu=p_MaChucVu;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_ThemChucVu(p_TenChucVu VARCHAR(255))
BEGIN
INSERT INTO ShoesStoreManagement.CHUCVU(TenChucVu) values (p_TenChucVu);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_SuaChucVu(p_MaChucVu int, p_TenChucVu VARCHAR(255))
BEGIN
    UPDATE ShoesStoreManagement.CHUCVU 
    SET CHUCVU.TenChucVu = p_TenChucVu
    WHERE CHUCVU.MaChucVu=p_MaChucVu;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetListQuyen()
BEGIN
SELECT * from ShoesStoreManagement.QUYEN;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetListPhanQuyen()
BEGIN
SELECT * from ShoesStoreManagement.PHANQUYEN;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetListPhanQuyenById(p_MaChucVu int)
BEGIN
SELECT MaQuyen from ShoesStoreManagement.PHANQUYEN where PHANQUYEN.MaChucVu = p_MaChucVu;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemPhanQuyen(p_MaChucVu int, p_MaQuyen int)
BEGIN
INSERT INTO ShoesStoreManagement.PHANQUYEN(MaChucVu,MaQuyen) values (p_MaChucVu,p_MaQuyen);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_XoaTrangPhanQuyen(p_MaChucVu int)
BEGIN
DELETE from ShoesStoreManagement.PHANQUYEN where PHANQUYEN.MaChucVu = p_MaChucVu;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_GetListGiay( )
BEGIN
select * from ShoesStoreManagement.GIAY ;
END; $$
DELIMITER ;



DELIMITER $$
create procedure USP_GetGiayByID(p_MaGiay int )
BEGIN
select * from ShoesStoreManagement.GIAY where GIAY.MaGiay= p_MaGiay;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetSizeGiayByID(p_MaGiay int )
BEGIN
select * from ShoesStoreManagement.CHITIETGIAY where CHITIETGIAY.MaGiay= p_MaGiay;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetListSize( )
BEGIN
select * from ShoesStoreManagement.SIZE;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemSanPham(p_TenGiay NVARCHAR(1000),
    p_MaHangSanXuat int,p_MaMau int ,p_GioiTinh NVARCHAR(1000),
    p_Anh NVARCHAR(1000),p_MoTa NVARCHAR(1000), p_DonGiaBan DECIMAL(17,0))
BEGIN
INSERT INTO ShoesStoreManagement.GIAY(TenGiay,
    MaHangSanXuat,MaMau,GioiTinh,Anh,MoTa,
    DonGiaBan)
VALUES (
    p_TenGiay ,
    p_MaHangSanXuat ,p_MaMau ,p_GioiTinh,p_Anh ,p_MoTa, p_DonGiaBan);
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
    p_Anh NVARCHAR(1000),p_MoTa NVARCHAR(1000), p_DonGiaBan DECIMAL(17,0))
BEGIN
 UPDATE GIAY  
 SET GIAY.TenGiay = p_TenGiay, GIAY.MaHangSanXuat = p_MaHangSanXuat,
    GIAY.MaMau= p_MaMau,GIAY.GioiTinh= p_GioiTinh,GIAY.Anh= p_Anh,
    GIAY.DonGiaBan =  p_DonGiaBan
WHERE GIAY.MaGiay =p_MaGiay;
END; $$
DELIMITER ;




DELIMITER $$
create procedure USP_GetListChucVu()
BEGIN
    Select * from ShoesStoreManagement.CHUCVU where CHUCVU.IsDeleted = false ;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetListMau()
BEGIN
    Select * from ShoesStoreManagement.MAU
    where MAU.IsDeleted = false;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetMauByID(p_MaMau int )
BEGIN
    Select * from ShoesStoreManagement.MAU
    WHERE MAU.MaMau = p_MaMau and  MAU.IsDeleted = false;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_ThemMau(
    p_TenMau  nvarchar(1000))
BEGIN
INSERT INTO ShoesStoreManagement.MAU(TenMau)
VALUES (p_TenMau);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_CapNhatThongTinMau(p_MaMau int,
    p_TenMau nvarchar(1000))
BEGIN
UPDATE MAU
SET  
    MAU.TenMau= p_TenMau
WHERE MAU.MaMau = p_MaMau;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_XoaMau(p_MaMau int)
BEGIN
    Update ShoesStoreManagement.MAU
    set MAU.IsDeleted = true 
    where MAU.MaMau= p_MaMau;
END; $$
DELIMITER ;





DELIMITER $$
create procedure USP_GetListPhieuNhapKho()
BEGIN
Select C.SoPhieuNhapKho,C.TenNguoiDung, C.NgayNhapKho, C.TongTien, C.GhiChu, D.TenNhaCungCap, C.MaNhaCungCap, C.IsPaid 
from (
    Select A.SoPhieuNhapKho, A.TongTien, A.NgayNhapKho, B.TenNguoiDung, A.MaNhaCungCap, A.GhiChu, A.IsPaid
    from (Select *  from ShoesStoreManagement.PHIEUNHAPKHO where IsDeleted = false) A 
    left join  ShoesStoreManagement.NGUOIDUNG B USING (MaNguoiDung)) C
left join ShoesStoreManagement.NHACUNGCAP D on 
D.MaNhaCungCap= C.MaNhaCungCap;
END; $$
DELIMITER ;



DELIMITER $$
create procedure USP_GetPhieuNhapKhoByID(p_SoPhieuNhapKho int)
BEGIN
Select C.SoPhieuNhapKho,C.TenNguoiDung, C.NgayNhapKho, C.TongTien, C.MaNhaCungCap, D.TenNhaCungCap from (
Select A.SoPhieuNhapKho, A.TongTien, A.NgayNhapKho, B.TenNguoiDung, A.MaNhaCungCap
from (Select *  from ShoesStoreManagement.PHIEUNHAPKHO where PHIEUNHAPKHO.SoPhieuNhapKho = p_SoPhieuNhapKho) A 
left join  ShoesStoreManagement.NGUOIDUNG B USING (MaNguoiDung)) C
left join ShoesStoreManagement.NHACUNGCAP D on 
D.MaNhaCungCap= C.MaNhaCungCap;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_ThemPhieuNhapKho(
    p_MaNhaCungCap int,p_MaNguoiDung int ,
    p_NgayNhapKho DATETIME, 
    p_TongTien DECIMAL(17,0), p_GhiChu NVARCHAR(1000))
BEGIN
INSERT INTO ShoesStoreManagement.PHIEUNHAPKHO(MaNhaCungCap,MaNguoiDung,NgayNhapKho,TongTien , GhiChu )
VALUES (
    p_MaNhaCungCap,p_MaNguoiDung ,
    p_NgayNhapKho,
    p_TongTien , p_GhiChu );
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_ThemChiTietPhieuNhapKho(p_MaChiTietGiay int,
        p_SoLuongNhap int, p_GiaNhap Decimal(17,0), p_ThanhTien Decimal(17,0))
BEGIN
    declare phieuNhapKhoID int;
    set phieuNhapKhoID = (select max(SoPhieuNhapKho) from ShoesStoreManagement.PHIEUNHAPKHO);
    INSERT INTO ShoesStoreManagement.CHITIETPHIEUNHAPKHO(MaChiTietGiay ,SoPhieuNhapKho, 
        SoLuongNhap, GiaNhap, ThanhTien)
    VALUES ( p_MaChiTietGiay ,phieuNhapKhoID,
        p_SoLuongNhap, p_GiaNhap, p_ThanhTien);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemChiTietPhieuNhapKhoByID(p_SoPhieuNhapKho int, p_MaChiTietGiay int,
        p_SoLuongNhap int, p_GiaNhap Decimal(17,0), p_ThanhTien Decimal(17,0))
BEGIN
    INSERT INTO ShoesStoreManagement.CHITIETPHIEUNHAPKHO(MaChiTietGiay ,SoPhieuNhapKho, 
        SoLuongNhap, GiaNhap, ThanhTien)
    VALUES ( p_MaChiTietGiay ,p_SoPhieuNhapKho,
        p_SoLuongNhap, p_GiaNhap, p_ThanhTien);
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_CapNhatChiTietPhieuNhapKho(p_SoPhieuNhapKho int, p_MaChiTietGiay int,
        p_SoLuongNhap int, p_GiaNhap Decimal(17,0), p_ThanhTien Decimal(17,0))
BEGIN
    declare giayID int;
    set giayID = (select MaGiay 
                  from ShoesStoreManagement.CHITIETGIAY 
                  where CHITIETGIAY.MaChiTietGiay = p_MaChiTietGiay);

    INSERT INTO ShoesStoreManagement.CHITIETPHIEUNHAPKHO(MaChiTietGiay ,SoPhieuNhapKho, SoLuongNhap, GiaNhap, ThanhTien)
    VALUES ( p_MaChiTietGiay ,p_SoPhieuNhapKho, p_SoLuongNhap, p_GiaNhap, p_ThanhTien);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_CapNhatSanPhamNhapKho(p_SoPhieuNhapKho int, p_MaChiTietGiay int,
        p_SoLuongNhap int)
BEGIN
    declare giayID int;
    set giayID = (select MaGiay 
                  from ShoesStoreManagement.CHITIETGIAY 
                  where CHITIETGIAY.MaChiTietGiay = p_MaChiTietGiay);

    Update ShoesStoreManagement.CHITIETGIAY 
        set CHITIETGIAY.SoLuong = CHITIETGIAY.SoLuong +  p_SoLuongNhap
        where CHITIETGIAY.MaChiTietGiay = p_MaChiTietGiay;

    Update ShoesStoreManagement.GIAY 
        set GIAY.TongSoLuong = GIAY.TongSoLuong + p_SoLuongNhap 
        where GIAY.MaGiay = giayID;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_GetChiTietPhieuNhapKhoByID(p_SoPhieuNhapKho int)
BEGIN
    Select C.Anh, C.TenGiay, C.GioiTinh, D.TenSize, D.MaSize, A.GiaNhap, A.SoLuongNhap, A.ThanhTien, A.SoPhieuNhapKho, A.MaChiTietGiay
    from ShoesStoreManagement.CHITIETPHIEUNHAPKHO A 
    left join ShoesStoreManagement.CHITIETGIAY B 
    on A.MaChiTietGiay = B.MaChiTietGiay
    left join ShoesStoreManagement.GIAY C
    on C.MaGiay = B.MaGiay
    left join ShoesStoreManagement.SIZE D
    on D.MaSize = B.MaSize 
    where A.SoPhieuNhapKho = p_SoPhieuNhapKho;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_CapNhatThongTinPhieuNhapKho(
    p_SoPhieuNhapKho int, 
    p_MaNhaCungCap int,p_MaNguoiDung int ,
    p_NgayNhapKho DATETIME, 
    p_TongTien DECIMAL(17,0), p_GhiChu NVARCHAR(1000))
BEGIN
UPDATE PHIEUNHAPKHO
SET PHIEUNHAPKHO.MaNhaCungCap= p_MaNhaCungCap, PHIEUNHAPKHO.MaNguoiDung= p_MaNguoiDung,
    PHIEUNHAPKHO.NgayNhapKho= p_NgayNhapKho,
    PHIEUNHAPKHO.TongTien= p_TongTien,PHIEUNHAPKHO.GhiChu= p_GhiChu
WHERE PHIEUNHAPKHO.SoPhieuNhapKho=p_SoPhieuNhapKho;
END; $$
DELIMITER ;



DELIMITER $$
create procedure USP_XoaTrangPhieuNhapKho(p_SoPhieuNhapKho int)
BEGIN
    DELETE FROM CHITIETPHIEUNHAPKHO WHERE SoPhieuNhapKho= p_SoPhieuNhapKho;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_XoaPhieuNhapKho(
        p_SoPhieuNhapKho int)
BEGIN
    Update ShoesStoreManagement.PHIEUNHAPKHO
    set PHIEUNHAPKHO.IsDeleted = true 
    where PHIEUNHAPKHO.SoPhieuNhapKho= p_SoPhieuNhapKho;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_GetListPhieuChi()
BEGIN
Select C.SoPhieuNhapKho,C.TenNguoiDung, C.NgayLap,C.SoPhieuChi, C.TongTien, E.TenNhaCungCap
from (
    Select A.SoPhieuChi, A.TongTien, A.NgayLap, B.TenNguoiDung, D.MaNhaCungCap, A.SoPhieuNhapKho
    from (Select *  from ShoesStoreManagement.PHIEUCHI where IsDeleted = false) A 
    left join  ShoesStoreManagement.NGUOIDUNG B USING (MaNguoiDung)
    left join ShoesStoreManagement.PHIEUNHAPKHO D USING (SoPhieuNhapKho)) C
left join ShoesStoreManagement.NHACUNGCAP E USING (MaNhaCungCap) ;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_GetPhieuChiByID(p_SoPhieuChi int)
BEGIN
Select C.SoPhieuNhapKho,C.TenNguoiDung, C.NgayLap,C.SoPhieuChi, C.TongTien, E.TenNhaCungCap
from (
    Select A.SoPhieuChi, A.TongTien, A.NgayLap, B.TenNguoiDung, D.MaNhaCungCap, A.SoPhieuNhapKho
    from (Select *  from ShoesStoreManagement.PHIEUCHI where IsDeleted = false and SoPhieuChi = p_SoPhieuChi) A 
    left join  ShoesStoreManagement.NGUOIDUNG B USING (MaNguoiDung)
    left join ShoesStoreManagement.PHIEUNHAPKHO D USING (SoPhieuNhapKho)) C
left join ShoesStoreManagement.NHACUNGCAP E USING (MaNhaCungCap) ;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemPhieuChi(
    p_SoPhieuNhapKho int,p_MaNguoiDung int ,
    p_NgayLap DATETIME, 
    p_TongTien DECIMAL(17,0), p_GhiChu NVARCHAR(1000))
BEGIN
    INSERT INTO ShoesStoreManagement.PHIEUCHI(
    SoPhieuNhapKho,MaNguoiDung ,
    NgayLap , 
    TongTien , GhiChu )
    VALUES (
    p_SoPhieuNhapKho,
    p_MaNguoiDung ,
    p_NgayLap , 
    p_TongTien , 
    p_GhiChu 
    );
    Update ShoesStoreManagement.PHIEUNHAPKHO 
    set PHIEUNHAPKHO.IsPaid = true
    where PHIEUNHAPKHO.SoPhieuNhapKho = p_SoPhieuNhapKho;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_GetListNhaCungCap()
BEGIN
    Select * from ShoesStoreManagement.NHACUNGCAP
    where NHACUNGCAP.IsDeleted = false;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetNhaCungCapByID(p_MaNhaCungCap int )
BEGIN
    Select * from ShoesStoreManagement.NHACUNGCAP
    WHERE NHACUNGCAP.MaNhaCungCap = p_MaNhaCungCap and  NHACUNGCAP.IsDeleted = false;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_ThemNhaCungCap(
    p_TenNhaCungCap nvarchar(1000), p_SDT NVARCHAR(20), p_DIACHI nvarchar(1000),
    p_Email nvarchar(1000))
BEGIN
INSERT INTO ShoesStoreManagement.NHACUNGCAP(
    TenNhaCungCap , SDT, DiaChi ,
    Email  )
VALUES (
    p_TenNhaCungCap ,
    p_SDT ,
    p_DIACHI ,
    p_Email );
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_CapNhatThongTinNhaCungCap(p_MaNhaCungCap int,
    p_TenNhaCungCap nvarchar(1000), p_SDT NVARCHAR(20), p_DIACHI nvarchar(1000),
    p_Email nvarchar(1000))
BEGIN
UPDATE NHACUNGCAP
SET  
    NHACUNGCAP.TenNhaCungCap= p_TenNhaCungCap,
    NHACUNGCAP.SDT= p_SDT,
    NHACUNGCAP.DiaChi= p_DiaChi,NHACUNGCAP.Email= p_Email
WHERE NHACUNGCAP.MaNhaCungCap= p_MaNhaCungCap;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_XoaNhaCungCap(p_MaNhaCungCap int)
BEGIN
    Update ShoesStoreManagement.NHACUNGCAP
    set NHACUNGCAP.IsDeleted = true 
    where NHACUNGCAP.MaNhaCungCap= p_MaNhaCungCap;
END; $$
DELIMITER ;






DELIMITER $$
create procedure USP_GetListHangSanXuat()
BEGIN
    Select * from ShoesStoreManagement.HANGSANXUAT
    where HANGSANXUAT.IsDeleted = false;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetHangSanXuatByID(p_MaHangSanXuat int )
BEGIN
    Select * from ShoesStoreManagement.HANGSANXUAT
    WHERE HANGSANXUAT.MaHangSanXuat = p_MaHangSanXuat and  HANGSANXUAT.IsDeleted = false;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_ThemHangSanXuat(
    p_TenHangSanXuat  nvarchar(1000))
BEGIN
INSERT INTO ShoesStoreManagement.HANGSANXUAT(TenHangSanXuat)
VALUES (p_TenHangSanXuat);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_CapNhatThongTinHangSanXuat(p_MaHangSanXuat int,
    p_TenHangSanXuat nvarchar(1000))
BEGIN
UPDATE HANGSANXUAT
SET  
    HANGSANXUAT.TenHangSanXuat= p_TenHangSanXuat
WHERE HANGSANXUAT.MaHangSanXuat = p_MaHangSanXuat;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_XoaHangSanXuat(p_MaHangSanXuat int)
BEGIN
    Update ShoesStoreManagement.HANGSANXUAT
    set HANGSANXUAT.IsDeleted = true 
    where HANGSANXUAT.MaHangSanXuat= p_MaHangSanXuat;
END; $$
DELIMITER ;







DELIMITER $$
create procedure USP_GetListPhieuBanHang()
BEGIN
Select C.SoPhieuBanHang,C.TenNguoiDung, C.NgayBan, C.PhuongThucThanhToan, C.TongTien, C.GhiChu, D.TenNguoiDung as TenKhachHang, D.SDT, C.MaKhachHang
from (
    Select A.SoPhieuBanHang, A.TongTien, A.NgayBan, B.TenNguoiDung, A.MaKhachHang, A.PhuongThucThanhToan, A.GhiChu
    from (Select *  from ShoesStoreManagement.PHIEUBANHANG ) A 
    left join  ShoesStoreManagement.NGUOIDUNG B USING (MaNguoiDung)) C
left join ShoesStoreManagement.NGUOIDUNG D on 
D.MaNguoiDung = C.MaKhachHang;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetPhieuBanHangByID(p_SoPhieuBanHang int )
BEGIN
Select C.SoPhieuBanHang,C.TenNguoiDung, C.NgayBan,C.PhuongThucThanhToan, C.TongTien, D.TenNguoiDung as TenKhachHang, D.SDT from (
Select A.SoPhieuBanHang, A.NgayBan, A.TongTien,  B.TenNguoiDung, A.MaKhachHang, A.PhuongThucThanhToan
from (Select *  from ShoesStoreManagement.PHIEUBANHANG ) A
LEFT JOIN   ShoesStoreManagement.NGUOIDUNG B USING (MaNguoiDung) where A.SoPhieuBanHang = p_SoPhieuBanHang) C
left join ShoesStoreManagement.NGUOIDUNG D on 
D.MaNguoiDung = C.MaKhachHang;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetPhieuBanHangByMaKhachHang(p_MaKhachHang int )
BEGIN
Select C.SoPhieuBanHang,C.TenNguoiDung, C.NgayBan,C.PhuongThucThanhToan, C.TongTien, D.TenNguoiDung as TenKhachHang, D.SDT from (
Select A.SoPhieuBanHang,  A.TongTien, A.NgayBan, B.TenNguoiDung, A.MaKhachHang, A.PhuongThucThanhToan
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
    p_TongTien DECIMAL(17,0), p_GhiChu NVARCHAR(1000))
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
    p_TongTien DECIMAL(17,0), p_GhiChu NVARCHAR(1000))
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
        p_SoLuongMua int, p_GiaBan Decimal(17,0), p_ThanhTien Decimal(17,2))
BEGIN
    declare phieuBanHangID int;
    declare giayID int;
    set phieuBanHangID = (select max(SoPhieuBanHang) from ShoesStoreManagement.PHIEUBANHANG);
    set giayID = (select MaGiay 
                  from ShoesStoreManagement.CHITIETGIAY 
                  where CHITIETGIAY.MaChiTietGiay = p_MaChiTietGiay);
    INSERT INTO ShoesStoreManagement.CHITIETPHIEUBANHANG(MaChiTietGiay ,SoPhieuBanHang, 
        SoLuongMua , GiaBan , ThanhTien)
    VALUES ( p_MaChiTietGiay ,phieuBanHangID,
        p_SoLuongMua , p_GiaBan , p_ThanhTien);
    Update ShoesStoreManagement.CHITIETGIAY 
    set CHITIETGIAY.SoLuong = CHITIETGIAY.SoLuong - p_SoLuongMua 
    where CHITIETGIAY.MaChiTietGiay = p_MaChiTietGiay;
    Update ShoesStoreManagement.GIAY 
    set GIAY.TongSoLuong = GIAY.TongSoLuong - p_SoLuongMua,
        GIAY.DaBan = GIAY.DaBan + p_SoLuongMua 
    where GIAY.MaGiay = giayID;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetChiTietPhieuBanHangByID(p_SoPhieuBanHang int)
BEGIN
    Select C.Anh, C.TenGiay, C.GioiTinh, D.TenSize, A.GiaBan, A.SoLuongMua, A.ThanhTien, A.SoPhieuBanHang, A.MaChiTietGiay
    from ShoesStoreManagement.CHITIETPHIEUBANHANG A 
    left join ShoesStoreManagement.CHITIETGIAY B 
    on A.MaChiTietGiay = B.MaChiTietGiay
    left join ShoesStoreManagement.GIAY C
    on C.MaGiay = B.MaGiay
    left join ShoesStoreManagement.SIZE D
    on D.MaSize = B.MaSize 
    where A.SoPhieuBanHang = p_SoPhieuBanHang;
END; $$
DELIMITER ;



DELIMITER $$
create procedure USP_GetListPhieuDatHang()
BEGIN
    Select * from PHIEUDATHANG where PHIEUDATHANG.IsDeleted = false;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetPhieuDatHangByID(p_SoPhieuDatHang int )
BEGIN
    Select * from PHIEUDATHANG where PHIEUDATHANG.SoPhieuDatHang = p_SoPhieuDatHang;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetPhieuDatHangByNhaCungCap(p_MaNhaCungCap int )
BEGIN
    Select * from PHIEUDATHANG where PHIEUDATHANG.MaNhaCungCap = p_MaNhaCungCap and PHIEUDATHANG.IsDeleted = false;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_ThemPhieuDatHang(
    p_MaNhaCungCap int,p_MaNguoiDung int ,
    p_NgayLap DATETIME, p_TrangThai varchar(100))
BEGIN
INSERT INTO ShoesStoreManagement.PHIEUDATHANG(MaNhaCungCap ,MaNguoiDung ,
    NgayLap , TrangThai)
VALUES (
    p_MaNhaCungCap ,p_MaNguoiDung ,
    p_NgayLap ,p_TrangThai);
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_CapNhatThongTinPhieuDatHang(
    p_SoPhieuDatHang int,
    p_MaNhaCungCap int,p_MaNguoiDung int ,
  p_TrangThai NVARCHAR(100))
BEGIN
UPDATE PHIEUDATHANG
SET PHIEUDATHANG.MaNguoiDung= p_MaNguoiDung,
    PHIEUDATHANG.MaNhaCungCap = p_MaNhaCungCap,
    PHIEUDATHANG.TrangThai= p_TrangThai
WHERE PHIEUDATHANG.SoPhieuDatHang=p_SoPhieuDatHang;
END; $$
DELIMITER ;



DELIMITER $$
create procedure USP_ThemChiTietPhieuDatHang(p_MaChiTietGiay int,
        p_SoLuongDat int)
BEGIN
    declare phieuDatHangID int;
    set phieuDatHangID = (select max(SoPhieuDatHang) from ShoesStoreManagement.PHIEUDATHANG);
    INSERT INTO ShoesStoreManagement.CHITIETPHIEUDATHANG(MaChiTietGiay ,SoPhieuDatHang, 
        SoLuongDat)
    VALUES ( p_MaChiTietGiay ,phieuDatHangID,
        p_SoLuongDat);
END; $$
DELIMITER ;




DELIMITER $$
create procedure USP_XoaPhieuDatHang(p_SoPhieu int)
BEGIN
    UPDATE PHIEUDATHANG  
    SET PHIEUDATHANG.IsDeleted = true 
    WHERE PHIEUDATHANG.SoPhieuDatHang =p_SoPhieu;
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
    p_MaKhachHang int, p_PhuongThucThanhToan nvarchar(1000))
BEGIN
INSERT INTO ShoesStoreManagement.GIOHANG(MaNguoiDung,TrangThai,PhuongThucThanhToan)
VALUES (p_MaKhachHang,"Đang xử lý",p_PhuongThucThanhToan);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemChiTietGioHang(p_MaChiTietGiay int,
        p_SoLuongMua int, p_GiaBan DECIMAL(17,0), p_ThanhTien DECIMAL(17,0))
BEGIN
    declare gioHangID int;
    set gioHangID= (select max(MaGioHang) from ShoesStoreManagement.GIOHANG);
    INSERT INTO ShoesStoreManagement.CHITIETGIOHANG(MaGioHang,MaChiTietGiay ,
        SoLuongMua,GiaBan, ThanhTien)
    VALUES ( gioHangID,p_MaChiTietGiay ,
        p_SoLuongMua,p_GiaBan,p_ThanhTien);
    UPDATE GIOHANG
    SET GIOHANG.TongTien = GIOHANG.TongTien + p_ThanhTien
    WHERE GIOHANG.MaGioHang = gioHangID;    
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_XoaTrangGioHang(p_MaGioHang int)
BEGIN
    DELETE FROM CHITIETGIOHANG WHERE MaGioHang= p_MaGioHang;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_XoaGioHang(p_MaGioHang int)
BEGIN
    UPDATE GIOHANG
   SET GIOHANG.IsDeleted = true,
        GIOHANG.TrangThai = "Đã hủy"
   where GIOHANG.MaGioHang = p_MaGioHang;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_CapNhatGioHang(p_MaGioHang int)
BEGIN
    UPDATE GIOHANG
    SET GIOHANG.TrangThai = "Đã giao hàng"
     where GIOHANG.MaGioHang = p_MaGioHang;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_CapNhatChiTietGioHang(p_MaGioHang int,p_MaChiTietGiay int,
        p_SoLuongMua int)
BEGIN
    INSERT INTO ShoesStoreManagement.CHITIETGIOHANG(MaGioHang,MaChiTietGiay ,
        SoLuongMua )
    VALUES (p_MaGioHang, p_MaChiTietGiay , p_SoLuongMua );
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_GetChiTietGioHangByID(p_MaGioHang int)
BEGIN
    Select C.Anh, C.TenGiay, C.GioiTinh, A.GiaBan , D.TenSize, A.SoLuongMua, A.ThanhTien, A.MaGioHang , A.MaChiTietGiay
    from ShoesStoreManagement.CHITIETGIOHANG A 
    left join ShoesStoreManagement.CHITIETGIAY B 
    on A.MaChiTietGiay = B.MaChiTietGiay
    left join ShoesStoreManagement.GIAY C
    on C.MaGiay = B.MaGiay
    left join ShoesStoreManagement.SIZE D
    on D.MaSize = B.MaSize 
    where A.MaGioHang = p_MaGioHang;
END; $$
DELIMITER ;


DELIMITER $$
create procedure USP_ThemBaoCaoBanHang(p_MaNguoiDung int,p_NgayBatDau datetime, p_NgayKetThuc datetime)
BEGIN
INSERT INTO ShoesStoreManagement.BAOCAOBANHANG(MaNguoiDung, NgayBatDau, NgayKetThuc)
VALUES (p_MaNguoiDung, p_NgayBatDau, p_NgayKetThuc);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ThemChiTietBaoCaoBanHang(p_Ngay DATETIME)
BEGIN
    declare baoCaoID int;
    declare soPhieu, doanhThu int;

    set baoCaoID= (select max(MaBaoCaoBanHang) from ShoesStoreManagement.BAOCAOBANHANG);
    if((select count(*) from PHIEUBANHANG  A where 
        DAY(p_Ngay) = Day(A.NgayBan) and 
        MONTH(p_Ngay) = MONTH(A.NgayBan) and    
        YEAR(p_Ngay) = YEAR(A.NgayBan) )>0)
    then
        set soPhieu = (select count(*) from PHIEUBANHANG  A where 
        DAY(p_Ngay) = Day(A.NgayBan) and 
        MONTH(p_Ngay) = MONTH(A.NgayBan) and    
        YEAR(p_Ngay) = YEAR(A.NgayBan) );
        set  doanhThu = (select sum(TongTien) from PHIEUBANHANG D where 
        DAY(p_Ngay) = Day(D.NgayBan) and 
        MONTH(p_Ngay) = MONTH(D.NgayBan) and    
        YEAR(p_Ngay) = YEAR(D.NgayBan) );
    else 
        set soPhieu = 0;
        set doanhThu = 0;
    end if;

    UPDATE BAOCAOBANHANG  B
    SET  B.TongDoanhThu = B.TongDoanhThu + doanhThu,
         B.SoLuongPhieuBanHang = B.SoLuongPhieuBanHang + soPhieu        
    WHERE B.MaBaoCaoBanHang = baoCaoID;
    INSERT INTO ShoesStoreManagement.CHITIETBAOCAOBANHANG(MaBaoCaoBanHang,Ngay,
    SoLuongPhieuBan, DoanhThu)
    VALUES (baoCaoID, p_Ngay, soPhieu, doanhThu);
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ListChiTietBaoCaoBanHang(p_MaBaoCaoBanHang int)
BEGIN
    SELECT * from CHITIETBAOCAOBANHANG where CHITIETBAOCAOBANHANG.MaBaoCaoBanHang = p_MaBaoCaoBanHang;
END; $$
DELIMITER ;

DELIMITER $$
create procedure USP_ListBaoCaoBanHang()
BEGIN
    SELECT A.MaBaoCaoBanHang, A.NgayBatDau, A.NgayKetThuc, A.SoLuongPhieuBanHang, A.TongDoanhThu, B.TenNguoiDung
    from BAOCAOBANHANG A join NGUOIDUNG B using (MaNguoiDung)
    where A.IsDeleted = 0;
END; $$
DELIMITER ;


insert into CHUCVU(TenChucVu, IsDeleted)values ("Quản Lý", false);
insert into CHUCVU (TenChucVu, IsDeleted)values ("Nhân Viên Bán Hàng", false );
insert into CHUCVU (TenChucVu, IsDeleted)values ("Nhân Viên Kế Toán", false);
insert into CHUCVU (TenChucVu, IsDeleted)values ("Nhân Viên Kho", false);
insert into CHUCVU (TenChucVu, IsDeleted)values ("Khách Hàng", false);



insert into HANGSANXUAT(TenHangSanXuat)values ("Nike");
insert into HANGSANXUAT(TenHangSanXuat)values ("Puma");
insert into HANGSANXUAT(TenHangSanXuat)values ("Sneaker");
insert into HANGSANXUAT(TenHangSanXuat)values ("Adidas");
insert into HANGSANXUAT(TenHangSanXuat)values ("Converse");
insert into HANGSANXUAT(TenHangSanXuat)values ("Vans");
insert into HANGSANXUAT(TenHangSanXuat)values ("Fila");
insert into HANGSANXUAT(TenHangSanXuat)values ("Bitis");
insert into HANGSANXUAT(TenHangSanXuat)values ("Yeezy");
insert into HANGSANXUAT(TenHangSanXuat)values ("Air Jordan");



insert into MAU(TenMau)values ("Purple");
insert into MAU(TenMau)values ("White");
insert into MAU(TenMau)values ("Pink");
insert into MAU(TenMau)values ("Blue");
insert into MAU(TenMau)values ("Red");
insert into MAU(TenMau)values ("Black");
insert into MAU(TenMau)values ("Grey");




insert into SIZE(TenSize)values ("38");
insert into SIZE(TenSize)values ("39");
insert into SIZE(TenSize)values ("40");
insert into SIZE(TenSize)values ("41");
insert into SIZE(TenSize)values ("42");
insert into SIZE(TenSize)values ("43");


insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Air Jordan 1 KO 'Chicago' 2021", 
    10,
    4,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FAirJordan1KO'Chicago'2021.jpg?alt=media&token=b63a412c-2e41-4f55-a707-2e24e7656216",
    "white/black/university red",
    160,
    6375000
);


insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Air Jordan 1 Mid 'Banned'", 
    10,
    4,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FAirJordan1Mid'Banned'.jpg?alt=media&token=417af690-b73d-4d9b-92f3-74f1a606b8a9",
    "black/university red",
    100,
    6375000
);
insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Air Jordan 1 Mid 'Hyper Royal'", 
    10,
    4,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FAirJordan1Mid'HyperRoyal'.jpg?alt=media&token=23e5b4f2-f33c-47a3-994b-27829dbf4779",
    "white/black/university red",
    160,
    6005000 
);
insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Air Jordan 1 Retro High OG 'Hyper Royal''", 
    10,
    3,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FAirJordan1RetroHighOG'HyperRoyal'.jpg?alt=media&token=56cde7c3-94e7-43e1-a445-cba0a564294a",
    "white/black/university red",
    160,
    6375000
);
insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Air Jordan 1 Retro High OG 'Shadow 2.0'", 
    10,
    5,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FAirJordan1RetroHighOG'Shadow2.0'.jpg?alt=media&token=1f2c376e-d296-4de3-a9a6-d18f449b9718",
    "white/black/university red",
    160,
    6375000
);
insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Air Jordan 5 Retro GS 'Raging Bull' 2021", 
    10,
    4,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FAirJordan5RetroGS'RagingBull'2021.jpg?alt=media&token=ea070343-69d0-44ab-b3be-90cbb24cf061",
    "white/black/university red",
    160,
    6555000
);
insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Air Jordan 5 Retro 'Raging Bull' 2021", 
    10,
    4,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FAirJordan5RetroGS'RagingBull'2021.jpg?alt=media&token=ea070343-69d0-44ab-b3be-90cbb24cf061",
    "black/university red",
    160,
    6375000 
);
insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Air Jordan 6 Retro OG 'Carmine' 2021", 
    10,
    5,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FAirJordan6RetroOG'Carmine'2021.jpg?alt=media&token=8e9a5495-691c-4def-bfdb-9b8fe478642f",
    "white/black/university red",
    160,
    6375000
);
insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Air Jordan 7 Retro 'Flint' 2021", 
    10,
    1,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FAirJordan7Retro'Flint'2021.jpg?alt=media&token=7f61c7b9-02e6-4946-84ec-8efe2e09a4ce",
    "white/black/university red",
    160,
    6375000
);
insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Air Jordan 11 Retro Low GS 'Legend Blue'", 
    10,
    1,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FAirJordan11RetroLowGS'LegendBlue'.jpg?alt=media&token=1eb33d8b-fe7d-4a87-8ad5-9b84bca50cc3",
    "white/black/university red",
    160,
    5005000
);
insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Air Jordan 11 Retro Low 'Legend Blue'", 
    10,
    1,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FAirJordan11RetroLow'LegendBlue'.jpg?alt=media&token=7fcb259a-5be9-4b90-8c91-4ea4fffd3333",
    "white/black/university red",
    160,
    6375000
);
insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Stingwater x Dunk Low SB 'Magic Mushroom'", 
    10,
    4,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FStingwaterxDunkLowSB'MagicMushroom'.jpg?alt=media&token=b358a832-0c69-4114-9640-86cce8c5199b",
    "white/black/university red",
    160,
    6375000
);
insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Travis Scott x Air Jordan 6 Retro 'British Khaki'", 
    10,
    6,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FTravisScottxAirJordan6Retro'BritishKhaki'.jpg?alt=media&token=d6baffc0-4cdc-4b7c-84d1-0e31b5900ddd",
    "white/black/university red",
    160,
    6375000
);

insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Yeezy 500 'Enflame'", 
    9,
    6,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FYeezy500'Enflame'.jpg?alt=media&token=58fbb08c-c8df-4225-8329-3893798fc33a",
    "white/black/university red",
    160,
    6375000
);

insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Yeezy 700 V3 'Kyanite'", 
    9,
    3,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FYeezy700V3'Kyanite'.jpg?alt=media&token=177d827f-fc00-42fd-a9c2-95db90293693",
    "white/black/university red",
    160,
    6375000
);

insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Yeezy Boost 700 'Bright Blue'", 
    9,
    3,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FYeezyBoost700'BrightBlue'.jpg?alt=media&token=df4fcc3d-19ab-4b76-8ec5-6e54e84989d3",
    "white/black/university red",
    160,
    6375000
);

insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Yeezy Boost 700 V2 'Cream'", 
    9,
    1,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FYeezyBoost700V2'Cream'.jpg?alt=media&token=9f932453-76cc-4bd3-9763-fb4e951dc2c2",
    "white/black/university red",
    160,
    6375000
);

insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Yeezy Slides 'Core' 2021", 
    9,
    6,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FYeezySlides'Core'%202021.jpg?alt=media&token=1f3cdbeb-1559-40ec-b5d9-04f6ca4961e3",
    "white/black/university red",
    160,
    6375000
);

insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Yeezy Slides 'Pure'", 
    9,
    6,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FYeezySlides'Pure'.jpg?alt=media&token=8944a917-3be7-4575-a649-ee0317a924f1",
    "white/black/university red",
    100,
    6375000
);

insert into GIAY( TenGiay , MaHangSanXuat , MaMau ,GioiTinh , Anh , MoTa ,TongSoLuong, DonGiaBan) values (
    "Yeezy Slides 'Resin' 2021", 
    9,
    6,
    "Unisex",
    "https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2FYeezySlides'Resin'2021.jpg?alt=media&token=643a4b30-6e3a-4ad1-8aaf-018d7ac190ee",
    "white/black/university red",
    160,
    6375000
);
   
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,1,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,1,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,1,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,1,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,1,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,1,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,2,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,2,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,2,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,2,0);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,2,0);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,2,0);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,3,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,3,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,3,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,3,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,3,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,3,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,4,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,4,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,4,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,4,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,4,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,4,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,5,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,5,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,5,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,5,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,5,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,5,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,6,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,6,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,6,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,6,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,6,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,6,10);







insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,7,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,7,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,7,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,7,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,7,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,7,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,8,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,8,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,8,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,8,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,8,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,8,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,9,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,9,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,9,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,9,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,9,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,9,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,10,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,10,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,10,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,10,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,10,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,10,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,11,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,11,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,11,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,11,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,11,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,11,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,12,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,12,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,12,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,12,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,12,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,12,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,13,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,13,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,13,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,13,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,13,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,13,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,14,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,14,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,14,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,14,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,14,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,14,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,15,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,15,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,15,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,15,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,15,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,15,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,16,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,16,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,16,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,16,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,16,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,16,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,17,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,17,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,17,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,17,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,17,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,17,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,18,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,18,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,18,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,18,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,18,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,18,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,19,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,19,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,19,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,19,40);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,19,10);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,19,10);



insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (1,20,50);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (2,20,20);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (3,20,30);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (4,20,0);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (5,20,0);
insert into CHITIETGIAY(MaSize,MaGiay,SoLuong) values (6,20,0);




INSERT INTO NHACUNGCAP(TenNhaCungCap, SDT, DiaChi, Email) VALUES ("Giày dép", "19006074", "3 Thép Mới, phường 12, quận Tân Bình, TP Hồ Chí Minh", "lienhe@thitruongsi.com");
INSERT INTO NHACUNGCAP(TenNhaCungCap, SDT, DiaChi, Email) VALUES ("Kho giày phố", "0866074947", "737/10 Lạc Long Quân, P10 - Quận Tân Bình", "lienhe@thitruongsi.com");
INSERT INTO NHACUNGCAP(TenNhaCungCap, SDT, DiaChi, Email) VALUES ("Giày dép Việt Thủy", "0866074947", "3 Thép Mới, phường 12, quận Tân Bình, TP Hồ Chí Minh", "lienhe@thitruongsi.com");
INSERT INTO NHACUNGCAP(TenNhaCungCap, SDT, DiaChi, Email) VALUES ("GS", "0866074947", "3 Thép Mới, phường 12, quận Tân Bình, TP Hồ Chí Minh", "lienhe@thitruongsi.com");
INSERT INTO NHACUNGCAP(TenNhaCungCap, SDT, DiaChi, Email) VALUES ("Siviet", "0866074947", "3 Thép Mới, phường 12, quận Tân Bình, TP Hồ Chí Minh", "lienhe@thitruongsi.com");
-- delete later
-- SET NAMES utf8;
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Khách Vãng Lai","khachvanglai","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","khachvanglai@khachvanglai","khachvanglai.jpg",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (1,"At Min","admin","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","admin@admin","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F118208340_161368465576969_9020412137873354949_n.jpg?alt=media&token=8c5cde54-9cf1-4c1f-9b86-388f30eb53fb",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Trần Duy Khánh","duykhanh","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2Favatar.jpg?alt=media&token=f4541838-9024-4859-b287-4cdbbebcf181",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Nguyễn Yến Linh","yenlinh","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F188286131_2948428975446369_1822736670446303283_n.jpg?alt=media&token=3c34762b-f2c7-40a8-b3b7-7e081dc7b7d5",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Lê Nguyên","lenguyen","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F190160691_1194075634366693_3734862780601815562_n.jpg?alt=media&token=eef14f76-f939-4e87-8e29-1ddbe38ec07a",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Trương Trung Hiếu","trunghieu","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F190160691_1194075634366693_3734862780601815562_n.jpg?alt=media&token=eef14f76-f939-4e87-8e29-1ddbe38ec07a",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Trung Anh","trunganh","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F190160691_1194075634366693_3734862780601815562_n.jpg?alt=media&token=eef14f76-f939-4e87-8e29-1ddbe38ec07a",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Đồng Quang Quý","quangquy","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F69407774_2474952812736423_2986662640652124160_n.jpg?alt=media&token=06b45d66-34ba-4168-adf5-b0696d9eddbf",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Nhật Mai","nhatmai","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F51793332_1189477627883198_6184842722596093952_n.jpg?alt=media&token=d513c8b6-5a25-4d82-8888-67ef8f58a839",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Nguyễn Đức","nguyenduc","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F188286131_2948428975446369_1822736670446303283_n.jpg?alt=media&token=3c34762b-f2c7-40a8-b3b7-7e081dc7b7d5",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Phạm Vân","vanity","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F168487901_474023713948558_4222180796742609075_n.jpg?alt=media&token=d35310db-fce3-4bb2-9252-22c88e8698d7",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Nguyễn Yến Nhi","yennhi","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F190160691_1194075634366693_3734862780601815562_n.jpg?alt=media&token=eef14f76-f939-4e87-8e29-1ddbe38ec07a",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Hoàng Minh Hồng","minhhong","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F148018031_1132030403935257_6646384093719174886_n.jpg?alt=media&token=11bf3454-3416-4152-a126-3964262d3399",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Nguyễn Đức Khang","duckhang","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F20157883_103460747002518_7485964106418503445_o.jpg?alt=media&token=4bc043e3-4a9d-4774-9763-144e28e7fb81",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Nguyễn Phạm Đức Duy","ducduy","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F157566076_2957257811222535_4002746213970945575_n.jpg?alt=media&token=7047b471-93c6-4cfd-a0cb-21c2af559e33",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Nguyễn Văn Lương","vanluong","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F79969209_1411511955697531_4629445665246674944_n.jpg?alt=media&token=11e71678-bdf6-4d8e-9448-64d5cd2b6e3a",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Nguyễn Long","nguyenlong","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F16299301_1808288959412643_3352524105234288532_n.jpg?alt=media&token=84b389ab-a0e2-46d0-b61f-2a932a3a744a",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Trần Hậu Đạt","haudat","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","duykhanh.jpg",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Nguyễn Minh Quang","minhquang","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F139600674_2808250096062393_1449070949158698948_n.jpg?alt=media&token=90037adc-1789-4595-ae8c-94eb94388ffe",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (5,"Đào Duy Nam","namdao","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F151614612_426987318586683_5772247639823668052_n.jpg?alt=media&token=f19409d0-6185-4c52-9b15-781b37437e3f",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (2,"Nguyễn Hữu Trí","nhanvienbanhang","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F118208340_161368465576969_9020412137873354949_n.jpg?alt=media&token=8c5cde54-9cf1-4c1f-9b86-388f30eb53fb",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (3,"Trần Duy Khánh","nhanvienketoan","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F101851419_1624396714409946_119877887734633891_n.jpg?alt=media&token=6571513c-4935-4acb-8c05-f26d6a70a9b4",false);
insert into NGUOIDUNG(MaChucVu,TenNguoiDung,TenDangNhap,MatKhau,SDT,DiaChi,Email,Avatar,IsDeleted) values (4,"PapaSuke","nhanvienkho","$2b$10$djNGrIGniLagvoO7hVF71OLwHWeljTGAiaWrEsPNe54EKR0Q.Ypz6","01212801223","SG","duykhanh@duykhanh","https://firebasestorage.googleapis.com/v0/b/shoesstoremanagement.appspot.com/o/images%2F190160691_1194075634366693_3734862780601815562_n.jpg?alt=media&token=eef14f76-f939-4e87-8e29-1ddbe38ec07a",false);

insert into QUYEN(MaQuyen,TenQuyen) values (1,"Quản Lý Sản Phẩm");
insert into QUYEN(MaQuyen,TenQuyen) values (2,"Quản Lý Bán Hàng");
insert into QUYEN(MaQuyen,TenQuyen) values (3,"Quản Lý Người Dùng");
insert into QUYEN(MaQuyen,TenQuyen) values (4,"Quản Lý Nhà Cung Cấp");
insert into QUYEN(MaQuyen,TenQuyen) values (5,"Quản Lý Đặt Hàng");
insert into QUYEN(MaQuyen,TenQuyen) values (6,"Quản Lý Nhập Kho");
insert into QUYEN(MaQuyen,TenQuyen) values (7,"Quản Lý Giỏ Hàng");
insert into QUYEN(MaQuyen,TenQuyen) values (8,"Báo Cáo Lợi Nhuận");
insert into QUYEN(MaQuyen,TenQuyen) values (9,"Báo Cáo Bán Hàng");
insert into QUYEN(MaQuyen,TenQuyen) values (10,"Quản Lý Phiếu Chi");

-- admin toan quyen
insert into PHANQUYEN(MaChucVu,MaQuyen) values (1,1);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (1,2);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (1,3);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (1,4);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (1,5);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (1,6);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (1,7);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (1,8);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (1,9);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (1,10);
-- ban hang: ban hang + gio hang
insert into PHANQUYEN(MaChucVu,MaQuyen) values (2,2);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (2,7);
-- ke toan: bao cao loi nhuan + bao cao ban hang
insert into PHANQUYEN(MaChucVu,MaQuyen) values (3,8);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (3,9);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (3,10);
-- kho: dat hang, nhap kho, ton kho
insert into PHANQUYEN(MaChucVu,MaQuyen) values (4,5);
insert into PHANQUYEN(MaChucVu,MaQuyen) values (4,6);


CALL USP_ThemGioHang(3,"Trả tiền mặt khi nhận hàng");
CALL USP_ThemChiTietGioHang(1,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(2,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(3,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(4,10,6375000,63750000);



CALL USP_ThemGioHang(4, "Thanh toán qua MOMO");
CALL USP_ThemChiTietGioHang(1,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(2,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(3,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(4,10,6375000,63750000);

CALL USP_ThemGioHang(5, "Trả tiền mặt khi nhận hàng");
CALL USP_ThemChiTietGioHang(1,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(2,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(3,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(4,10,6375000,63750000);

CALL USP_ThemGioHang(6,"Trả tiền mặt khi nhận hàng");
CALL USP_ThemChiTietGioHang(1,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(2,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(3,10,6375000,63750000);
CALL USP_ThemChiTietGioHang(4,10,6375000,63750000);



INSERT INTO ShoesStoreManagement.PHIEUDATHANG(MaNhaCungCap ,MaNguoiDung ,NgayLap , TrangThai)
VALUES (1 ,2 , STR_TO_DATE('17-06-2021', '%d-%m-%Y') ,"Chờ");
CALL USP_ThemChiTietPhieuDatHang(1,10);
CALL USP_ThemChiTietPhieuDatHang(10,10);
CALL USP_ThemChiTietPhieuDatHang(20,10);
CALL USP_ThemChiTietPhieuDatHang(30,10);
CALL USP_ThemChiTietPhieuDatHang(40,10);



INSERT INTO ShoesStoreManagement.PHIEUDATHANG(MaNhaCungCap ,MaNguoiDung ,NgayLap , TrangThai)
VALUES (2 ,3 , STR_TO_DATE('18-06-2021', '%d-%m-%Y') ,"Chờ");
CALL USP_ThemChiTietPhieuDatHang(1,10);
CALL USP_ThemChiTietPhieuDatHang(10,10);
CALL USP_ThemChiTietPhieuDatHang(20,10);
CALL USP_ThemChiTietPhieuDatHang(30,10);
CALL USP_ThemChiTietPhieuDatHang(40,10);

INSERT INTO ShoesStoreManagement.PHIEUDATHANG(MaNhaCungCap ,MaNguoiDung ,NgayLap , TrangThai)
VALUES (3 ,3 , STR_TO_DATE('16-06-2021', '%d-%m-%Y') ,"Chờ");
CALL USP_ThemChiTietPhieuDatHang(1,10);
CALL USP_ThemChiTietPhieuDatHang(10,10);
CALL USP_ThemChiTietPhieuDatHang(20,10);
CALL USP_ThemChiTietPhieuDatHang(30,10);
CALL USP_ThemChiTietPhieuDatHang(40,10);

INSERT INTO ShoesStoreManagement.PHIEUDATHANG(MaNhaCungCap ,MaNguoiDung ,NgayLap , TrangThai)
VALUES (4 ,3 , STR_TO_DATE('15-06-2021', '%d-%m-%Y') ,"Chờ");
CALL USP_ThemChiTietPhieuDatHang(1,10);
CALL USP_ThemChiTietPhieuDatHang(10,10);
CALL USP_ThemChiTietPhieuDatHang(20,10);
CALL USP_ThemChiTietPhieuDatHang(30,10);
CALL USP_ThemChiTietPhieuDatHang(40,10);


CALL USP_ThemTODO("Check giỏ hàng");
CALL USP_ThemTODO("Đặt hàng từ DuyKhanh");
CALL USP_ThemTODO("Giao hàng");
CALL USP_ThemTODO("Lập phiếu nhập kho");
CALL USP_ThemTODO("Lập phiếu chi");


INSERT INTO ShoesStoreManagement.PHIEUBANHANG(MaKhachHang ,MaNguoiDung ,
    NgayBan ,PhuongThucThanhToan ,
    TongTien , GhiChu )
VALUES (
    9 ,21 ,
   STR_TO_DATE('15-05-2021', '%d-%m-%Y') ,"Trả tiền mặt khi nhận hàng",
    6375000 , " ");

CALL USP_ThemChiTietPhieuBanHang(1,1,6375000,6375000);



INSERT INTO ShoesStoreManagement.PHIEUBANHANG(MaKhachHang ,MaNguoiDung ,
    NgayBan ,PhuongThucThanhToan ,
    TongTien , GhiChu )
VALUES (
    10 ,21 ,
   STR_TO_DATE('16-05-2021', '%d-%m-%Y') ,"Trả tiền mặt khi nhận hàng",
    6375000 , " ");

CALL USP_ThemChiTietPhieuBanHang(2,1,6375000,6375000);



INSERT INTO ShoesStoreManagement.PHIEUBANHANG(MaKhachHang ,MaNguoiDung ,
    NgayBan ,PhuongThucThanhToan ,
    TongTien , GhiChu )
VALUES (
    10 ,21 ,
   STR_TO_DATE('13-04-2021', '%d-%m-%Y') ,"Trả tiền mặt khi nhận hàng",
    6375000 , " ");

CALL USP_ThemChiTietPhieuBanHang(1,1,6375000,6375000);
  



INSERT INTO ShoesStoreManagement.PHIEUBANHANG(MaKhachHang ,MaNguoiDung ,
    NgayBan ,PhuongThucThanhToan ,
    TongTien , GhiChu )
VALUES (
    10 ,21 ,
   STR_TO_DATE('14-04-2021', '%d-%m-%Y') ,"Trả tiền mặt khi nhận hàng",
    6375000 , " ");

CALL USP_ThemChiTietPhieuBanHang(1,1,6375000,6375000);




INSERT INTO ShoesStoreManagement.PHIEUBANHANG(MaKhachHang ,MaNguoiDung ,
    NgayBan ,PhuongThucThanhToan ,
    TongTien , GhiChu )
VALUES (
    10 ,21 ,
   STR_TO_DATE('12-04-2021', '%d-%m-%Y') ,"Trả tiền mặt khi nhận hàng",
    6375000 , " ");

CALL USP_ThemChiTietPhieuBanHang(1,1,6375000,6375000);



INSERT INTO ShoesStoreManagement.PHIEUBANHANG(MaKhachHang ,MaNguoiDung ,
    NgayBan ,PhuongThucThanhToan ,
    TongTien , GhiChu )
VALUES (
    10 ,21 ,
   STR_TO_DATE('12-03-2021', '%d-%m-%Y') ,"Trả tiền mặt khi nhận hàng",
    6375000 , " ");

CALL USP_ThemChiTietPhieuBanHang(10,1,6375000,6375000);


INSERT INTO ShoesStoreManagement.PHIEUBANHANG(MaKhachHang ,MaNguoiDung ,
    NgayBan ,PhuongThucThanhToan ,
    TongTien , GhiChu )
VALUES (
    10 ,21 ,
   STR_TO_DATE('12-03-2021', '%d-%m-%Y') ,"Trả tiền mặt khi nhận hàng",
    6375000 , " ");

CALL USP_ThemChiTietPhieuBanHang(10,1,6375000,6375000);







INSERT INTO ShoesStoreManagement.PHIEUNHAPKHO(MaNhaCungCap,MaNguoiDung,NgayNhapKho,TongTien , GhiChu )
VALUES (
    1, 2,
   STR_TO_DATE('12-04-2021', '%d-%m-%Y'),
    63750000 , " " );
CALL USP(1, 10, 6375000,63750000 );




INSERT INTO ShoesStoreManagement.PHIEUNHAPKHO(MaNhaCungCap,MaNguoiDung,NgayNhapKho,TongTien , GhiChu )
VALUES (
    1, 2,
   STR_TO_DATE('13-04-2021', '%d-%m-%Y'),
    63750000 , " " );
CALL USP_ThemChiTietPhieuNhapKho(1, 10, 6375000,63750000 );



INSERT INTO ShoesStoreManagement.PHIEUNHAPKHO(MaNhaCungCap,MaNguoiDung,NgayNhapKho,TongTien , GhiChu )
VALUES (
    1, 2,
   STR_TO_DATE('13-04-2021', '%d-%m-%Y'),
    63750000 , " " );
CALL USP_ThemChiTietPhieuNhapKho(1, 10, 6375000,63750000 );






