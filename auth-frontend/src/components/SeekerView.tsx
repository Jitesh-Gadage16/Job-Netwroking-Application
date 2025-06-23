"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Plus } from 'lucide-react';


interface Post {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    createdAt: string;
}

import CreatePostModal from "./CreatePostModal"; // ⬅️ You’ll create this next

export default function SeekerView() {
    const [myPosts, setMyPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/post/my");
            setMyPosts(res.data);
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
        // Optionally, you can set up a polling mechanism to refresh posts every 30 seconds
        // const interval = setInterval(fetchPosts, 30000);
        // return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (

        <>
            <div>
                {/* Seeker Instructions */}
                <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                    <div className="flex items-start space-x-4">
                        <div className="bg-indigo-600 rounded-full p-2">
                            <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-lg font-semibold text-indigo-800 mb-2">How it works as a Seeker</h2>
                            <p className="text-indigo-700 mb-4">
                                Post a connection request so that connectors can view and help facilitate connections.
                                The more details you provide, the more helpful connectors can be.
                            </p>
                            <p className="text-indigo-700 mb-4">
                                Connectors will be able to view your request and reach out to chat with you. Once they provide
                                assistance and facilitate a connection, you'll be able to rate the value of their connection
                                and award them points.
                            </p>
                            <button onClick={() => { setIsModalOpen(true); console.log("Open modal") }} className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-indigo-700">
                                <Plus className="h-5 w-5" />
                                <span>Post What You&apos;re Looking For</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">



                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                    <span className="text-blue-600 text-lg">💬</span>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">How it works as a Seeker</h3>
                        <p className="text-sm text-gray-700">
                            Post a connection request so connectors can view and help facilitate connections...
                        </p>
                    </div>
                </div>

                {/* Button to open modal */}
                <button
                    onClick={() => { setIsModalOpen(true); console.log("Open modal") }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium mb-6"
                >
                    + Post What You&apos;re Looking For
                </button>

                <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onPostCreated={fetchPosts} />

                {/* Your Active Requests */}
                <h4 className="text-md font-semibold mb-3">Your Active Requests</h4>

                {loading ? (
                    <p className="text-sm text-gray-500 italic">Loading...</p>
                ) : myPosts.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No connection requests posted yet.</p>
                ) : (
                    <div className="space-y-4">
                        {myPosts.map((post: Post) => (
                            <div key={post._id} className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-base font-medium">{post.title}</h3>
                                    <span className="text-xs text-gray-400">{formatDistanceToNow(new Date(post.createdAt))} ago</span>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{post.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag: string) => (
                                        <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <div className="text-xs text-gray-500 mt-2 flex justify-between">
                                    <span>5 connectors viewed</span>
                                    <span>2 conversations started</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
