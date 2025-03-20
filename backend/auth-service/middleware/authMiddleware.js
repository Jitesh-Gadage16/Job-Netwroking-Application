const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure correct filename

// Define the `protect` function before exporting
const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user exists
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
};

// ✅ Ensure `protect` is defined before exporting
module.exports = { protect };
