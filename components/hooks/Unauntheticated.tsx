"use client";
import Link from "next/link";

export default function Unauthenticated() {
  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      {/* Illustration */}
      <div className="relative w-full max-w-md mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          className="w-full h-auto"
        >
          <circle cx="250" cy="250" r="200" fill="#D1FAE5" />
          <rect
            x="150"
            y="180"
            width="200"
            height="160"
            rx="20"
            fill="#387467"
          />
          <circle cx="250" cy="210" r="20" fill="white" />
          <rect x="240" y="210" width="20" height="70" rx="5" fill="white" />
          <text
            x="250"
            y="330"
            textAnchor="middle"
            fontSize="40"
            fill="white"
            fontWeight="bold"
          >
            403
          </text>
        </svg>
      </div>

      {/* Text */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Authenticating - please wait
      </h1>
      <p className="text-sm text-gray-600 max-w-lg text-center mb-8">
        We’re verifying your credentials and setting up a secure session.
        This process may take a few seconds. Please do not close or refresh this page while we complete your
        authentication.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          href="/auth/signin"
          className="px-8 py-3 rounded-lg bg-[#387467] text-white font-semibold shadow-md hover:bg-[#2e5e55] transition"
        >
          Go Back Home
        </Link>

      </div>
    </div>
  );
}
