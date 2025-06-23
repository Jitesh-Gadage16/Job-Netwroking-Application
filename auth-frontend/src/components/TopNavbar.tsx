"use client";

import { Bell, Briefcase, Home, MessageSquare, Users, ChevronDown, LogOut } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/utils/getInitials";


export default function TopNavbar() {


    // compute initials

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        Cookies.remove("accessToken");
        localStorage.clear();
        window.location.href = "/login";
    };

    const { user } = useAuth();

    console.log("user in TopNavbar:", user);

    const initials = getInitials(user?.name);


    console.log(">>>>>", user);

    const showNavbar = user && user.isprofileCompleted;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !(dropdownRef.current as any).contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="flex items-center justify-between px-6 py-2 shadow-sm border border-gray-100 bg-white  relative z-50">
            {/* Left: Logo + Search */}
            <div className="flex items-center gap-4 text-black">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users text-white"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                <Link href="/" className="text-lg font-semibold">
                    <div><h1 className="text-xl font-bold text-gray-900">Connection Currency</h1><p className="text-sm text-gray-600">Gamified networking for meaningful connections</p></div>
                </Link>

                {/* <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-1.5 rounded bg-gray-100 text-sm"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
                </div> */}
            </div>

            {/* Center: Icons */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
                {/* <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-purple-600"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg><span className="font-semibold text-purple-700">1250</span><span className="text-sm text-gray-600">points</span></div> */}
                {/* <NavItem icon={<Users className="w-5 h-5" />} label="My Network" />
                <NavItem icon={<Briefcase className="w-5 h-5" />} label="Jobs" />
                <NavItem icon={<MessageSquare className="w-5 h-5" />} label="Messaging" />
                <div className="relative flex flex-col items-center hover:text-black cursor-pointer">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                    <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">1</span>
                </div> */}
                {!showNavbar && (

                    <Link href="/login" className="text-blue-600 hover:underline">
                        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all">Login</button>
                    </Link>
                )}
                {/* {!showNavbar && (
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all">Sign Up</button>
                    </Link>
                )} */}

            </div>

            {/* Right: Profile Dropdown */}
            {showNavbar && (

                <div className="relative flex justify-between gap-2" ref={dropdownRef}>

                    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap text-purple-600"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg><span className="font-semibold text-purple-700">1250</span><span className="text-sm text-gray-600">points</span></div>

                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 px-2 py-1 text-sm hover:shadow-sm"
                    >
                        <div
                            className="h-8 w-8 rounded-full flex items-center justify-center
                         bg-gradient-to-r from-purple-600 to-blue-600
                         text-white font-semibold"
                        >
                            {initials}
                        </div>
                        {/* <ChevronDown className="w-4 h-4 text-gray-600" /> */}
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 top-2.5 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-md z-[999]">
                            <div className="px-4 py-3 border-b">
                                <p className="font-medium text-gray-800 font-bold-700 ">{user.name} </p>
                                {/* <p className="text-xs text-gray-500">{user.title || "User Title"}</p> */}
                            </div>
                            <ul className="text-sm">
                                <li><Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">View Profile</Link></li>
                                <li><Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link></li>
                            </ul>
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center justify-between px-4 py-2 text-sm text-red-500 border-t hover:bg-gray-100"
                            >
                                Sign Out <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex flex-col items-center hover:text-black cursor-pointer">
            {icon}
            <span>{label}</span>
        </div>
    );
}
