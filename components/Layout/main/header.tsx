import React from "react";
import UserProfileComponent from "@/components/molecules/user-profile-component";
import { icons } from "@/public/assets/icons";
import Link from "next/link";
import { useCourseStore } from "@/store/useCourseStore";

function Header({ data }:any) {
  const cart = useCourseStore((state) => state.cart);


  // console.log(data?.getUserInfo, "data");

  return (
     <div className="h-[72px] flex items-center bg-green-50 px-8 justify-between w-full shadow-lg">
    {/* Left side - only visible on md and up */}
    <div className="hidden md:block">
      <h1 className="text-text font-semibold text-1xl">Dashboard</h1>
      <p className="text-dark-gray font-sm">Welcome Back, {data?.getUserInfo?.fullname}!</p>
    </div>

    {/* Right side - always visible */}
    <div className="flex gap-3 items-center ml-auto">
      <UserProfileComponent data={data}/>
      <button className="w-8 h-8 flex items-center justify-center">
        {icons.notification_bell}
      </button>
    </div>
  </div>

 );
}

export default Header;
