const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    gender: String,
    bio: String,
    title: String,
    profilePic: String,
    phone: String,
    location: String,
    education: {
        degree: String,
        university: String,
        year: String
    },
    workExperience: [{
        company: String,
        position: String,
        duration: String
    }],
    domainsInterested: [String],
    socialLinks: {
        linkedin: String,
        github: String,
        portfolio: String
    },
    profilePic: { type: String, default: "default.jpg" },
    skills: [String],
    role: { type: String, enum: ["seeker", "connector"] }
}, { timestamps: true });

module.exports = mongoose.models.UserProfile ||
    mongoose.model("UserProfile", UserProfileSchema);
