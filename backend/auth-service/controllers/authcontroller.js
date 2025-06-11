const User = require("../models/User");
const OTP = require("../models/OTP");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendOTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlacklistedToken");
const crypto = require("crypto");
const { OAuth2Client } = require('google-auth-library');
const generateJWT = require("../utils/generateJWT");



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

exports.googlesignup = async (req, res) => {
    const { credential } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const { email, name, sub: googleId } = payload;

        let user = await User.findOne({ email });

        console.log("user", user)

        if (!user) {
            user = new User({
                name,
                email,
                googleId,
                emailVerified: true,
                role: null,
            });
            await user.save();
        }
        console.log("user>>>", user);

        const token = generateJWT(user);
        console.log("token", token);
        res.status(200).json({ token, user });

    } catch (error) {
        console.error("Google signup error:", error);
        res.status(500).json({ message: 'Google login failed!' });
    }
};

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || name.trim().length === 0) {
        res.status(400).json({ message: "Name is required." });
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        res.status(400).json({ message: "Name must contain letters only (A-Z, a-z)." });

    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ message: "Enter a valid email address." });

    }

    if (!password || password.length < 8) {
        res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    // if (!role || !["seeker", "connector"].includes(role)) {
    //     res.status(400).json({ message: "Role must be either 'seeker' or 'connector'." });

    // }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    const user = await User.create({ name, email, password, role });

    const otp = generateOTP();
    await OTP.create({ email, otp });

    await sendEmail(email, otp);

    res.status(201).json({
        status: "success",
        message: "Signup successful, OTP sent to your email",
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    console.log("user", user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password." });
    }
    // ✅ Check if email is verified
    if (!user.emailVerified) {
        return res.status(403).json({ message: "Email is not verified. Please verify your email before logging in." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    let userData = {
        "userID": user._id,
        "email": user.email,
        "emailVerified": user.emailVerified,
        "photo": user.photo,
        "role": user.role,
        "name": user.name,
        "isProfileCompleted": user.isprofileCompleted

    };

    res.status(200).json({ token: token, status: "success", user: userData });
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord)
        return res.status(400).json({ message: "Invalid or expired OTP" });

    await User.updateOne({ email }, { emailVerified: true });
    await OTP.deleteMany({ email }); // Clean up OTP after verification

    res.status(200).json({ message: "✅ Email verified successfully!" });
};

exports.resendOTP = async (req, res) => {
    const { email } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
        return res.status(400).json({ message: "User does not exist." });
    }

    const otp = generateOTP();
    await OTP.deleteMany({ email }); // remove old OTP if exists
    await OTP.create({ email, otp });

    await sendEmail(email, otp);

    res.status(200).json({ message: "OTP resent to your email." });
};


exports.logout = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token)

    const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // match JWT expiry

    await BlacklistedToken.create({ token, expiresAt });

    res.status(200).json({ message: "Logged out successfully" });
};


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    await sendEmail(email, `Reset your password: ${resetUrl}`);

    res.status(200).json({ message: "Reset link sent to email" });
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
};

exports.setUserRole = async (req, res) => {
    const { role } = req.body;

    console.log("role", role);

    if (!["seeker", "connector"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { role },
        { new: true }
    );

    console.log("user", user);

    res.status(200).json({ message: "Role updated", user });
};

exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
};
