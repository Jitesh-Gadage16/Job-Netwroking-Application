const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
        select: false,
    },
    role: { type: String, enum: ["seeker", "connector", "admin"], default: "seeker" },
    photo: { type: String, default: "default.jpg" },
    createdAt: { type: Date, default: Date.now },
    emailVerified: { type: Boolean, default: false },
    isprofileCompleted: { type: Boolean, default: false },
    googleId: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});


// Password hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model("User", userSchema);
