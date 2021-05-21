var express = require("express");
require("dotenv").config();
const colors = require("colors");
const db = require("./models/DataBaseAccessHelper");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/NguoiDung.routes");
const productRoutes = require("./routes/SanPham.routes");
const billRoutes = require("./routes/PhieuBanHang.routes");
const cartRoutes = require("./routes/GioHang.routes");
const recDocketRoutes = require("./routes/PhieuNhapKho.routes");
const orderRoutes = require("./routes/PhieuDatHang.routes");
const brandRoutes = require("./routes/HangSanXuat.routes");
const supplierRoutes = require("./routes/NhaCungCap.routes");
const baoCaoBanHangRoutes = require("./routes/BaoCaoBanHang.routes");
const sizeRoutes = require("./routes/Size.routes");
const colorRoutes = require("./routes/Mau.routes");

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//config port

//Connect Database
db.connect();

app.get("/", function (req, res) {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/recdockets", recDocketRoutes);
//app.use("/api/orders", orderRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/baocaobanhangs", baoCaoBanHangRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/colors", colorRoutes);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `The server is running in development mode on port ${PORT}`.yellow.bold
  )
);
