// app/create-profile/steps/StepWorkExperience.tsx
"use client";

import React from "react";

interface WorkItem {
    company: string;
    position: string;
    duration: string;
}

interface StepWorkExperienceProps {
    data: {
        workExperience: WorkItem[];
        // …any other fields in your full “data” object
    };
    onDataChange: (newData: any) => void; // Parent must pass this
    onNext: () => void;
    onBack: () => void;
}

export default function StepWorkExperience({
    data,
    onDataChange,
    onNext,
    onBack,
}: StepWorkExperienceProps) {
    const handleChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const updated = [...data.workExperience];
        updated[index][e.target.name as keyof WorkItem] = e.target.value;
        onDataChange({ ...data, workExperience: updated });
    };

    const addExperience = () => {
        onDataChange({
            ...data,
            workExperience: [
                ...data.workExperience,
                { company: "", position: "", duration: "" },
            ],
        });
    };

    const removeExperience = (index: number) => {
        // Always keep at least one entry
        if (data.workExperience.length <= 1) return;
        const updated = data.workExperience.filter((_, i) => i !== index);
        onDataChange({ ...data, workExperience: updated });
    };

    return (
        <div className="max-w-lg mx-auto py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Step 5: Work Experience (Optional)
            </h2>

            {/* ─────── CARD CONTAINER ─────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                {data.workExperience.map((exp, index) => (
                    <div key={index} className="space-y-3">
                        <input
                            name="company"
                            value={exp.company}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Company"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            name="position"
                            value={exp.position}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Position"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            name="duration"
                            value={exp.duration}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Duration (e.g., Jan 2022 – Present)"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        {index > 0 && (
                            <button
                                onClick={() => removeExperience(index)}
                                type="button"
                                className="text-red-600 text-sm hover:underline"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* ─────── + Add More Experience ─────── */}
            <div className="mt-4">
                <button
                    onClick={addExperience}
                    className="text-blue-600 text-sm hover:underline"
                    type="button"
                >
                    + Add more experience
                </button>
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
