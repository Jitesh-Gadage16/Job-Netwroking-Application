// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useState } from "react";

// export default function Login() {
//     const { login } = useAuth();
//     const [form, setForm] = useState({ email: "", password: "" });

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         await login(form);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
//             <h2 className="text-2xl font-bold">Login</h2>
//             <input type="email" placeholder="Email" className="input" onChange={e => setForm({ ...form, email: e.target.value })} required />
//             <input type="password" placeholder="Password" className="input" onChange={e => setForm({ ...form, password: e.target.value })} required />
//             <button className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
//         </form>
//     );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("==>>>")
            const res = await axios.post("/auth/login", form);
            console.log("res", res);
            const { token, user } = res.data;

            login(user, token); // Save to context
            toast.success("Login successful!");

            // Delay navigation just a tick to allow context update
            setTimeout(() => {
                router.push("/create-profile");
            }, 100);
        } catch (error: any) {
            const message = error.response?.data?.message || "Login failed!";
            toast.error(message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold">Login</h2>
            <input type="email" placeholder="Email" className="input" onChange={e => setForm({ ...form, email: e.target.value })} required />
            <input type="password" placeholder="Password" className="input" onChange={e => setForm({ ...form, password: e.target.value })} required />
            <button className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
        </form>
    );
}
