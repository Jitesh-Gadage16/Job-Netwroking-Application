const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const oauthRoutes = require("./routes/oauthRoutes")

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

// Google OAuth Routes
app.use("/auth", oauthRoutes);

module.exports = app;
