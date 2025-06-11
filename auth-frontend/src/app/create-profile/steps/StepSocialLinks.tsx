// app/create-profile/steps/StepSocialLinks.tsx
"use client";

import React from "react";

interface SocialLinks {
    linkedin: string;
    github: string;
    portfolio: string;
}

interface StepSocialLinksProps {
    data: {
        socialLinks: SocialLinks;
        // …any other fields in your full “data” object
    };
    onDataChange: (newData: any) => void; // renamed from onChange
    onNext: () => void;
    onBack: () => void;
}

export default function StepSocialLinks({
    data,
    onDataChange,
    onNext,
    onBack,
}: StepSocialLinksProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({
            ...data,
            socialLinks: {
                ...data.socialLinks,
                [e.target.name]: e.target.value,
            },
        });
    };

    return (
        <div className="max-w-lg mx-auto py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Step 7: Social Links
            </h2>
            <p className="text-gray-500 text-sm mb-4">
                Add your relevant social profiles:
            </p>

            {/* ─────── CARD CONTAINER ─────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                <input
                    name="linkedin"
                    value={data.socialLinks.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn URL"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    name="github"
                    value={data.socialLinks.github}
                    onChange={handleChange}
                    placeholder="GitHub URL"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    name="portfolio"
                    value={data.socialLinks.portfolio}
                    onChange={handleChange}
                    placeholder="Portfolio or Website URL"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* ─────── NAVIGATION BUTTONS ─────── */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={onBack}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-200"
                    type="button"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    type="button"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
