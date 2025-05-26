const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            isprofileCompleted: user.isprofileCompleted
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = generateJWT;
