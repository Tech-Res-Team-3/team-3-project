"use client";
import { useState, useEffect } from "react";
import { logout, subscribeToAuthState } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<unknown>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    type Unsubscribe = () => void;
    let unsubscribeFn: Unsubscribe | null = null;

    const init = async () => {
      unsubscribeFn = await subscribeToAuthState((u) => setUser(u));
    };

    init();

    return () => {
      if (unsubscribeFn) {
        unsubscribeFn();
      }
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="bg-red-500 p-2 md:p-4 relative">
      <div className="flex justify-between items-center">
        <p className="font-semibold tracking-wide text-white md:text-xl">
          RAO Rentals
        </p>
        <div className="hidden md:flex gap-4">
          {user ? (
            <button
              className="bg-white text-red-500 px-4 py-1 rounded-md font-semibold hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              href={"/login"}
              className="bg-white text-red-500 px-4 py-1 rounded-md font-semibold hover:bg-gray-100 cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>

        <button
          className="md:hidden bg-white text-red-500 px-3 py-1 rounded-md font-semibold hover:bg-gray-100 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "x" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2">
          {user ? (
            <button
              className="bg-white text-red-500 px-3 py-1 rounded-md font-semibold hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              href={"/login"}
              className="bg-white text-red-500 px-3 py-1 rounded-md font-semibold hover:bg-gray-100 cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
