const express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const dbConfig = require("./config/database.config");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.set("strictQuery", false);
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :date[web]",
    { stream: accessLogStream }
  )
);

const storeRoute = require("./routes/store.route");
const categoryRoute = require("./routes/category.route");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");

app.use("/api", storeRoute);
app.use("/api", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);

app.listen(4000, () => {
  console.log("The server start at 4000");
});

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true });

mongoose.connection.on("error", function (error) {
  console.error("Database connection error:", error);
});

mongoose.connection.once("open", function () {
  console.log("Database connected ECOM");
});
