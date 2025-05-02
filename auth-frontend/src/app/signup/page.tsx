// "use client";

// import { useState } from "react";
// import axios from "@/lib/axios";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function Signup() {
//     const router = useRouter();
//     const [form, setForm] = useState({ name: "", email: "", password: "", role: "seeker" });
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await axios.post("/auth/signup", form);
//             localStorage.setItem("email", form.email); // ✅ Store email before redirect
//             router.push("/verify");
//         } catch (error: any) {
//             const message = error.response?.data?.message || "Something went wrong!";
//             alert(message);
//         }
//     };


//     return (
//         <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
//             <h2 className="text-2xl font-bold">Signup</h2>
//             <input type="text" placeholder="Name" className="input" onChange={e => setForm({ ...form, name: e.target.value })} required />
//             <input type="email" placeholder="Email" className="input" onChange={e => setForm({ ...form, email: e.target.value })} required />
//             <input type="password" placeholder="Password" className="input" onChange={e => setForm({ ...form, password: e.target.value })} required />
//             <select className="input" onChange={e => setForm({ ...form, role: e.target.value })}>
//                 <option value="seeker">Seeker</option>
//                 <option value="connector">Connector</option>
//             </select>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
//         </form>
//     );
// }

"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // Importing react-hot-toast
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google"; // Importing GoogleOAuthProvider

export default function Signup() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "seeker" });

    // Handle form submission for manual signup
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Send signup data to backend to create the user
            await axios.post("/auth/signup", form);
            localStorage.setItem("email", form.email); // Store email before redirect
            toast.success("Signup successful! Please verify your email.");
            router.push("/verify");
        } catch (error: any) {
            const message = error.response?.data?.message || "Something went wrong!";
            toast.error(message);
        }
    };

    // Handle Google login (signup flow)
    // const handleGoogleSignIn = async (response: CredentialResponse) => {
    //     try {
    //         const { credential } = response; // Google credential
    //         // Send the credential to the backend to authenticate or create the user
    //         const res = await axios.post('/auth/google', { credential });

    //         toast.success("Successfully signed up with Google!");
    //         // Redirect to profile or dashboard
    //         window.location.href = "/profile"; // Or use next.js routing
    //     } catch (error) {
    //         toast.error("Google sign-in failed!");
    //     }
    // };

    const handleGoogleSignIn = () => {
        console.log("==>")
        const googleOAuthUrl = "http://localhost:8000/auth/google"; // Your Google OAuth URL
        window.open(googleOAuthUrl, "_blank"); // Open in a new tab instead of a window
    };


    return (
        // Wrap the component inside GoogleOAuthProvider and pass the clientId
        // <GoogleOAuthProvider clientId="548740690615-6jm5ctm0ra1j3tel27etm3bh8idrc66n.apps.googleusercontent.com">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold">Signup</h2>

            <input
                type="text"
                placeholder="Name"
                className="input"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Email"
                className="input"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="input"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
            />
            <select
                className="input"
                onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
                <option value="seeker">Seeker</option>
                <option value="connector">Connector</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Sign Up
            </button>

            {/* Google Signup Button */}
            <div className="mt-4">
                <GoogleLogin
                    onSuccess={handleGoogleSignIn}
                    onError={() => toast.error("Google login failed!")}

                />
            </div>
        </form>
        // </GoogleOAuthProvider>
    );
}
