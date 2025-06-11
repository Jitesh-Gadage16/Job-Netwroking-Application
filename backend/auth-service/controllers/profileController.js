const UserProfile = require("../models/UserProfile");
const User = require("../models/User");

exports.createProfile = async (req, res) => {
    const existing = await UserProfile.findOne({ userId: req.user.id });
    if (existing) return res.status(400).json({ message: "Profile already exists" });

    const profile = await UserProfile.create({ ...req.body, userId: req.user.id });

    await User.findByIdAndUpdate(req.user.id, { isprofileCompleted: true });
    res.status(201).json({ message: "Profile created", profile });
};

exports.updateProfile = async (req, res) => {
    try {
        // Find and update the profile for the logged-in user
        const updated = await UserProfile.findOneAndUpdate(
            { userId: req.user.id },
            { $set: req.body },           // set all provided fields
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res
                .status(404)
                .json({ message: "Profile not found for this user" });
        }

        // Optionally, if you want to re-check completion flag:
        // await User.findByIdAndUpdate(req.user.id, { isProfileCompleted: true });

        return res
            .status(200)
            .json({ message: "Profile updated successfully", profile: updated });
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
