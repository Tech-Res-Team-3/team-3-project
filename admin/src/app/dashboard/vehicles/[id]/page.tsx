"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/firebase/auth";

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  verified: boolean;
  licensePlate: string;
  rating: number;
  hasSeatbelts: boolean;
  seatbeltType: "SHOULDER" | "LAP" | "BOTH";
  condition: "EXCELLENT" | "GOOD" | "FAIR" | "NOT_WORKING";
  bodyStyle: string;
  vin: string;
  value: number;
  mileage: number;
  transmission: "AUTOMATIC" | "MANUAL";
  salesTaxPaid: boolean;
  hasSalvageTitle: boolean;
  extraInfo: string;
}

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const authUser = await getCurrentUser();
        if (!authUser) {
          setError("Unauthorized. Please Log in.");
          return;
        }

        const idToken = await authUser.getIdToken();

        const res = await fetch(`http://localhost:3333/admin/vehicles/${id}`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch vehicle details");

        const data: Vehicle = await res.json();
        setVehicle(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(`Unknown error: ${err}`);
        }
      }
    };

    fetchVehicle();
  }, [id]);

  const handleVerifyVehicle = async () => {
    if (!vehicle) return;
    try {
      setUpdating(true);
      const authUser = await getCurrentUser();
      if (!authUser) {
        throw new Error("Unauthorized. Please log in.");
        return;
      }

      const idtoken = await authUser.getIdToken();
      const res = await fetch(
        `http://localhost:3333/admin/approve-vehicle/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idtoken}`,
          },
          body: JSON.stringify({ verified: true }),
        }
      );

      if (!res.ok) throw new Error("Failed to verify vehicle");

      setVehicle({ ...vehicle, verified: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Someing went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading vehicle details...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!vehicle) return <p>Vehicle not found.</p>;

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
          {vehicle.make} {vehicle.model} ({vehicle.year})
        </h1>
        <div className="space-y-2">
          <p>
            <strong className="font-semibold">ID:</strong> {vehicle.id}
          </p>
          <p>
            <strong className="font-semibold">Verified:</strong>{" "}
            {vehicle.verified ? "Yes" : "No"}
            {!vehicle.verified && (
              <button
                onClick={handleVerifyVehicle}
                disabled={updating}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer ml-4"
              >
                {updating ? "Verifying..." : "Verify"}
              </button>
            )}
          </p>
          <p>
            <strong className="font-semibold">License Plate:</strong>{" "}
            {vehicle.licensePlate}
          </p>
          <p>
            <strong className="font-semibold">VIN:</strong> {vehicle.vin}
          </p>
          <p>
            <strong className="font-semibold">Condition:</strong>{" "}
            {vehicle.condition}
          </p>
          <p>
            <strong className="font-semibold">Mileage:</strong>{" "}
            {vehicle.mileage}
          </p>
          <p>
            <strong className="font-semibold">Transmission:</strong>{" "}
            {vehicle.transmission}
          </p>
          <p>
            <strong className="font-semibold">Salvage Title:</strong>{" "}
            {vehicle.hasSalvageTitle ? "Yes" : "No"}
          </p>
          <p>
            <strong className="font-semibold">Sales Tax Paid:</strong>{" "}
            {vehicle.salesTaxPaid ? "Yes" : "No"}
          </p>
          {vehicle.extraInfo && (
            <p>
              <strong className="font-semibold">Extra Info:</strong>{" "}
              {vehicle.extraInfo}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
