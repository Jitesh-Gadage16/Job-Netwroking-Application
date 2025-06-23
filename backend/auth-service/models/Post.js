const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    tags: [String],
    image: [{ type: String }], // ⬅️ updated here
    category: {
        type: String, enum: ["Information Technology & Software",
            "Data Science & Analytics",
            "Product & UX Design",
            "Healthcare & Life Sciences",
            "Operations & Supply Chain",
            "Finance & Fintech",
            "Marketing, Communications & Growth",
            "Sales & Business Development",
            "Human Resources & Talent",
            "Consulting & Professional Services",
            "Education, Training & Mentorship",
            "Startups & Entrepreneurship",
            "Networking & Community",
            "Manufacturing & Engineering",
            "Energy, Utilities & Sustainability",
            "Retail, E-commerce & Consumer Goods",
            "Media, Entertainment & Gaming",
            "Telecommunications & Connectivity",
            "Transportation, Logistics & Mobility",
            "Real Estate, Construction & Infrastructure",
            "Government, Public Sector & Non-profit"
        ], default: "general"
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);



