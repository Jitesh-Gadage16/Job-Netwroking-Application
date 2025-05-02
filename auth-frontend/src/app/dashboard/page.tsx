// app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const email = localStorage.getItem("email");

        if (!email) {
            router.push("/login"); // redirect if not logged in
        }
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
        </div>
    );
}
