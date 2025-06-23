
const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");



exports.createPost = async (req, res) => {
    const { title, description, tags, category } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required." });
    }

    // Process tags safely
    let processedTags = [];

    if (typeof tags === "string") {
        processedTags = tags.split(",").map(t => t.trim());
    } else if (Array.isArray(tags)) {
        processedTags = tags.map(t => t.trim());
    }

    const imageUrls = req.files?.map(file => file.path) || [];

    const post = new Post({
        title,
        description,
        tags: processedTags,
        image: imageUrls,
        category,
        createdBy: req.user._id,
    });

    await post.save();
    res.status(201).json(post);
};


exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, description, tags } = req.body;


    try {

        console.log("Update post request body:", req.body);
        console.log("Update post request files:", req.files);
        console.log("id:", id);
        if (!id) {
            return res.status(400).json({ message: "Post ID is required" });
        }
        if (!title && !description && !tags && (!req.files || req.files.length === 0)) {
            return res.status(400).json({ message: "No fields to update" });
        }


        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ message: "Post not found" });

        // Ensure the user updating the post is the creator
        if (post.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to update this post" });
        }

        // Update fields
        if (title) post.title = title;
        if (description) post.description = description;
        if (tags) post.tags = tags.split(",").map(tag => tag.trim());

        // If new images are uploaded, replace old ones
        if (req.files && req.files.length > 0) {
            post.image = req.files.map(file => file.path); // Cloudinary URLs
        }

        await post.save();
        res.status(200).json(post);

    } catch (error) {
        console.error("Update post error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "createdBy",
                select: "name email role userProfile",
                populate: {
                    path: "userProfile",
                    select: "firstName lastName title profilePic"
                }
            });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Get all posts error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ createdBy: req.user._id })
            .sort({ createdAt: -1 })
            .populate({
                path: "createdBy",
                select: "name email role userProfile",
                populate: {
                    path: "userProfile",
                    select: "firstName lastName title profilePic"
                }
            });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Get my posts error:", error);
        res.status(500).json({ message: "Server error" });
    }
};