"use client";

import { getCurrentUser } from "@/lib/firebase/auth";
import { useState, useEffect } from "react";

interface AdminUser {
  firebaseUid: string;
  firstName: string;
  lastName: string;
}

interface UserOrHost {
  firebaseUid: string;
  firstName: string;
  lastName: string;
  role: "GUEST" | "HOST";
}

interface VehicleType {
  id: number;
  make: string;
  model: string;
  year: number;
  verified: boolean;
}

export default function DashboardPage() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [users, setUsers] = useState<UserOrHost[]>([]);
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [loading, setLoading] = useState(false);
  const [userFilter, setUserFilter] = useState<
    "ALL" | "GUEST" | "HOST" | "ADMIN"
  >("ALL");
  const [vehicleFilter, setVehicleFilter] = useState<{
    make: string;
    model: string;
  }>({
    make: "",
    model: "",
  });
  const [selectedTab, setSelectedTab] = useState<"USERS" | "VEHICLES">("USERS");

  useEffect(() => {
    const stored = localStorage.getItem("adminUser");
    if (stored) {
      setAdminUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const user = await getCurrentUser();
      if (!user) return;

      try {
        const idToken = await user.getIdToken();

        if (selectedTab === "USERS") {
          const query = userFilter !== "ALL" ? `?role=${userFilter}` : "";
          const res = await fetch(`http://localhost:3333/admin/users${query}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (!res.ok) throw new Error("Failed to fetch users");

          const data: UserOrHost[] = await res.json();
          setUsers(data);
        }

        if (selectedTab === "VEHICLES") {
          let query = "?";
          if (vehicleFilter.make) query += `make=${vehicleFilter.make}&`;
          if (vehicleFilter.model) query += `model=${vehicleFilter.model}&`;

          query = query.endsWith("&") ? query.slice(0, -1) : query;
          if (query === "?") query = "";

          const res = await fetch(
            `http://localhost:3333/admin/vehicles${query}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
              },
            }
          );

          if (!res.ok) throw new Error("Failed to fetch vehicles");
          const data: VehicleType[] = await res.json();
          setVehicles(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [selectedTab, userFilter, vehicleFilter]);

  const handlViewUser = (user: UserOrHost) => {
    alert(`Viewing ${user.firstName} ${user.lastName}`);
  };

  const handleViewVehicle = (vehicle: VehicleType) => {
    alert(`Viewing ${vehicle.make} ${vehicle.model}`);
  };

  if (!adminUser) {
    return <p>Loading admin info...</p>;
  }

  return (
    <div className="p-4 flex flex-col gap-2">
      {adminUser && (
        <p className="font-semibold text-2xl">
          Welcome{" "}
          <span className="text-red-500">{`${adminUser.firstName} ${adminUser.lastName}`}</span>
        </p>
      )}

      <div className="border rounded-lg shadow-md p-4 mt-20">
        <div className="flex items-center gap-4 border-b mb-4">
          <button
            className={`px-4 py-2 rounded-t-md cursor-pointer ${
              selectedTab === "USERS"
                ? "bg-red-500 text-white border-t border-1 border-r"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedTab("USERS")}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 rounded-t-md cursor-pointer ${
              selectedTab === "VEHICLES"
                ? "bg-red-500 text-white border-t border-1 border-r"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedTab("VEHICLES")}
          >
            Vehicles
          </button>
        </div>

        {selectedTab === "USERS" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <select
                id="roleFilter"
                value={userFilter}
                onChange={(e) =>
                  setUserFilter(
                    e.target.value as "ALL" | "GUEST" | "HOST" | "ADMIN"
                  )
                }
                className="border rounded-md p-1 cursor-pointer"
              >
                <option value="ALL">All Users</option>
                <option value="GUEST">Guests</option>
                <option value="HOST">Hosts</option>
                <option value="ADMIN">Admins</option>
              </select>
            </div>

            {loading ? (
              <p>Loading users...</p>
            ) : users.length === 0 ? (
              <p>No users found</p>
            ) : (
              <div className="max-h-150 overflow-y-auto border rounded-md">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-2">UID</th>
                      <th className="p-2">First Name</th>
                      <th className="p-2">Last Name</th>
                      <th className="p-2">Role</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.firebaseUid}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-2">{user.firebaseUid}</td>
                        <td className="p-2">{user.firstName}</td>
                        <td className="p-2">{user.lastName}</td>
                        <td className="p-2 capitalize">{user.role}</td>
                        <td className="p-2">
                          <button
                            onClick={() => handlViewUser(user)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {selectedTab === "VEHICLES" && (
          <>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Make"
                value={vehicleFilter.make}
                onChange={(e) =>
                  setVehicleFilter((prev) => ({
                    ...prev,
                    make: e.target.value,
                  }))
                }
                className="border rounded-md p-1"
              />
              <input
                type="text"
                placeholder="Model"
                value={vehicleFilter.model}
                onChange={(e) =>
                  setVehicleFilter((prev) => ({
                    ...prev,
                    model: e.target.value,
                  }))
                }
                className="border rounded-md p-1"
              />
            </div>

            {loading ? (
              <p>Loading vehicles...</p>
            ) : users.length === 0 ? (
              <p>No users found</p>
            ) : (
              <div className="max-h-150 overflow-y-auto border rounded-md">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-2">ID</th>
                      <th className="p-2">Make</th>
                      <th className="p-2">Model</th>
                      <th className="p-2">Year</th>
                      <th className="p-2">Verified</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle) => (
                      <tr
                        key={vehicle.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-2">{vehicle.id}</td>
                        <td className="p-2">{vehicle.make}</td>
                        <td className="p-2">{vehicle.model}</td>
                        <td className="p-2">{vehicle.year}</td>
                        <td className="p-2">
                          {vehicle.verified ? "Yes" : "No"}
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => handleViewVehicle(vehicle)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
