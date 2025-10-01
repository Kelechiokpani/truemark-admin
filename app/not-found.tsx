"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6">
      {/* Illustration */}
      <div className="relative w-full max-w-md mb-8 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          className="w-full h-auto"
        >
          <circle cx="250" cy="250" r="200" fill="#E0E7FF" />
          {/*<circle cx="250" cy="250" r="200" fill="#fefefe"  className="shadow-lg"/>*/}
          <path
            d="M180 300 L150 350 Q250 380 350 350 L320 300 Q250 320 180 300Z"
            fill="#387467"
          />
          <circle cx="200" cy="220" r="25" fill="#387467" />
          <circle cx="300" cy="220" r="25" fill="#387467" />
          <circle cx="200" cy="220" r="12" fill="white" />
          <circle cx="300" cy="220" r="12" fill="white" />
          <text
            x="250"
            y="270"
            textAnchor="middle"
            fontSize="40"
            fill="#387467"
            fontWeight="bold"
          >
            404
          </text>
        </svg>
      </div>

      {/* Text */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Oops! Page not found
      </h1>
      <p className="text-sm text-gray-600 max-w-lg text-center mb-8">
        Sorry, we can’t seem to find the page you’re looking for.
        It might have been removed, renamed, or simply never existed.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="px-8 py-3 rounded-lg bg-[#387467] text-white font-semibold shadow-md hover:bg-[#387467] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
