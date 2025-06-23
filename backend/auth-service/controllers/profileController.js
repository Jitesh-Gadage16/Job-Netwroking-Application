const UserProfile = require("../models/UserProfile");
const User = require("../models/User");

exports.createProfile = async (req, res) => {
    try {
        const existing = await UserProfile.findOne({ userId: req.user.id });
        if (existing) {
            return res.status(400).json({ message: "Profile already exists" });
        }

        const profile = await UserProfile.create({ ...req.body, userId: req.user.id });

        // ✅ Update the User with profile completion + back-reference
        await User.findByIdAndUpdate(req.user.id, {
            isprofileCompleted: true,
            userProfile: profile._id,
        });

        res.status(201).json({ message: "Profile created", profile });
    } catch (err) {
        console.error("Create profile error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const updated = await UserProfile.findOneAndUpdate(
            { userId: req.user.id },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Profile not found for this user" });
        }

        // ✅ Ensure back-reference in User is correct
        await User.findByIdAndUpdate(req.user.id, {
            userProfile: updated._id,
            isprofileCompleted: true // optional re-enforce
        });

        return res.status(200).json({
            message: "Profile updated successfully",
            profile: updated
        });
    } catch (err) {
        console.error("Error updating profile:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.getMyProfile = async (req, res) => {
    const profile = await UserProfile.findOne({ userId: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json({ profile });
};
