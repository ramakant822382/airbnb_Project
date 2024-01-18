const Hotel = require("../Model/hotelModel");
// hotel curd operation
// 1....create hotel
const createHotel = async (req, res, next) => {
  const { place, description, distance, rate } = req.body;
  const image = req.file.filename;
  try {
    const hotel = new Hotel({ place, description, distance, rate, image });
    await hotel.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// 2....get hotel details

const hotelCard = async (req, res, next) => {
  try {
    // Fetch data from MongoDB
    const data = await Hotel.find({});

    // Render EJS template and pass data to it
    res.render("card", { data });
  } catch (error) {
    console.log(error);
  }
};
// 3..hotel details page
const hotelDetails = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await Hotel.findOne({ _id: id });
    // console.log(data);
    // Render the data using EJS
    res.render("detail", { data });
  } catch (error) {
    console.log(error);
  }
};

const adminCard = async (req, res, next) => {
  try {
    // Fetch data from MongoDB
    const data = await Hotel.find({});

    // Render EJS template and pass data to it
    res.render("admin", { data });
  } catch (error) {
    console.log(error);
  }
};

const editCard = async (req, res, next) => {
  try {
    const id = req.params.id;

    const data = await Hotel.findOne({ _id: id });
    res.render("edit", { data });
  } catch (error) {
    console.log(error);
  }
};
const updateDetails = async (req, res, next) => {
  try {
    const { place, description, distance, rate } = req.body;
    const image = req.file.filename;
    await Hotel.findByIdAndUpdate(req.params.id, {
      place,
      description,
      distance,
      rate,
      image,
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const search = async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;

    console.log(searchTerm);
    // Query the database based on the search parameters
    const results = await Hotel.find({
      $or: [
        { place: { $regex: new RegExp(searchTerm, "i") } }, // Case-insensitive search
      ],
    });

    res.render("searchR", { results });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createHotel,
  hotelCard,
  hotelDetails,
  adminCard,
  editCard,
  updateDetails,
  deleteCard,
  search,
};
