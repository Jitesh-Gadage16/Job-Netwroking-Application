const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Start OAuth flow
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback URL
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/failure",
    }),
    (req, res) => {
        res.redirect("/auth/success");
    }
);

// Success & Failure Routes
router.get("/success", (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: "90d",
    });

    res.json({ token, user: req.user });
});


router.get("/failure", (req, res) => {
    res.send("❌ Google OAuth login failed!");
});

module.exports = router;
