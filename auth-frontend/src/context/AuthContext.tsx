"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type User = {
    email: string;
    role?: string;
    isprofileCompleted?: boolean;
    [key: string]: any;
};

const AuthContext = createContext<{
    user: User | null;
    login: (userData: User, token?: string) => void;
    logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = Cookies.get("accessToken");

        // Optional: Load user from cookie/session in future
        if (token) {
            // You might want to fetch user from API or decode JWT to get info
            // For now, we'll keep user null and rely on login to set it
        }
    }, []);

    const login = (userData: User, token?: string) => {
        if (token) {
            Cookies.set("accessToken", token, {
                path: "/",
                sameSite: "Lax",
                secure: process.env.NODE_ENV === "production",
                expires: 7,
            });
        }
        setUser(userData);
    };

    const logout = () => {
        Cookies.remove("accessToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
