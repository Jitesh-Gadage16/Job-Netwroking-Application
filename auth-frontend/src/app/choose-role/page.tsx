"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "@/lib/axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ChooseRolePage() {
    const { user, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push("/login"); // if user lost in flow
        else if (user.role) router.push("/dashboard"); // if role already set
    }, [user]);

    const handleSelect = async (role: "seeker" | "connector") => {
        try {
            const res = await axios.patch("/auth/set-role", { role }, {
                headers: {
                    Authorization: `Bearer ${document.cookie.split("accessToken=")[1]}`
                }
            });

            console.log("res", res)

            login(res.data.user); // Update auth context
            toast.success(`You're now a ${role}!`);
            router.push("/create-profile");
        } catch (err) {
            toast.error("Error updating role");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 text-center space-y-6">
            <h1 className="text-3xl font-bold">Choose Your Role</h1>
            <p className="text-gray-500">Are you looking for help or connecting others?</p>
            <div className="flex justify-center gap-6 mt-8">
                <button onClick={() => handleSelect("seeker")} className="bg-blue-600 px-4 py-2 rounded text-white">
                    I'm a Seeker
                </button>
                <button onClick={() => handleSelect("connector")} className="bg-green-600 px-4 py-2 rounded text-white">
                    I'm a Connector
                </button>
            </div>
        </div>
    );
}
