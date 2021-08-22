require("dotenv/config");
var express = require("express");
var app = express();
var router = require("./src/routes/routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({});
});

app.use("/", router);

module.exports = app;
