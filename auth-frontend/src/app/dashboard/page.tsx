"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) return; // wait for context to load

        if (!user?.email) {
            router.replace("/login");
        } else if (!user?.isprofileCompleted) {
            router.replace("/create-profile");
        }
    }, [user]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
        </div>
    );
}
