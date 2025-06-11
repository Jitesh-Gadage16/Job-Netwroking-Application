// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface SocialLinks {
    linkedin?: string;
    github?: string;
    portfolio?: string;
}

interface WorkExperienceItem {
    _id: string;
    company: string;
    position: string;
    duration: string;
    description?: string;
}

interface EducationItem {
    institution: string;
    degree: string;
    fromYear: string;
    toYear: string;
}

interface Profile {
    socialLinks?: SocialLinks;
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    gender?: string;
    bio?: string;
    title?: string;
    profilePic?: string;
    location?: string;
    workExperience?: WorkExperienceItem[];
    education?: EducationItem[];
    domainsInterested?: string[];
    skills?: string[];
}

export default function ProfilePage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get<{ profile: Profile }>("/profile/me")
            .then(res => setProfile(res.data.profile))
            .catch(err => console.error("Failed to load profile:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Loading profile…</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">No profile data found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                    {profile.profilePic ? (
                        <Image
                            src={profile.profilePic}
                            width={100}
                            height={100}
                            alt="Avatar"
                            className="rounded-full object-cover border-2 border-white"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-gray-300 rounded-full" />
                    )}
                    <div>
                        <h1 className="text-2xl font-bold">
                            {profile.firstName} {profile.lastName}
                        </h1>
                        {profile.title && <p className="mt-1">{profile.title}</p>}
                        {user?.email && <p className="mt-1 text-sm opacity-80">{user.email}</p>}
                    </div>
                </div>

                {/* About Section */}
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold mb-2">About</h2>
                    {profile.bio && <p className="mb-2">{profile.bio}</p>}
                    {profile.location && (
                        <p className="text-gray-600">Location: {profile.location}</p>
                    )}
                </div>

                {/* Work Experience Section */}
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
                    {profile.workExperience?.length ? (
                        <ul className="space-y-4">
                            {profile.workExperience.map(job => (
                                <li key={job._id} className="space-y-1">
                                    <p className="font-medium">
                                        {job.position} @ {job.company}
                                    </p>
                                    <p className="text-sm text-gray-600">{job.duration}</p>
                                    {job.description && <p className="mt-1">{job.description}</p>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No work experience added.</p>
                    )}
                </div>

                {/* Education Section */}
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold mb-4">Education</h2>
                    {profile.education?.length ? (
                        <ul className="space-y-4">
                            {profile.education.map((edu, idx) => (
                                <li key={idx} className="space-y-1">
                                    <p className="font-medium">
                                        {edu.degree}, {edu.institution}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {edu.fromYear} - {edu.toYear}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No education details added.</p>
                    )}
                </div>

                {/* Skills & Domains Section */}
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Skills & Domains</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {profile.domainsInterested?.map((domain, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                            >
                                {domain}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {profile.skills?.map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-green-100 text-green-800 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer / Edit */}
                <div className="p-4 border-t text-right">
                    <Link
                        href="/create-profile"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Edit Profile
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
