// routes/authRoutes.js
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authcontroller");

// Routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/verify-otp", authController.verifyOTP);
router.post("/resendOTP", authController.resendOTP);



module.exports = router;
