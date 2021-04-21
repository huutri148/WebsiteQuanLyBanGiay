var express = require("express");
require("dotenv").config();
const colors = require("colors");
const db = require("./models/DataBaseAccessHelper");
const userRoutes = require("./routes/NguoiDung.routes");
var app = express();

db.testConnection();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `The server is running in development mode on port ${PORT}`.yellow.bold
  )
);
