import React from "react";
import UserProfileComponent from "@/components/molecules/user-profile-component";
import { icons } from "@/public/assets/icons";
import Link from "next/link";
import { useCourseStore } from "@/store/useCourseStore";

function Header({ data }:any) {
  const cart = useCourseStore((state) => state.cart);


  // console.log(data?.getUserInfo, "data");

  return (
     <div className="h-[82px] flex items-center bg-green-50 px-8 justify-between w-full shadow-lg">
    {/* Left side - only visible on md and up */}
    <div className="hidden md:block">
      <h1 className="text-text font-semibold text-2xl">Dashboard</h1>
      <p className="text-dark-gray font-normal">Welcome Back, {data?.getUserInfo?.fullname}!</p>
    </div>

    {/* Right side - always visible */}
    <div className="flex gap-3 items-center ml-auto">
      <UserProfileComponent data={data}/>

      {/*<Link href="/overview/cart">*/}
      {/*  <button className="w-6 h-6 flex items-center justify-center">*/}
      {/*    {icons.cart_icon}*/}
      {/*  </button>*/}
      {/*</Link>*/}

      <Link href="/overview/cart" className="relative">
        <button className="w-6 h-6 flex items-center justify-center relative">
          {icons.cart_icon}
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cart.length}
          </span>
          )}
        </button>
      </Link>

      <button className="w-8 h-8 flex items-center justify-center">
        {icons.notification_bell}
      </button>
    </div>
  </div>

 );
}

export default Header;
