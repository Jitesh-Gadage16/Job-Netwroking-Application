"use client";

import { useAuth } from "@/context/AuthContext";
import RoleToggle from "@/components/RoleToggle";
import SeekerView from "@/components/SeekerView";
import ConnectorView from "@/components/ConnectorView";

export default function DashboardPage() {
    const { user } = useAuth();

    console.log("first render user:", user);

    if (!user) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-2">Loading...</h1>
                    <p className="text-gray-600 mb-6">Please wait while we load your dashboard.</p>
                </div>
            </div>
        );
    }
    if (!user.role) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-2">Role Not Set</h1>
                    <p className="text-gray-600 mb-6">Please set your role in your profile settings.</p>
                </div>
            </div>
        );
    }
    if (user.role !== "seeker" && user.role !== "connector") {
        return (
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-2">Invalid Role</h1>
                    <p className="text-gray-600 mb-6">Your role is not recognized. Please contact support.</p>
                </div>
            </div>
        );
    }
    if (user.role === "admin") {
        return (
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600 mb-6">You have admin access. Please navigate to the admin panel for more options.</p>
                </div>
            </div>
        );
    }

    return (


        <>

            <div className="max-w-6xl mx-auto p-4">
                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-3">Welcome to Connection Currency</h1>
                    <p className="text-gray-600 mb-4">
                        The platform that rewards meaningful connections. Whether you&#39;re seeking opportunities or helping others connect,
                        we make networking valuable for everyone involved.
                    </p>


                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-2  ">




                {/* <div className="bg-white shadow-xl rounded-lg p-6 mb-6">
                <h1 className="text-2xl font-bold mb-2">Welcome to Connection Currency</h1>
                <p className="text-gray-600 mb-6">
                    The platform that rewards meaningful connections. Whether you’re seeking opportunities or helping others connect, we make networking valuable for everyone.
                </p>

                <RoleToggle />
            </div> */}


                {user.role === "seeker" ? <SeekerView /> : <ConnectorView />}
            </div>
        </>
    );
}
