"use client";
import Image from "next/image";
import { Mail, Phone, Briefcase, MapPin } from "lucide-react";
import React from "react";
import Sub_Logo from "@/public/assets/Logo/logo1.png";

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
        <h2 className="text-xl font-semibold text-gray-800">{selected?.name}</h2>
        <p className="text-gray-500 text-sm mb-6">{selected?.email}</p>

        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700">{selected?.phoneNumber}</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700">{selected?.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-gray-400" />
            <span className="text-gray-700">{selected?.subject}</span>
          </div>
          <hr />
          <div className=" items-center gap-6">
            <span className="text-gray-700 font-bold">Message:</span>
            <p className="text-gray-700 pt-4">{selected?.message}</p>
          </div>


        </div>
      </div>
    </div>
  );
}
