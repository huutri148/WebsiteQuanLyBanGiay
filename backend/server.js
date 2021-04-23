var express = require("express");
require("dotenv").config();
const colors = require("colors");
const db = require("./models/DataBaseAccessHelper");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/NguoiDung.routes");

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

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `The server is running in development mode on port ${PORT}`.yellow.bold
  )
);
