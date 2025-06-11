// app/create-profile/steps/StepProfilePicture.tsx
"use client";

import React, { ChangeEvent, useEffect, useState, FC } from "react";

interface StepProfilePictureProps {
    data: {
        profilePicFile?: File | string | null;  // now supports URL string too
        // …other fields in your “data” object
    };
    onDataChange: (newData: { profilePicFile?: File | string | null }) => void;
    onNext: () => void;
    onBack: () => void;
}

const StepProfilePicture: FC<StepProfilePictureProps> = ({
    data,
    onDataChange,
    onNext,
    onBack,
}) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Build preview from either File or existing URL
    useEffect(() => {
        const pic = data.profilePicFile;
        if (!pic) {
            setPreviewUrl(null);
            return;
        }

        // If it’s a string, assume it’s an existing URL
        if (typeof pic === "string") {
            setPreviewUrl(pic);
            return;
        }

        // Otherwise it’s a File — create a blob URL
        const objectUrl = URL.createObjectURL(pic);
        setPreviewUrl(objectUrl);
        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [data.profilePicFile]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        onDataChange({ profilePicFile: file });
    };

    return (
        <div className="max-w-lg mx-auto py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Step: Profile Picture
            </h2>

            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                <p className="text-gray-700 text-sm">
                    Please upload a profile picture (required). Max file size: 2 MB.
                </p>

                <div className="flex items-center space-x-4">
                    <div className="h-24 w-24 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Profile Preview"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <span className="text-2xl">👤</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Profile Picture
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block text-sm text-gray-600"
                        />
                        {!data.profilePicFile && (
                            <p className="mt-2 text-sm text-red-500">
                                Profile picture is required.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={onBack}
                    type="button"
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-200"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    type="button"
                    disabled={!data.profilePicFile}
                    className={`py-2 px-4 rounded text-white ${data.profilePicFile
                            ? "bg-indigo-600 hover:bg-indigo-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StepProfilePicture;
