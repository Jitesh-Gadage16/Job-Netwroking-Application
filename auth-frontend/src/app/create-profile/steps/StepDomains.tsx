// app/create-profile/steps/StepDomains.tsx
"use client";

import React from "react";

const OPTIONS = [
    "Healthcare",
    "Startups",
    "Product Design",
    "Software Development",
    "Operations",
    "Mentorship",
    "Networking",
    "Data Science",
];

interface StepDomainsProps {
    data: {
        domainsInterested?: string[]; // note the “?” making it optional
    };
    onDataChange: (newData: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function StepDomains({
    data,
    onDataChange,
    onNext,
    onBack,
}: StepDomainsProps) {
    // Treat “undefined” as an empty array
    const selected: string[] = data.domainsInterested || [];

    const handleToggle = (option: string) => {
        const updated = selected.includes(option)
            ? selected.filter((item) => item !== option)
            : [...selected, option];
        onDataChange({ ...data, domainsInterested: updated });
    };

    return (
        <div className="max-w-lg mx-auto py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Step 6: Interested Domains
            </h2>
            <p className="text-gray-500 text-sm mb-4">
                Select fields you&apos;re interested in:
            </p>

            {/* CARD CONTAINER */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                    {OPTIONS.map((option) => (
                        <label
                            key={option}
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => handleToggle(option)}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* NAVIGATION BUTTONS */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={onBack}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-200"
                    type="button"
                >
                    Back
                </button>
                <button
                    onClick={() => onNext()}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    type="button"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
