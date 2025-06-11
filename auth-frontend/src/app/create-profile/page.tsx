// app/create-profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import StepBasicInfo from "./steps/StepBasicInfo";
import StepLocation from "./steps/StepLocationPicker";
import StepBioAndTitle from "./steps/StepBioAndTitle";
import StepEducation from "./steps/StepEducation";
import StepWorkExperience from "./steps/StepWorkExperience";
import StepDomains from "./steps/StepDomains";
import StepSocialLinks from "./steps/StepSocialLinks";
import StepProfilePicture from "./steps/StepProfilePicture";
import StepReviewAndSubmit from "./steps/StepReviewAndSubmit";
import api from "@/lib/axios";

export default function CreateProfilePage() {
    // 0: Basic Info
    // 1: Location
    // 2: Bio & Title
    // 3: Education
    // 4: Work Experience
    // 5: Domains
    // 6: Social Links
    // 7: Profile Picture
    // 8: Review & Submit
    const [step, setStep] = useState(0);

    const [data, setData] = useState<any>({
        // Step 0 fields:
        firstName: "",
        lastName: "",
        gender: "",
        // Step 1:
        city: "",
        state: "",
        // Step 2:
        bio: "",
        title: "",
        // Step 3:
        education: [{ degree: "", university: "", year: "" }],
        // Step 4:
        workExperience: [{ company: "", role: "", years: "" }], // array of { company, role, years }
        // Step 5:
        domains: [], // array of strings / selected domains
        // Step 6:
        socialLinks: {
            linkedin: "",
            github: "",
            portfolio: "",
        },
        // Step 7:
        profilePicFile: null, // will hold a File
        // Step 8: no new fields—review step
    });

    // track whether we’re editing an existing profile
    const [isEdit, setIsEdit] = useState(false);

    // on mount, try to fetch existing profile and pre‐fill
    useEffect(() => {
        api
            .get<{ profile: any }>("/profile/me")
            .then(({ data: res }) => {
                if (res.profile) {
                    // merge the fetched profile into your stepwise data
                    setData((prev) => ({ ...prev, ...res.profile }));
                    setIsEdit(true);
                }
            })
            .catch(() => {
                /* no profile yet → still in create mode */
            });
    }, []);

    // Advance to next step
    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    // Jump to a specific step (for “Edit” buttons in review)
    const handleEdit = (targetStep: number) => setStep(targetStep);

    // Merge new data for a given step
    const handleDataChange = (newValues: any) => {
        setData((prev: any) => ({ ...prev, ...newValues }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {step === 0 && (
                <StepBasicInfo
                    data={data}
                    onDataChange={handleDataChange}
                    onNext={handleNext}
                />
            )}
            {step === 1 && (
                <StepLocation
                    data={data}
                    onDataChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            )}
            {step === 2 && (
                <StepBioAndTitle
                    data={data}
                    onDataChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            )}
            {step === 3 && (
                <StepEducation
                    data={data}
                    onDataChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            )}
            {step === 4 && (
                <StepWorkExperience
                    data={data}
                    onDataChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            )}
            {step === 5 && (
                <StepDomains
                    data={data}
                    onDataChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            )}
            {step === 6 && (
                <StepSocialLinks
                    data={data}
                    onDataChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            )}
            {step === 7 && (
                <StepProfilePicture
                    data={data}
                    onDataChange={handleDataChange}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            )}
            {step === 8 && (
                <StepReviewAndSubmit
                    data={data}
                    isEdit={isEdit}
                    onBack={handleBack}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );
}
