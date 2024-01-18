const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const router = require("../route/allRoute");
const Hotel = require("../Model/hotelModel");
const secretKey = process.env.secretKey;
// user register controller

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // validation

    if (!name) {
      return res.send({ mesage: "name is required " });
    }
    if (!email) {
      return res.send({ mesage: "email is required" });
    }
    if (!password) {
      return res.send({ mesage: "password is required" });
    }

    // cheak user

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ error: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.status(500).json(error.message);
  }

  
};

// user loginController

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.json(401).send("user not found");
    }

    // Check if the password is correct

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json("password not valid");
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    // Set the token as a cookie
    res.cookie("token", token, { expires: expiryDate, httpOnly: true });
    res.redirect("/api/v1/user");
    // res.json({ user: user, measage: "user login sucessfully", token });
  } catch (error) {
    res.status(500).json("not login");
  }

  // res.render("login", { message: "POST new tea" }); // dummy function for now
};
const newTea2 = (req, res, next) => {
  res.render("home", { message: "POST new tea" }); // dummy function for now
};
const auth = (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error);
  }

  
};
const adminDashboard = (req, res, next) => {
  try {
    const name = {
      edit: false,
    };
    res.render("adminDashboard", { name });
  } catch (error) {
    console.log(error);
  }

  
};
const admin = (req, res, next) => {
  try {
    res.render("admin");
  } catch (error) {
    console.log(error);
  }

  
};

// user functionality
const user = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      // Handle the case where the user is not authenticated
      res.redirect("/login"); // Example redirect to login page
      return;
    }

    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, secretKey);

    // Use the decoded user ID to fetch user data from MongoDB
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      // Handle the case where the user does not exist in the database
      res.status(404).send("User not found");
      return;
    }

    // Now, you have access to the user data
    res.render("user", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }

  // dummy function for now
};

// User Curd operation
// 1...create
const userNewHotel = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const { place, description, distance, rate } = req.body;
    const image = req.file.filename;

    const hotel = new Hotel({
      place,
      description,
      distance,
      rate,
      image,
      userId: user._id,
    });
    await hotel.save();

    res.redirect("/");
    console.log(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// 2...get user created data

const getUserHotel = async (req, res) => {
  try {
    // const user = await User.findById(req.params.userId);

    const user = await User.findById(req.params.userId);
    console.log(req.params.userId);
    const hotel = await Hotel.find({ userId: user._id });

    res.render("notes", { hotel });
   
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  register,
  login,
  newTea2,
  auth,
  admin,
  adminDashboard,
  user,
  userNewHotel,
  getUserHotel,
};
