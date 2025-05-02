"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function Verify() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        if (savedEmail) {
            setEmail(savedEmail);
        } else {
            alert("No email found. Please sign up again.");
            router.push("/signup");
        }
    }, []);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/auth/verify-otp", { email, otp });
            localStorage.removeItem("email"); // ✅ Clean up after use
            router.push("/login");
        } catch (error: any) {
            const message = error.response?.data?.message || "Verification failed.";
            alert(message); // Or use toast if you're using a better UI
        }
    };

    return (
        <form onSubmit={handleVerify} className="space-y-4 max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold">Verify Email</h2>
            <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="input"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Verify</button>
        </form>
    );
}
