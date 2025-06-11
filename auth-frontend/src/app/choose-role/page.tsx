// app/choose-role/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OPTIONS: {
    role: "seeker" | "connector";
    icon: string;
    title: string;
    description: string;
}[] = [
        {
            role: "seeker",
            icon: "🎯",
            title: "Seeker",
            description: "Looking for connections & opportunities",
        },
        {
            role: "connector",
            icon: "🤝",
            title: "Connector",
            description: "Love making introductions",
        },
    ];

export default function ChooseRolePage() {
    const { user, login } = useAuth();
    const router = useRouter();
    const [isSelecting, setIsSelecting] = useState(false);

    useEffect(() => {
        console.log("chose role page user:", user);
        if (!user) {
            router.push("/login"); // not logged in
        } else if (user.role) {
            router.push("/dashboard"); // already has role
        }
    }, [user]);

    const handleSelect = async (role: "seeker" | "connector") => {
        setIsSelecting(true);
        try {
            const res = await api.patch("/auth/set-role", { role });
            login(res.data.user);
            toast.success(`You're now a ${role}!`);
            router.push("/create-profile");
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error updating role");
        } finally {
            setIsSelecting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4">
            <div className="max-w-lg w-full text-center space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Choose Your Role</h1>
                <p className="text-gray-600">
                    Are you looking for help or connecting others?
                </p>

                <div className="grid grid-cols-2 gap-6">
                    {OPTIONS.map(({ role, icon, title, description }) => (
                        <button
                            key={role}
                            onClick={() => handleSelect(role)}
                            disabled={isSelecting}
                            className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="text-4xl mb-4">{icon}</span>
                            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                            <p className="mt-2 text-gray-600 text-sm">{description}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
