// app/create-profile/steps/StepBioAndTitle.tsx
"use client";

import React from "react";

interface StepBioAndTitleProps {
    data: {
        title?: string;
        bio?: string;
        // …any other fields in your data object
    };
    onDataChange: (newData: { title?: string; bio?: string }) => void; // renamed from onChange
    onNext: () => void;
    onBack: () => void;
}

export default function StepBioAndTitle({
    data,
    onDataChange,
    onNext,
    onBack,
}: StepBioAndTitleProps) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        onDataChange({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className="space-y-4 text-black max-w-lg mx-auto py-8">
            <h2 className="text-2xl font-bold text-gray-900">Step 3: Bio & Title</h2>

            <input
                name="title"
                value={data.title || ""}
                onChange={handleChange}
                placeholder="Professional Title (e.g., Product Manager, MHA Student)"
                className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
                name="bio"
                value={data.bio || ""}
                onChange={handleChange}
                placeholder="Write a short professional bio..."
                className="input w-full h-28 border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex justify-between pt-4">
                <button
                    onClick={onBack}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-200"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
