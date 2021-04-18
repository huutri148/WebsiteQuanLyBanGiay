var express = require("express");
require("dotenv").config();
const colors = require("colors");
const db = require("./models/DataBaseAccessHelper");

var app = express();

db.testConnection();

app.get("/", function (req, res) {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `The server is running in development mode on port ${PORT}`.yellow.bold
  )
);
