// routes/authRoutes.js
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authcontroller");



const { protect } = require("../middleware/authMiddleware");

router.post("/logout", protect, authController.logout);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);


// Routes
router.post("/signup", authController.signup);
router.post("/google", authController.googlesignup);
router.post("/login", authController.login);
router.post("/verify-otp", authController.verifyOTP);
router.post("/resendOTP", authController.resendOTP);



module.exports = router;
