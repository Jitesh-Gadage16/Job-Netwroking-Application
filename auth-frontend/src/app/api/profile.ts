// pages/api/profile.js
const formidable = require("formidable");
const fs = require("fs");
const dbConnect = require("../../lib/mongoose");
const Profile = require("../../models/Profile");
const cloudinary = require("../../lib/cloudinary");

// Disable Next’s default JSON parser
export const config = {
  api: {
    bodyParser: false,
  },
};

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  const form = new formidable.IncomingForm({
    multiples: false,
    keepExtensions: true,
    maxFileSize: 2 * 1024 * 1024, // 2 MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(500).json({ success: false, error: "Form parsing failed" });
    }

    // Extract text fields (strings + JSON-encoded arrays)
    const firstName = fields.firstName || "";
    const lastName = fields.lastName || "";
    // …other scalar fields…

    let education = [];
    let workExperience = [];
    let domainsInterested = [];
    let socialLinks = {};
    try {
      if (fields.education) education = JSON.parse(fields.education);
      if (fields.workExperience) workExperience = JSON.parse(fields.workExperience);
      if (fields.domainsInterested) domainsInterested = JSON.parse(fields.domainsInterested);
      if (fields.socialLinks) socialLinks = JSON.parse(fields.socialLinks);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr);
      return res.status(400).json({ success: false, error: "Invalid JSON in form fields" });
    }

    // Handle avatar upload
    let avatarUrl = "";
    if (files.avatar) {
      const file = files.avatar;
      const tempPath = file.filepath; // Formidable temp location

      try {
        const uploadResult = await cloudinary.uploader.upload(tempPath, {
          folder: "user_avatars",
          resource_type: "image",
        });
        avatarUrl = uploadResult.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr);
        return res.status(500).json({ success: false, error: "Image upload failed" });
      } finally {
        try {
          fs.unlinkSync(tempPath);
        } catch (unlinkErr) {
          console.warn("Failed to delete temp file:", unlinkErr);
        }
      }
    } else {
      avatarUrl = "https://res.cloudinary.com/your_cloud_name/.../default-avatar.png";
    }

    // Save to MongoDB
    try {
      await dbConnect();
      const newProfile = await Profile.create({
        firstName,
        lastName,
        gender: fields.gender || "",
        phone: fields.phone || "",
        location: fields.location || "",
        title: fields.title || "",
        bio: fields.bio || "",
        education,
        workExperience,
        domainsInterested,
        socialLinks,
        avatarUrl,
      });
      return res.status(201).json({ success: true, data: newProfile });
    } catch (dbErr) {
      console.error("DB save error:", dbErr);
      return res.status(500).json({ success: false, error: "Database save failed" });
    }
  });
};
