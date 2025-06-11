const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure correct filename
const BlacklistedToken = require("../models/BlacklistedToken");

// Define the `protect` function before exporting
const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Check if token is blacklisted
    const blacklisted = await BlacklistedToken.findOne({ token });
    if (blacklisted) return res.status(401).json({ message: "Token is blacklisted" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) return res.status(401).json({ message: "User not found" });

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// ✅ Ensure `protect` is defined before exporting
module.exports = { protect };
