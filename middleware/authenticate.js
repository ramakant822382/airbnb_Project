const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.redirect("/api/v1/register");
    }

    jwt.verify(token, "asddsadsdsddsd", (err, user) => {
      if (err) {
        return res.status(403).send("Forbidden");
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.json("something went wrong");
  }
};

module.exports = authenticateToken;
