// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const logoutTimer = useRef<NodeJS.Timeout | null>(null);

    const clearLogoutTimer = () => {
        if (logoutTimer.current) {
            clearTimeout(logoutTimer.current);
            logoutTimer.current = null;
        }
    };

    const scheduleAutoLogout = (expiresAt: number) => {
        const now = Date.now();
        const msUntilExpiry = expiresAt - now;
        if (msUntilExpiry <= 0) {
            // Already expired
            logout();
        } else {
            logoutTimer.current = setTimeout(() => {
                logout();
            }, msUntilExpiry);
        }
    };

    useEffect(() => {
        const token = Cookies.get("accessToken");
        const storedUser = localStorage.getItem("user");
        const expiryStr = localStorage.getItem("tokenExpiry"); // timestamp in ms

        if (token && storedUser && expiryStr) {
            const expiresAt = parseInt(expiryStr, 10);
            if (Date.now() >= expiresAt) {
                // Token has already expired
                logout();
            } else {
                // Token still valid
                try {
                    setUser(JSON.parse(storedUser));
                } catch (err) {
                    console.error("Failed to parse stored user:", err);
                    logout();
                }
                // schedule automatic logout at the right time
                scheduleAutoLogout(expiresAt);
            }
        } else {
            // No valid token/user
            logout();
        }

        setLoading(false);

        return () => {
            clearLogoutTimer();
        };
    }, []);

    const login = (userData: any, token: string) => {
        // Set cookie for 1 hour (1/24 of a day)
        console.log("first login", userData, token);
        Cookies.set("accessToken", token, {
            path: "/",
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production",
            expires: 1 / 24,
            httpOnly: true,
        });

        // Store user object
        localStorage.setItem("user", JSON.stringify(userData));

        // Compute expiration timestamp (in ms)
        const expiresAt = Date.now() + 1000 * 60 * 60; // 1 hour from now
        localStorage.setItem("tokenExpiry", expiresAt.toString());

        setUser(userData);

        // Schedule automatic logout
        scheduleAutoLogout(expiresAt);
    };

    const logout = () => {
        Cookies.remove("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("tokenExpiry");
        setUser(null);
        clearLogoutTimer();
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
