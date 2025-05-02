// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const email = localStorage.getItem("email");
        if (token && email) {
            setUser({ email });
        }
    }, []);

    const login = (userData: any, token: string) => {
        // Save token in a cookie instead of localStorage
        Cookies.set("accessToken", token, {
            path: "/",
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production",
            expires: 7, // days
        });

        localStorage.setItem("email", userData.email); // optional
        setUser(userData);
    };

    const logout = () => {
        Cookies.remove("accessToken");
        localStorage.removeItem("email");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
