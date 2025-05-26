// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/login", form);
            Cookies.set("accessToken", res.data.token, { expires: 7 });
            login(res.data.user);

            const user = res.data.user;
            if (!user.role) router.push("/choose-role");
            else if (!user.isprofileCompleted) router.push("/create-profile");
            else router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-8 rounded-xl border border-gray-200 shadow-sm bg-white">
                <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
                <input type="email" placeholder="Email" required
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={e => setForm({ ...form, email: e.target.value })} />

                <input type="password" placeholder="Password" required
                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={e => setForm({ ...form, password: e.target.value })} />

                <div className="text-right">
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium">Login</button>

                <div className="text-center text-sm text-gray-500">or continue with</div>

                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        try {
                            const res = await axios.post("/auth/google", { credential: credentialResponse.credential });
                            Cookies.set("accessToken", res.data.token, { expires: 7 });
                            login(res.data.user);
                            const user = res.data.user;
                            if (!user.role) router.push("/choose-role");
                            else if (!user.isprofileCompleted) router.push("/create-profile");
                            else router.push("/dashboard");
                        } catch {
                            toast.error("Google login failed");
                        }
                    }}
                    onError={() => toast.error("Google sign-in failed")}
                />
            </form>
        </div>
    );
}
