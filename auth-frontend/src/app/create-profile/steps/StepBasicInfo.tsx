// app/create-profile/StepBasicInfo.tsx
"use client";

import { ChangeEvent } from "react";

interface StepBasicInfoProps {
    data: any;
    onDataChange: (newData: any) => void;
    onNext: () => void;
}

export default function StepBasicInfo({
    data,
    onDataChange,
    onNext,
}: StepBasicInfoProps) {
    const { firstName, lastName, gender } = data;

    const canProceed = firstName.trim() !== "" && lastName.trim() !== "";

    return (
        <div className="max-w-lg mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Step: Basic Info</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onDataChange({ firstName: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onDataChange({ lastName: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Gender</label>
                    <select
                        value={gender}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            onDataChange({ gender: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={onNext}
                    disabled={!canProceed}
                    className={`px-4 py-2 rounded text-white ${canProceed
                            ? "bg-indigo-600 hover:bg-indigo-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
