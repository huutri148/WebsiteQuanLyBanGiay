# Website quản lý bán giày

> Website được xây dựng dựa trên ReactJs (Redux), NodeJs và MySqQL

Project là sản phẩm môn Đồ án 1, lớp SE121.L21, HK2 năm 2021

![](./uploads/sample1.png)
![](./uploads/sample2.png)
![](./uploads/sample3.png)

## Tính năng

- Quản lý bán hàng
- Quản lý người dùng
- Quản lý nhà cung cấp
- Quản lý đặt hàng
- Tư vấn khách hàng
- Quản lý nhập kho
- Quản lý giỏ hàng
- Báo cáo bán hàng
- Báo cáo lợi nhuận
- Tính năng mua hàng với giỏ hàng
- Phân quyền người dùng

## Sử dụng

### Các biến Env

Tạo file .env tại root với các biến theo tình trạng host của bạn

```
PORT = 5000
DB_USER = root
DB_HOST = localhost
DBPASS =
ACCESS_TOKEN_SECRET= sL)Ab[s<KKJsD(DY6}d'?uy9AVg=GP6+gj<2L?w>/TN!/Dsb-w{S-u{]L=t:
ACCESS_TOKEN_LIFE = 1h
REFRESH_TOKEN_LIFE = 3650d
REFRESH_TOKEN_SECRET =  Z~[:S)*qS@jDF2bC(ppWtZ_;AL`p>/@b<XJ-;#}Z-aU8*a_<9yK6s4=LPxB_]/^kRtJ.a%{9G)s`Wa*&TX"+CG!AaVR={?
```

### Cài đặt thư viện (frontend & backend)

```
npm install
cd frontend
npm install
```

### Bulid

```
# Run (ở đây project mình dùng frontend port(:3000) & backend port(:5000))
npm run dev

# Chỉ chạy duy nhất server
npm run server
```

### Seed Database

Có thể sử dụng seeder để insert người dùng trong hệ thống

```
# Nhập dữ liệu
npm run data:import

# Khởi tạo cơ sở dữ liệu với Database/shoes_script.sql
\. Database/shoes_script.sql
```

```
Các tài khoản quản lý trong hệ thống

admin (admin)
123456

nhanvienbanhang (Nhân viên bán hàng)
123456

nhanvienketoan (Nhân viên kế toán)
123456

nhanvienkho (Nhân viên kho)
123456
```
