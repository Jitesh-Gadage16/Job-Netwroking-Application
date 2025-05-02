// app/create-profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export default function CreateProfile() {
    const [form, setForm] = useState({ bio: "", location: "", skills: "" });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const email = localStorage.getItem("email");
            await axios.post("/users/profile", { ...form, email }); // Assuming backend expects email
            toast.success("Profile created!");
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Profile creation failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
            <h2 className="text-2xl font-bold">Create Profile</h2>
            <input
                className="input"
                placeholder="Bio"
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                required
            />
            <input
                className="input"
                placeholder="Location"
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
            />
            <input
                className="input"
                placeholder="Skills (comma separated)"
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                required
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
    );
}
