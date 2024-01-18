const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  place: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  image: String,
});
const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
