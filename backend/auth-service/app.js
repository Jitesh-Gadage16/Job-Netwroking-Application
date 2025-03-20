const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const oauthRoutes = require("./routes/oauthRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes); // User profile routes

// Google OAuth Routes
app.use("/auth", oauthRoutes);

// Root route (Health check)
app.get("/", (req, res) => res.send("🚀 Auth & User Service Running"));

module.exports = app;
