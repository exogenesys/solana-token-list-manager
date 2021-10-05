var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

var indexRouter = require("./routes/index");
var webhookRouter = require("./routes/webhook");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/webhook", webhookRouter);

module.exports = app;
