const mongoose = require("mongoose");
const colors = require("colors");
const dbHost = process.env.DB_HOST;

try {
  mongoose
    .connect(dbHost)
    .then(() => {
      console.log(colors.yellow("Databse is connected"));
    })
    .catch((e) => {
      console.log(e);
    });
} catch (error) {
  console.log(error);
}

// const error = catchAsyncErrors(async (req, res, next) => {

// })
