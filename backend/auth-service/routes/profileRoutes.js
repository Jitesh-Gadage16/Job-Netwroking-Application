const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const profileController = require("../controllers/profileController");

router.post("/", protect, profileController.createProfile);
router.put("/", protect, profileController.updateProfile);
router.get("/me", protect, profileController.getMyProfile);

module.exports = router;
