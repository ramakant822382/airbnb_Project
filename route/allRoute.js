const express = require("express"); //import express

// 1.
const router = express.Router();
// 2.
const userController = require("../controller/userController");
const hotelController = require("../controller/hotelController");
const authenticateToken = require("../middleware/authenticate");
const isAdmin = require("../middleware/adminMiddleware");
const upload = require("../middleware/multer");
// 3.

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user", authenticateToken, userController.user);
router.get("/register", userController.auth);
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/auth", hotelController.hotelCard);

router.get("/product/:id", hotelController.hotelDetails);

// admin route

router.post("/newhotel", upload.single("image"), hotelController.createHotel);
router.get("/adminDashboard", userController.adminDashboard);
router.get("/admin", hotelController.adminCard);
router.get("/edit/:id", hotelController.editCard);
router.post("/edit/:id", upload.single("image"), hotelController.updateDetails);
router.get("/delete/:id", hotelController.deleteCard);

// user curd route
router.post(
  "/user/:userId/hotel",
  upload.single("image"),
  userController.userNewHotel
);

router.get("/user/:userId/hotel", userController.getUserHotel);
// search
router.post("/searchp", hotelController.search);

module.exports = router;
