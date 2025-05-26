// src/app/signup/page.tsx
"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";


export default function SignupPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/auth/signup", { ...form, role: "seeker" });
            // Cookies.set("accessToken", res.data.token, { expires: 7 });
            // login(res.data.user);
            // const user = res.data.user;
            toast.success("Signup successful! Please verify your email.");
            router.push("/verify");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const message = error.response?.data?.message || "Something went wrong!";
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-8 rounded-xl border border-gray-200 shadow-sm bg-white">
                <h2 className="text-3xl font-bold text-center text-gray-900">Sign Up</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full text-black  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full text-black  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium">
                    Sign Up
                </button>

                <div className="text-center text-sm text-gray-500">or continue with</div>

                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        try {
                            const res = await axios.post("/auth/google", {
                                credential: credentialResponse.credential
                            });
                            Cookies.set("accessToken", res.data.token, { expires: 7 });
                            login(res.data.user);
                            toast.success("Google signup successful!");
                            const user = res.data.user;
                            if (!user.role) router.push("/choose-role");
                            else if (!user.isprofileCompleted) router.push("/create-profile");
                            else router.push("/dashboard");
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        } catch (error) {
                            toast.error("Google signup failed!");
                        }
                    }}
                    onError={() => toast.error("Google sign-in was unsuccessful")}
                />
            </form>
        </div>
    );
}
