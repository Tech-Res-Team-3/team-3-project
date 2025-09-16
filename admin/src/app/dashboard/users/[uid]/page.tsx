"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/firebase/auth";

interface UserDetails {
  firebaseUid: string;
  firstName: string;
  lastName: string;
  role: "GUEST" | "HOST" | "ADMIN";
  email: string;
  phone: string;
}

export default function UserDetailsPage() {
  const { uid } = useParams();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const authUser = await getCurrentUser();
        if (!authUser) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }

        const idToken = await authUser.getIdToken();

        const res = await fetch(`http://localhost:3333/admin/users/${uid}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user details");
        const data: UserDetails = await res.json();
        setUser(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "An error occurred");
        } else {
          setError(`Unknown error fetching user: ${err}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  if (loading) return <p className="p-4">Loading user details...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!user) return <p className="p-4">User not found.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 max-w-2xl w-full bg-white shadow rounded-lg text-center">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold mb-4">
          {user.firstName} {user.lastName}
        </h1>
        <div className="space-y-2">
          <p>
            <strong className="font-semibold">UID:</strong> {user.firebaseUid}
          </p>
          <p>
            <strong className="font-semibold">Role:</strong> {user.role}
          </p>
          <p>
            <strong className="font-semibold">Email:</strong> {user.email}
          </p>
          <p>
            <strong className="font-semibold">Phone:</strong>{" "}
            {user.phone ? user.phone : "No phone number on file"}
          </p>
        </div>
      </div>
    </div>
  );
}
