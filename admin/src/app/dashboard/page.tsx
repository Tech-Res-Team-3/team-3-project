"use client";

import { useState, useEffect } from "react";

interface AdminUser {
  uid: string;
  firstName: string;
  lastName: string;
}

export default function DashboardPage() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      setAdminUser(JSON.parse(storedUser));
    }
  }, []);

  if (!adminUser) {
    return <p>Loading admin info...</p>;
  }

  return (
    <div className="p-4 flex flex-col gap-2">
      <p className="font-semibold text-2xl">
        Welcome <span className="text-red-500">{`${adminUser.firstName}`}</span>
      </p>
    </div>
  );
}
