"use client";

import { usePathname } from "next/navigation";
import TopNavbar from "@/components/TopNavbar";
import { useAuth } from "@/context/AuthContext";

const hiddenRoutes = ["/login", "/signup", "/verify"];

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    console.log("user, ClientLayoutWrapper:", user);
    const pathname = usePathname();

    const hideNavbar = hiddenRoutes.includes(pathname);
    // const showNavbar = user && user.isprofileCompleted;

    return (
        <>
            {!hideNavbar && <TopNavbar />}
            <main className="p-4 max-w-7xl mx-auto">{children}</main>
        </>
    );
}
