const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const { email, name, picture } = profile._json;

            let user = await User.findOne({ email });

            if (!user) {
                user = await User.create({
                    name,
                    email,
                    photo: picture,
                    role: "seeker", // Default role, can modify later
                    emailVerified: true,
                    password: "google-authenticated" // placeholder
                });
            }

            done(null, user);
        }
    )
);

module.exports = passport;
