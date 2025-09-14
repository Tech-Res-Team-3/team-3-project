"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-red-500 p-2 relative'>
      <div className='text-white tracking-wide font-semibold flex justify-between items-center'>
        RAO Rentals
        <button
          className='text-white text-2xl md:hidden'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle menu'
        >
          {isOpen ? "x" : "☰"}
        </button>
        <div className='hidden md:flex gap-4'>
          <Link
            href={"#"}
            className='bg-white text-red-500 px-4 py-1 rounded-md font-semibold hover:bg-gray-100'
          >
            Login
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className='md:hidden absolute top-full left-0 w-full bg-red-500 z-50 flex flex-col items-center py-2 space-y-2 rounded-b-md shadow-lg'>
          <Link
            href={"/"}
            onClick={() => setIsOpen(!isOpen)}
            className='block w-11/12 text-center bg-white text-red-500 py-1 px-3 rounded-md font-semibold hover:bg-gray-100 cursor-pointer'
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
