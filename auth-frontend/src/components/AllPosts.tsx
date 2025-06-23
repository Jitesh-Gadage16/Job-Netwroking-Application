"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { formatDistanceToNow } from "date-fns";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/post/all")
            .then(res => {
                setPosts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading posts", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Connection Requests</h2>
                <div className="flex gap-3">
                    <input
                        placeholder="Search requests..."
                        className="px-3 py-2 border rounded text-sm"
                    />
                    <select className="border px-3 py-2 text-sm rounded">
                        <option>All Categories</option>
                    </select>
                </div>
            </div>

            <div className="space-y-5">
                {loading
                    ? Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
                    : posts.map(post => <PostCard key={post._id} post={post} />)}
            </div>
        </div>
    );
}

function PostCard({ post }: { post: any }) {
    const {
        title,
        description,
        tags,
        createdAt,
        createdBy,
    } = post;

    const name = createdBy?.userProfile
        ? `${createdBy.userProfile.firstName} ${createdBy.userProfile.lastName}`
        : createdBy?.name || "Unknown";

    const role = createdBy?.userProfile?.title || "";

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer">
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Medium</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{name}{role && `, ${role}`}</p>
            <p className="text-sm text-gray-700 mb-3">{description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">{tag}</span>
                ))}
            </div>

            <div className="flex items-center text-xs text-gray-500 justify-between">
                <div className="flex gap-4">
                    <span>⏱ {formatDistanceToNow(new Date(createdAt))} ago</span>
                    <span>👁 8 viewed</span>
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
                    View Details
                </button>
            </div>
        </div>
    );
}

function PostCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
            <div className="flex justify-between items-center mb-1">
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-3 w-1/4 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-2/3 bg-gray-200 rounded mb-4" />
            <div className="flex gap-2 mb-4">
                <div className="h-5 w-16 bg-gray-200 rounded" />
                <div className="h-5 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-14 bg-gray-200 rounded" />
            </div>
            <div className="flex justify-between">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-8 w-24 bg-gray-300 rounded" />
            </div>
        </div>
    );
}
