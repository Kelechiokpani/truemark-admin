import { icons, sideIcons } from "@/public/assets/icons";
import { ChevronDown } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";
import Logo from "@/public/assets/Logo/logo1.png"



function UserProfileComponent({data}:any) {
  const profileLinks = [
    {
      label: "My profile",
      link: "#",
      icon: icons.user,
    },
    {
      label: "settings",
      link: "#",
      icon: sideIcons.settings,
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-4">
        {/* Avatar */}
        <div className="shrink-0 rounded-full h-10 w-10 relative">
          <Image
            alt="user avatar"
            sizes="100%"
            src={Logo}
            width={400} height={400}
            draggable={false}
            className="rounded-full object-cover"
          />
        </div>

        {/* User info (hidden on mobile, visible from md and up) */}
        <div className="hidden md:flex flex-col justify-center">
          <p className="capitalize text-text text-sm font-medium flex gap-3 items-center">
            {data?.getUserInfo?.fullname} <ChevronDown className="text-base text-dark-gray w-4" />
          </p>
          <p className="text-dark-gray text-xs font-normal">
            {data?.getUserInfo?.email}
          </p>
        </div>
      </DropdownMenuTrigger>

      {/*<DropdownMenuContent*/}
      {/*  align="end"*/}
      {/*  className="px-4 py-5 border-none w-[308px] rounded-xl space-y-4 mt-3 ml-9"*/}
      {/*>*/}
      {/*  <div className="flex gap-4 items-center">*/}
      {/*    <div className="shrink-0 rounded-full h-[40px] w-[40px] relative">*/}
      {/*      <Image*/}
      {/*        alt="user avatar"*/}
      {/*        width={400} height={400}*/}
      {/*        src={Logo}*/}
      {/*        draggable={false}*/}
      {/*        className="rounded-full"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="flex flex-col justify-center">*/}
      {/*      <p className="capitalize  text-sm font-normal flex gap-3 items-center">*/}
      {/*        john doe*/}
      {/*      </p>*/}
      {/*      <p className="text-dark-gray text-xs font-normal">*/}
      {/*        johndoe@gmail.com*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  /!*<Separator />*!/*/}

      {/*  <div className="flex flex-col gap-1">*/}
      {/*    {profileLinks.map((link, index) => (*/}
      {/*        <Link*/}
      {/*            key={index}*/}
      {/*            href={link.link}*/}
      {/*            className="flex gap-2.5 capitalize py-2 px-2 rounded-md hover:bg-green-50"*/}
      {/*        >*/}
      {/*        <span className="w-5 h-5 flex">*/}
      {/*          {link.icon}*/}
      {/*        </span>*/}
      {/*          <span className="text-sm">*/}
      {/*              {link.label}*/}
      {/*          </span>*/}

      {/*        </Link>*/}
      {/*      ))}*/}
      {/*    <button className="flex  gap-2.5 capitalize py-2 px-2 rounded-md hover:bg-secondary">*/}
      {/*      <span className="w-5 h-5 flex ">*/}
      {/*        {" "}*/}
      {/*        {sideIcons.logout}*/}
      {/*      </span>*/}
      {/*      <span className="text-sm">*/}
      {/*               log out*/}
      {/*      </span>*/}

      {/*    </button>*/}
      {/*  </div>*/}
      {/*</DropdownMenuContent>*/}
    </DropdownMenu>
  );
}

export default UserProfileComponent;
