"use client";
import Image from "next/image";
import { Mail, Phone, Briefcase, MapPin, User } from "lucide-react";
import React from "react";
import Sub_Logo from "@/public/assets/Logo/logo1.png";


const NairaIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 20V4h3l6 16h3V4" />
    <path d="M6 8h12M6 16h12" />
  </svg>
);


export default function DetailsCard({selected}) {

  return (
    <div className=" mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header with gradient and avatar */}

      <div className="relative bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 p-6">

      </div>
      <div className=" ">
        <Image
          width={70}
          height={70}
          className="rounded-full"
          src={Sub_Logo}
          alt="logo"
          draggable={false}
        />
      </div>
      {/* Info Section */}
      <div className=" px-6 pb-6">
        <h2 className="text-xl font-semibold text-gray-800">{selected?.course?.name}</h2>
        <h2 className="text-xl font-semibold text-gray-800">{selected?.user?.name}</h2>

        <div className="space-y-4 text-sm pt-6">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700">{selected?.user?.fullname}</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700">{selected?.user?.email}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-6">{selected?.email}</p>

        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-gray-700 text-2xl">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 0 // no .00 unless you want it
                }).format(Number(selected?.course?.price))}
        </span>
          </div>

          <hr />
          <div className=" items-center gap-6">
            <span className="text-gray-700 font-bold">Course Description:</span>
            <p className="text-gray-700 pt-4">{selected?.course?.description}</p>
          </div>


        </div>
      </div>
    </div>
  );
}
