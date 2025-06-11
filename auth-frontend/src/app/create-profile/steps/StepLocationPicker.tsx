// app/create-profile/steps/StepLocationPicker.tsx
"use client";

import React, { useRef, useEffect, useState, ChangeEvent, FC } from "react";
import Script from "next/script";

interface StepLocationPickerProps {
    data: {
        location?: string;
        profilePic?: File | string | null;
        // …any other fields from previous steps
    };
    onDataChange: (newData: { location?: string; profilePic?: File | string | null }) => void;
    onNext: () => void;
    onBack: () => void;
}

declare global {
    interface Window {
        google: {
            maps: {
                places: {
                    Autocomplete: new (
                        input: HTMLInputElement,
                        opts?: google.maps.places.AutocompleteOptions
                    ) => google.maps.places.Autocomplete;
                };
            };
        };
    }
}

const StepLocationPicker: FC<StepLocationPickerProps> = ({
    data,
    onDataChange,
    onNext,
    onBack,
}) => {
    const autocompleteRef = useRef<HTMLInputElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [googleReady, setGoogleReady] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        typeof data.profilePic === "string" ? data.profilePic : null
    );

    // Regenerate preview when profilePic changes
    useEffect(() => {
        if (!data.profilePic) {
            setPreviewUrl(null);
            return;
        }
        if (typeof data.profilePic === "string") {
            // existing URL
            setPreviewUrl(data.profilePic);
            return;
        }
        // it's a File/Blob
        const objectUrl = URL.createObjectURL(data.profilePic);
        setPreviewUrl(objectUrl);
        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [data.profilePic]);

    // Initialize Google Places autocomplete once script loads
    useEffect(() => {
        if (!googleReady || !autocompleteRef.current) return;
        const autocomplete = new window.google.maps.places.Autocomplete(
            autocompleteRef.current!,
            {
                types: ["(cities)"],
                componentRestrictions: { country: "us" },
            }
        );
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place.formatted_address) {
                onDataChange({ location: place.formatted_address, profilePic: data.profilePic });
            }
        });
    }, [googleReady, data.profilePic, onDataChange]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        onDataChange({ location: data.location, profilePic: file });
    };

    return (
        <>
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`}
                strategy="afterInteractive"
                onLoad={() => setGoogleReady(true)}
            />

            <div className="space-y-6 text-black max-w-lg mx-auto py-8">
                <h2 className="text-2xl font-bold text-gray-900">Step 2: Location & Photo</h2>
                <p className="text-gray-500 text-sm">
                    Enter your city (or type manually), and optionally upload a profile picture.
                </p>

                {/* LOCATION INPUT */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        id="location"
                        ref={autocompleteRef}
                        type="text"
                        placeholder="Search location"
                        defaultValue={data.location || ""}
                        onBlur={(e) => {
                            if (e.target.value) {
                                onDataChange({ location: e.target.value, profilePic: data.profilePic });
                            }
                        }}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* PROFILE PICTURE UPLOAD */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Profile Picture (optional)
                    </label>
                    <div className="mt-2 flex items-center space-x-4">
                        <div className="h-16 w-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Profile Preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                    <span className="text-xl">👤</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-1 border rounded-md bg-white text-sm hover:bg-gray-50"
                            >
                                {data.profilePic ? "Change Photo" : "Upload Photo"}
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                        Max file size 2 MB. If you skip, a default avatar will be used.
                    </p>
                </div>

                {/* NAVIGATION BUTTONS */}
                <div className="flex justify-between pt-4">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 border rounded-md bg-gray-300 text-gray-700 hover:bg-gray-200"
                    >
                        Back
                    </button>
                    <button
                        onClick={onNext}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default StepLocationPicker;
