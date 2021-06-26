var express = require("express");
const http = require("http");
require("dotenv").config();
const colors = require("colors");
const socketIO = require("socket.io");
const db = require("./models/DataBaseAccessHelper");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/NguoiDung.routes");
const productRoutes = require("./routes/SanPham.routes");
const billRoutes = require("./routes/PhieuBanHang.routes");
const cartRoutes = require("./routes/GioHang.routes");
const recDocketRoutes = require("./routes/PhieuNhapKho.routes");
const paymentVouchersRoutes = require("./routes/PhieuChi.routes");
const orderRoutes = require("./routes/PhieuDatHang.routes");
const brandRoutes = require("./routes/HangSanXuat.routes");
const supplierRoutes = require("./routes/NhaCungCap.routes");
const baoCaoBanHangRoutes = require("./routes/BaoCaoBanHang.routes");
const sizeRoutes = require("./routes/Size.routes");
const colorRoutes = require("./routes/Mau.routes");
const todoRoutes = require("./routes/Todo.routes");
const dutyRoutes = require("./routes/ChucVu.routes");
const chatRoutes = require("./routes/Chat.routes");

var app = express();
const server = http.createServer(app);
var cors = require("cors");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

//config port

//Connect Database
db.connect();
const Chat = require("./models/Chat.model");

app.get("/", function (req, res) {
  res.send("API is running...");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/recdockets", recDocketRoutes);
app.use("/api/paymentvouchers", paymentVouchersRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/baocaobanhangs", baoCaoBanHangRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/duties", dutyRoutes);
app.use("/api/chats", chatRoutes);
app.use(cors());
app.options("*", cors());

const PORT = process.env.PORT || 5000;

io.on("connection", async (socket) => {
  console.log(`New client connected ${socket.id}`);
  socket.on("join", async function (data) {
    if (data.isAdmin === true) {
      socket.join(data.sessionId);
    } else {
      socket.join(data.sessionId);
    }
  });

  socket.on("firstMessage", async function (data) {
    io.in("admin").emit("client-msg", {
      userChatInfo: [data],
    });
  });

  socket.on("messageSend", async function (data) {
    const message = {
      MaPhong: data.MaPhong,
      MessageTime: data.MessageTime,
      MessageContent: data.MessageContent,
      IsFromAdmin: data.IsFromAdmin,
    };
    console.log(message);

    await Chat.Update(message, (result) => {
      if (result) {
        console.log("Update Message Successfully!");
      }
    });

    setTimeout(() => {
      io.in("admin").emit("client-msg", {
        MaPhong: data.MaPhong,
      });
    }, 100);
  });

  socket.on("messageSend-admin", function (data) {
    socket.to(data.roomId).emit("admin-msg", data);
  });
});

server.listen(
  PORT,
  console.log(
    `The server is running in development mode on port ${PORT}`.yellow.bold
  )
);
