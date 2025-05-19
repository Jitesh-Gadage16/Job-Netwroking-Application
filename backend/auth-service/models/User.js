const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Hide password in queries
    },
    role: {
        type: String,
        enum: ["seeker", "connector", "admin"],
        required: true,
        default: "seeker"
    },
    photo: {
        type: String,
        default: "default.jpg",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String
    }, // Optional for Google OAuth

    // 🟢 New Fields (for User Services)
    bio: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    skills: [
        {
            type: String,
        },
    ],
    socialLinks: {
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
        website: { type: String, default: "" },
    },
    points: {
        type: Number,
        default: 0,
    },
    rank: {
        type: String,
        default: "Beginner Connector",
    },
    badges: [{
        type: String
    }], // Earned badges
    resetPasswordToken: String,
    resetPasswordExpires: Date,


});

// Password hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model("User", userSchema);
