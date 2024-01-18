const express = require("express");
const routes = require("./route/allRoute");
require('dotenv').config();
const hotelController = require("./controller/hotelController");
const app = express();
const DB = require("./DB");
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const errorMiddleware = require("./middleware/error");
var colors = require("colors");
const PORT = 5000;
const cookieParser = require("cookie-parser");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);
app.get("/", hotelController.hotelCard);
const server = app.listen(PORT, () => {
  console.log(colors.blue(`Server is running on PORT ${PORT}`));
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});

app.use(errorMiddleware);
