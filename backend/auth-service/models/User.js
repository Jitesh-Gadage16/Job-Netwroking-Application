// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ["seeker", "connector"],
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
    emailVerified: { type: Boolean, default: false },
    googleId: String, // Optional

});

// Password hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model("User", userSchema);
