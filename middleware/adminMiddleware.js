const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const isAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, "asddsadsdsddsd");
    const userId = decoded.userId;
    const user = await User.findById(userId);
    console.log(user);

    if (user && user.role === "admin") {
      req.user = user;
      next();
    } else {
      res.redirect("/unauthorized");
    }
  } catch (error) {
    res.redirect("/api/v1/login");
  }
};

module.exports = isAdmin;
