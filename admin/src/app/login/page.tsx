"use client";

import { useState } from "react";
import { getCurrentUser, login } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

console.log("login:", login);
console.log("getCurrentUser:", getCurrentUser);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      const user = await getCurrentUser();
      if (!user) throw new Error("User not found");

      const idToken = await user.getIdToken();

      const res = await fetch("http://localhost:3333/users/admin-sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ forAdminPortal: true }),
      });

      const data = await res.json();

      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          uid: user.uid,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
        })
      );

      if (!res.ok) throw new Error("Not authorized for admin portal!");

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-2">
      <div className="max-w-md w-full p-6 border-2 border-red-500 rounded-2xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <p className="mb-6">Sign in to access the admin portal.</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <button
            className={`bg-red-500 text-white py-1 rounded-md hover:bg-red-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
