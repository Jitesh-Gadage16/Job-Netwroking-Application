// utils/sendOTP.js
const transporter = require("../config/email");

const sendOTPEmail = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Your Verification OTP",
            html: `<h3>Your OTP is: <b>${otp}</b></h3><p>Expires in 10 minutes.</p>`,
        });

        console.log("✅ OTP email sent successfully");
    } catch (err) {
        console.error("❌ Error sending OTP email:", err);
        throw err;
    }
};

module.exports = sendOTPEmail;
