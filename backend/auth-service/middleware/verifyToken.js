// middleware/verifyToken.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // We assume your JWT payload has a 'userId' field
        req.userId = payload.userId;
        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
}

module.exports = verifyToken;
