import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-2">
      <div className="mt-20 max-w-md w-full p-6 text-center border-2 rounded-2xl bg-red-500 text-white shadow-lg">
        <h1 className="text-3xl font-bond mb-4">Welcome to RAO Rentals</h1>
        <p className="text-lg mb-6">
          Please sign in to access the admin portal to manage your vehicle
          rentals, bookings, and clients.
        </p>

        <Link href={"/login"}>
          <button className="bg-white text-red-500 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer">
            Login
          </button>
        </Link>

        <p className="mt-4 text-sm text-white/80">
          © 2025 RAO Rentals. All rights reserved.
        </p>
      </div>
    </div>
  );
}
