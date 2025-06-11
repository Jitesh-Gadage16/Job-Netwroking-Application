// routes/uploadImage.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig");
const { protect } = require("../middleware/authMiddleware"); // optional if you want to protect

const router = express.Router();

// 1) Multer storage: store files temporarily in /tmp
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/tmp");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

// 2) File filter: only accept images
function fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
}

// 3) Multer instance
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
    fileFilter,
});

// 4) POST /api/upload-image
//    (a) If you want to protect this route, insert `protect` as middleware: [protect, upload.single("file"), ...]
//    (b) Otherwise omit `protect` if you want it open to all
router.post(
    "/",
    // protect,    // <–– Uncomment if you want only authenticated users to upload
    upload.single("file"),
    async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("File uploaded:", req.file);

        try {
            // Upload to Cloudinary under a folder "connection-currency/profiles"
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "connection-currency",
            });
            console.log("first result", result);

            // Delete local file after uploading
            fs.unlink(req.file.path, (err) => {
                if (err) console.warn("Failed to delete local temp file:", err);
            });

            // Return the secure URL to the client
            return res.status(200).json({ imageUrl: result.secure_url });
        } catch (err) {
            console.error("Cloudinary upload error:", err);
            return res.status(500).json({ error: "Image upload failed" });
        }
    }
);

module.exports = router;
