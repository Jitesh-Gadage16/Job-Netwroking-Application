"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios"; // your axios instance
import { formatDistanceToNow } from "date-fns";
import ConnectorProgressBar from "./ConnectorProgressBar"; // Adjust the import path as needed
import { Users } from 'lucide-react';





interface Post {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    createdAt: string;
    createdBy?: {
        userProfile?: {
            firstName?: string;
            title?: string;
        };
        name?: string;
    };
}

export default function ConnectorView() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/post/all") // adjust if needed based on your backend
            .then(res => {
                console.log("Fetched posts:", res.data);
                setPosts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching posts", err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
                {/* Header Section */}
                <div className="bg-green-50 rounded-lg p-6 mb-6">
                    <div className="flex items-start space-x-4">
                        <div className="bg-green-600 rounded-full p-2">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-lg font-semibold text-green-800 mb-2">How it works as a Connector</h2>
                            <p className="text-green-700 mb-4">
                                View connection requests from seekers and help facilitate connections. You can contact
                                seekers directly and provide assistance based on your network and expertise.
                            </p>
                            <p className="text-green-700 ">
                                Once a connection has been made, seekers can rate your assistance. You&#39;ll be able to
                                track your points and reputation in your profile, building your status as a trusted connector.
                            </p>
                            {/* <div className="flex items-center space-x-4">
                                <div className="bg-white rounded-lg p-3 flex items-center space-x-2">
                                    <Award className="h-5 w-5 text-green-600" />
                                    <div>
                                        <div className="text-sm font-medium text-gray-800">Your Points</div>
                                        <div className="text-lg font-bold text-green-600">125</div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-3 flex items-center space-x-2">
                                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">NOVICE NETWORKER</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <ConnectorProgressBar points={50} />
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
                {/* Stats Section */}


                {/* Filter UI */}
                <div className="flex gap-3 mb-4">
                    <input placeholder="Search connection requests" className="px-3 py-2 border rounded text-sm w-full" />
                    <select className="border px-3 py-2 text-sm rounded">
                        <option value="">Filter by post</option>
                        {posts.map((post: Post) => (
                            <option key={post._id} value={post._id}>{post.title}</option>
                        ))}
                    </select>
                    <button className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700">
                        View All Requests
                    </button>
                </div>

                {/* Post Feed */}
                <h4 className="text-md font-semibold mb-3">Available Connection Requests</h4>

                {loading ? (
                    <div className="text-sm text-gray-500 italic">Loading requests...</div>
                ) : (
                    posts.length > 0 ? (
                        <div className="space-y-4">
                            {posts.map((post: Post) => (
                                <div key={post._id} className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-semibold text-base">{post.title}</h3>
                                        <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(post.createdAt))} ago</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {post.tags.map((tag: string) => (
                                            <span key={tag} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">
                                            {post.createdBy?.userProfile?.firstName || post.createdBy?.name} • {post.createdBy?.userProfile?.title || ""}
                                        </span>
                                        <button className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">
                                            Connect →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500 italic">No requests available right now.</div>
                    )
                )}
            </div>
        </>
    );
}
