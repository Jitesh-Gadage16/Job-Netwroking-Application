"use client";

import { useEffect, useRef, useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export default function CreatePostModal({ isOpen, onClose, onPostCreated }: { isOpen: boolean; onClose: () => void; onPostCreated?: () => void }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        tags: "",
        category: ""
    });

    const modalRef = useRef<HTMLDivElement>(null);

    const CATEGORIES = [
        "Information Technology & Software",
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
    ];


    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Close on outside click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/post", {
                ...form,
                tags: form.tags.split(",").map(t => t.trim()),
            });
            toast.success("Post created successfully!");
            onClose();
            if (onPostCreated) onPostCreated(); // Call the callback if provided
        } catch (err: Error | unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            toast.error(error.response?.data?.message || "Failed to create post");
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center transition-opacity"
            style={{ backgroundColor: "rgb(0 0 0 / 0.75)" }}
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative animate-fade-in"
            >
                <h2 className="text-xl font-semibold mb-4">Create Connection Request</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full border px-3 py-2 rounded text-sm"
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        rows={4}
                        className="w-full border px-3 py-2 rounded text-sm"
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        className="w-full border px-3 py-2 rounded text-sm"
                        onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    />
                    <select
                        required
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full border px-3 py-2 rounded text-sm"
                    >
                        <option value="">Select a Category</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded border text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
