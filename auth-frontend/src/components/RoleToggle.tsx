"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "@/lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RoleToggle() {
    const { user, login } = useAuth();
    const [loading, setLoading] = useState(false);

    const nextRole = user?.role === "seeker" ? "connector" : "seeker";

    const handleToggle = async () => {
        try {
            setLoading(true);
            const res = await axios.patch("/auth/set-role", { role: nextRole }, {
                headers: {
                    Authorization: `Bearer ${document.cookie.split("accessToken=")[1]}`,
                }
            });
            login(res.data.user); // update AuthContext
            toast.success(`You're now a ${nextRole}`);
        } catch (err) {
            toast.error("Failed to update role");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>


            <div className="bg-white border rounded-lg p-4 mb-6 bg-white shadow rounded-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-md font-semibold mb-1">
                            Current Role: <span className="capitalize text-blue-600">{user?.role}</span>
                        </h3>
                        {/* <p className="text-xs text-gray-500 italic">Don’t worry, you can change your role anytime.</p> */}
                    </div>
                    <button
                        disabled={loading}
                        onClick={handleToggle}
                        className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 text-sm"
                    >
                        Switch to {nextRole}
                    </button>
                </div>
            </div>
        </>
    );
}
