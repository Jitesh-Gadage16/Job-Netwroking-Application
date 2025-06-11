// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Linkedin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const [signupform, setSignupForm] = useState({ name: "", email: "", password: "" });
    const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
    const { login } = useAuth();


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    };



    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const res = await api.post("/auth/login", form);
            console.log("res", res);
            if (res.status !== 200) throw new Error("Login failed");
            // Set access token in cookies
            Cookies.remove("accessToken"); // Clear any existing token

            Cookies.set("accessToken", res.data.token, { expires: 24 * 60 * 60 }); // Set new token with 24-hour expiry
            // Call login function from context
            // to update user state
            console.log("res.data.user", res.data.user);
            console.log("res.data.token", res.data.token);

            login(res.data.user);

            const user = res.data.user;
            console.log("user", user);
            if (!user.role) router.push("/choose-role");
            else if (!user.isProfileCompleted) router.push("/create-profile");
            else router.push("/dashboard");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/auth/signup", { ...signupform, role: "seeker" });
            // Cookies.set("accessToken", res.data.token, { expires: 7 });
            // login(res.data.user);
            // const user = res.data.user;
            localStorage.setItem("email", signupform.email)
            toast.success("Signup successful! Please verify your email.");
            router.push("/verify");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const message = error.response?.data?.message || "Something went wrong!";
            toast.error(message);
        }
    };

    // const handleSignUp = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         await api.post("/auth/signup", { ...form, role: "seeker" });
    //         // Cookies.set("accessToken", res.data.token, { expires: 7 });
    //         // login(res.data.user);
    //         // const user = res.data.user;
    //         toast.success("Signup successful! Please verify your email.");
    //         router.push("/verify");
    //     } catch (err: any) {
    //         toast.error(err.response?.data?.message || "Sign up failed");
    //     }
    // };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
            {/* Gradient border */}
            <div className="w-full max-w-md p-1 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-400">
                {/* Inner white card */}
                <div className="bg-white rounded-2xl p-6 space-y-6">
                    {/* Logo & Title */}
                    <div className="flex flex-col items-center space-y-2">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center">
                            <Link className="text-white" href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users text-white"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </Link>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Connection Currency</h1>
                        <p className="text-sm text-gray-600 text-center">
                            Gamify Your Network. Reward Meaningful Connections.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex rounded-full bg-gray-100 overflow-hidden">
                        <button
                            onClick={() => setActiveTab("login")}
                            className={`flex-1 py-2 text-center font-medium ${activeTab === "login"
                                ? "bg-white text-gray-900 shadow"
                                : "text-gray-500"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setActiveTab("signup")}
                            className={`flex-1 py-2 text-center font-medium ${activeTab === "signup"
                                ? "bg-white text-gray-900 shadow"
                                : "text-gray-500"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    {activeTab === "login" && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="mt-1 relative">
                                    <Mail className="absolute top-1/2 left-3 w-5 h-5 text-gray-400 -translate-y-1/2" />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"

                                        value={form.email}
                                        onChange={handleInput}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <Lock className="absolute top-1/2 left-3 w-5 h-5 text-gray-400 -translate-y-1/2" />
                                    <input
                                        name="password"
                                        type={isPasswordVisible ? "text" : "password"}
                                        placeholder="Enter your password"

                                        value={form.password}
                                        onChange={handleInput}
                                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {isPasswordVisible ? (
                                        <EyeOff
                                            onClick={() => setPasswordVisible(false)}
                                            className="absolute top-1/2 right-3 w-5 h-5 text-gray-400 -translate-y-1/2 cursor-pointer"
                                        />
                                    ) : (
                                        <Eye
                                            onClick={() => setPasswordVisible(true)}
                                            className="absolute top-1/2 right-3 w-5 h-5 text-gray-400 -translate-y-1/2 cursor-pointer"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
                            >
                                {activeTab === "login"
                                    ? "Login & Start Connecting"
                                    : "Sign Up & Start Connecting"}
                            </button>

                            <div className="text-center">
                                <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
                                    Forgot your password?
                                </Link>
                            </div>
                        </form>
                    )}

                    {activeTab === "signup" && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="mt-1 relative">
                                    <Mail className="opacity-0 absolute top-1/2 left-3 w-5 h-5 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => setSignupForm({ ...signupform, name: e.target.value })}

                                    />
                                </div>
                            </div>
                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="mt-1 relative">
                                    <Mail className="absolute top-1/2 left-3 w-5 h-5 text-gray-400 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full text-black  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => setSignupForm({ ...signupform, email: e.target.value })}

                                    />
                                </div>
                            </div>
                            {/* Password */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <Lock className="absolute top-1/2 left-3 w-5 h-5 text-gray-400 -translate-y-1/2" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full text-black  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => setSignupForm({ ...signupform, password: e.target.value })}

                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
                            >
                                Sign Up & Start Connecting
                            </button>
                        </form>
                    )}

                    {/* Divider */}
                    <div className="flex items-center text-gray-400">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="px-3 text-sm">or continue with</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Social Buttons */}
                    <div className="flex gap-4 justify-center">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    const res = await api.post("/auth/google", { credential: credentialResponse.credential });
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
                        {/* <button
                            onClick={() => (window.location.href = "/auth/linkedin")}
                            className="flex-1 flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
                        >
                            <Linkedin className="w-5 h-5 text-blue-700 mr-2" />
                            <span className="text-sm font-medium text-gray-700">
                                LinkedIn
                            </span>
                        </button> */}
                    </div>

                    {/* What You'll Get */}
                    <div className="bg-gray-50 p-4 rounded-lg text-gray-700 space-y-2">
                        <h3 className="font-semibold">What You'll Get:</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Earn points for meaningful connections</li>
                            <li>Build your connector reputation</li>
                            <li>Help others achieve their goals</li>
                            <li>Track your networking impact</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
