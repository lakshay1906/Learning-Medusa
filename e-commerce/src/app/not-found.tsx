"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
          404
        </h1>
        <p className="mt-4 text-2xl font-semibold text-gray-300">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-lg text-gray-400">
          It might have been moved or deleted.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-lg text-lg font-medium shadow-lg transform hover:scale-105 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
