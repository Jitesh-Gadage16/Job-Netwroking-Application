// app/create-profile/steps/StepEducation.tsx
"use client";

import React from "react";

interface EducationItem {
    degree: string;
    university: string;
    year: string;
}

interface StepEducationProps {
    data: {
        education: EducationItem[];
        // …other fields if needed
    };
    onDataChange: (newData: StepEducationProps["data"]) => void; // Ensure parent passes this prop
    onNext: () => void;
    onBack: () => void;
}

export default function StepEducation({
    data,
    onDataChange,
    onNext,
    onBack,
}: StepEducationProps) {
    const handleChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const updated = [...data.education];
        updated[index][e.target.name as keyof EducationItem] = e.target.value;
        onDataChange({ ...data, education: updated });
    };

    const addEducation = () => {
        onDataChange({
            ...data,
            education: [
                ...data.education,
                { degree: "", university: "", year: "" },
            ],
        });
    };

    const removeEducation = (index: number) => {
        if (data.education.length <= 1) return; // always keep at least one
        const updated = data.education.filter((_, i) => i !== index);
        onDataChange({ ...data, education: updated });
    };

    return (
        <div className="max-w-lg mx-auto py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Step 4: Education
            </h2>

            {/* CARD CONTAINER */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                {data.education.map((edu, index) => (
                    <div key={index} className="space-y-3">
                        <input
                            name="degree"
                            value={edu.degree}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Degree (e.g., B.Tech, MHA)"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            name="university"
                            value={edu.university}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="University"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            name="year"
                            value={edu.year}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Graduation Year (e.g., 2025)"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        {index > 0 && (
                            <button
                                onClick={() => removeEducation(index)}
                                type="button"
                                className="text-red-600 text-sm hover:underline"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* + Add More */}
            <div className="mt-4">
                <button
                    onClick={addEducation}
                    className="text-blue-600 text-sm hover:underline"
                    type="button"
                >
                    + Add more education
                </button>
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
