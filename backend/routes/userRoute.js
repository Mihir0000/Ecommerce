const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
} = require("../controllers/userController");
const router = express.Router();

// console.log("userRoute");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

module.exports = router;
