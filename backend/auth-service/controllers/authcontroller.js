const User = require("../models/User");
const OTP = require("../models/OTP");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendOTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });


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

    if (!role || !["seeker", "connector"].includes(role)) {
        res.status(400).json({ message: "Role must be either 'seeker' or 'connector'." });

    }

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
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token: token, status: "success" });
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

