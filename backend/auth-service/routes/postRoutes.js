const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const postController = require("../controllers/postController");

console.log(" 🚀 postRoutes.js loaded");
// Allow uploading multiple images (up to 5)
router.post("/", protect, upload.array("images", 5), postController.createPost);
router.put("/:id", protect, upload.array("images", 5), postController.updatePost);
router.get("/all", postController.getAllPosts);
router.get("/my", protect, postController.getMyPosts);





module.exports = router;
