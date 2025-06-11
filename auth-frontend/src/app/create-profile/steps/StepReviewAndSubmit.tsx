// app/create-profile/steps/StepReviewAndSubmit.tsx
"use client";

import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface StepReviewAndSubmitProps {
    data: any; // the entire form data, including nested fields
    onBack: () => void;
    onEdit: (stepIndex: number) => void; // jump to a specific step,
    isEdit: boolean;
}

export default function StepReviewAndSubmit({
    data,
    isEdit,
    onBack,
    onEdit,
}: StepReviewAndSubmitProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!data.profilePicFile) {
            toast.error("Profile picture is missing.");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1) Upload profile pic
            const uploadForm = new FormData();
            uploadForm.append("file", data.profilePicFile as File);


            if (isEdit) {
                const updateRes = await api.put("/profile", data);
                if (updateRes.status === 200) {
                    toast.success("Profile updated successfully!");
                }
                router.push("/profile");
                return;
            } else {
                const uploadRes = await api.post(
                    "/upload-image",
                    uploadForm,
                    {
                        headers: {
                            Authorization: `Bearer ${document.cookie.split("accessToken=")[1]}`
                        }
                    }
                );
                const imageUrl = uploadRes.data.imageUrl;

                // 2) Build final payload (drop the File object)
                const {
                    // profilePicFile,
                    // The rest of the data fields:
                    firstName,
                    lastName,
                    gender,
                    location,
                    title,
                    bio,
                    education,
                    workExperience,
                    domainsInterested,
                    socialLinks,
                    // …any other keys
                } = data;

                const profilePayload = {
                    firstName,
                    lastName,
                    gender,
                    location,
                    title,
                    bio,
                    education,
                    workExperience,
                    domainsInterested,
                    socialLinks,
                    profilePic: imageUrl,
                };

                // 3) Submit profile to backend
                await api.post("/profile", profilePayload, {
                    headers: {
                        Authorization: `Bearer ${document.cookie.split("accessToken=")[1]}`
                    }
                });
            }

            toast.success("Profile created successfully!");
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Submission failed:", err);
            toast.error(
                err?.response?.data?.error || "Submission failed. Please try again."
            );
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto py-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
                Step: Review & Submit
            </h2>

            {/* ─────── CARD: BASIC INFO ─────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Basic Info</h3>
                    <button
                        onClick={() => onEdit(0)}
                        className="text-indigo-600 text-sm hover:underline"
                        type="button"
                    >
                        Edit
                    </button>
                </div>
                <div className="mt-3 space-y-1 text-gray-700">
                    <p>
                        <span className="font-medium">First Name:</span>{" "}
                        {data.firstName || "—"}
                    </p>
                    <p>
                        <span className="font-medium">Last Name:</span>{" "}
                        {data.lastName || "—"}
                    </p>
                    <p>
                        <span className="font-medium">Gender:</span> {data.gender || "—"}
                    </p>
                </div>
            </div>

            {/* ─────── CARD: LOCATION ─────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Location</h3>
                    <button
                        onClick={() => onEdit(1)}
                        className="text-indigo-600 text-sm hover:underline"
                        type="button"
                    >
                        Edit
                    </button>
                </div>
                <div className="mt-3 text-gray-700">
                    {data.location || "—"}
                </div>
            </div>

            {/* ─────── CARD: BIO & TITLE ─────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Bio & Title</h3>
                    <button
                        onClick={() => onEdit(2)}
                        className="text-indigo-600 text-sm hover:underline"
                        type="button"
                    >
                        Edit
                    </button>
                </div>
                <div className="mt-3 space-y-1 text-gray-700">
                    <p>
                        <span className="font-medium">Title:</span> {data.title || "—"}
                    </p>
                    <p>
                        <span className="font-medium">Bio:</span> {data.bio || "—"}
                    </p>
                </div>
            </div>

            {/* ─────── CARD: EDUCATION ─────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                    <button
                        onClick={() => onEdit(3)}
                        className="text-indigo-600 text-sm hover:underline"
                        type="button"
                    >
                        Edit
                    </button>
                </div>
                {Array.isArray(data.education) && data.education.length > 0 ? (
                    <div className="mt-3 space-y-2 text-gray-700">
                        {data.education.map((edu: any, idx: number) => (
                            <div key={idx} className="pl-4">
                                <p>
                                    <span className="font-medium">Degree:</span> {edu.degree || "—"}
                                </p>
                                <p>
                                    <span className="font-medium">University:</span> {edu.university || "—"}
                                </p>
                                <p>
                                    <span className="font-medium">Year:</span> {edu.year || "—"}
                                </p>
                                {idx < data.education.length - 1 && (
                                    <hr className="my-2 border-gray-200" />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-3 text-gray-700">—</p>
                )}
            </div>

            {/* ─────── CARD: WORK EXPERIENCE ─────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Work Experience (Optional)
                    </h3>
                    <button
                        onClick={() => onEdit(4)}
                        className="text-indigo-600 text-sm hover:underline"
                        type="button"
                    >
                        Edit
                    </button>
                </div>
                {Array.isArray(data.workExperience) && data.workExperience.length > 0 ? (
                    <div className="mt-3 space-y-2 text-gray-700">
                        {data.workExperience.map((exp: any, idx: number) => (
                            <div key={idx} className="pl-4">
                                <p>
                                    <span className="font-medium">Company:</span> {exp.company || "—"}
                                </p>
                                <p>
                                    <span className="font-medium">Position:</span> {exp.position || "—"}
                                </p>
                                <p>
                                    <span className="font-medium">Duration:</span> {exp.duration || "—"}
                                </p>
                                {idx < data.workExperience.length - 1 && (
                                    <hr className="my-2 border-gray-200" />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-3 text-gray-700">—</p>
                )}
            </div>

            {/* ─────── CARD: DOMAINS ─────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Interested Domains</h3>
                    <button
                        onClick={() => onEdit(5)}
                        className="text-indigo-600 text-sm hover:underline"
                        type="button"
                    >
                        Edit
                    </button>
                </div>
                {Array.isArray(data.domainsInterested) && data.domainsInterested.length > 0 ? (
                    <ul className="mt-3 list-disc list-inside text-gray-700">
                        {data.domainsInterested.map((domain: string, idx: number) => (
                            <li key={idx}>{domain}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-3 text-gray-700">—</p>
                )}
            </div>

            {/* ─────── CARD: SOCIAL LINKS ─────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Social Links</h3>
                    <button
                        onClick={() => onEdit(6)}
                        className="text-indigo-600 text-sm hover:underline"
                        type="button"
                    >
                        Edit
                    </button>
                </div>
                <div className="mt-3 space-y-2 text-gray-700">
                    <p>
                        <span className="font-medium">LinkedIn:</span>{" "}
                        {data.socialLinks?.linkedin || "—"}
                    </p>
                    <p>
                        <span className="font-medium">GitHub:</span> {data.socialLinks?.github || "—"}
                    </p>
                    <p>
                        <span className="font-medium">Portfolio:</span>{" "}
                        {data.socialLinks?.portfolio || "—"}
                    </p>
                </div>
            </div>

            {/* ─────── CARD: PROFILE PICTURE ─────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Profile Picture</h3>
                    <button
                        onClick={() => onEdit(7)}
                        className="text-indigo-600 text-sm hover:underline"
                        type="button"
                    >
                        Edit
                    </button>
                </div>
                <div className="mt-3">
                    {data.profilePicFile ? (
                        <p className="text-gray-700">{(data.profilePicFile as File).name}</p>
                    ) : (
                        <p className="text-gray-700">—</p>
                    )}
                </div>
            </div>

            {/* ─────── NAVIGATION BUTTONS ─────── */}
            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-200"
                    disabled={isSubmitting}
                    type="button"
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`py-2 px-4 rounded text-white ${isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    type="button"
                >
                    {isSubmitting ? "Submitting..." : "Submit Profile"}
                </button>
            </div>
        </div>
    );
}
