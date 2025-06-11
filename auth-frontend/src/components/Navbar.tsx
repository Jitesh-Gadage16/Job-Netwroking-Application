// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
            <Link href="/" className="text-xl font-bold text-black">Connection Currencry</Link>

            <div className="space-x-4">
                {user ? (
                    <>
                        <Link href="/dashboard" className="text-blue-600">Dashboard</Link>
                        <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-blue-600">Login</Link>
                        <Link href="/signup" className="text-green-600">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
