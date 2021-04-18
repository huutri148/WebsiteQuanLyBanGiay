var express = require("express");

var app = express();

app.get("/", function (req, res) {
  res.send("API is running...");
});

const PORT = 5000;

app.listen(
  PORT,
  console.log(`The server is running in development mode on port ${PORT}`)
);
