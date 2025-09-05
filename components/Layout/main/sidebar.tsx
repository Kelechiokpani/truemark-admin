"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {mainGeneral, mainSideBar} from "@/lib/json";
import { icons, sideIcons } from "@/public/assets/icons";
import ButtonComponent from "@/components/molecules/button-component";
import { Logo, PrimaryLogo, SecondaryLogo } from "@/components/molecules/logo";
import { useUserStore } from "@/store/useUserStore";



function SideBar() {
  const router = useRouter();
  const { logout } = useUserStore()
  const [isOpen, setIsOpen] = useState(true);
  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };
  const handleMouseOut = () => {
    setHoveredIndex(null);
  };

  const pathname = usePathname();

  const isRouteActive = (menuLink: string) => {
    // For overview, we want exact match only
    if (menuLink === "/overview") {
      return pathname === menuLink;
    }
    // For other routes, match exact or child routes
    return pathname === menuLink || pathname.startsWith(`${menuLink}/`);
  };

  const handleRoute = () => {
    try {
      logout();
      router.push("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (

    <div
      className={cn(
        " bg-white w-[290px] duration-150 flex flex-col shadow-lg",
        isOpen ? null : "w-[115px]"
      )}
    >
      <div className="flex items-center h-[95px] relative px-6 shrink-0">
        {isOpen ?
          <Link href="/">
            <PrimaryLogo />
          </Link>:
          <Link href="/">
            <Logo />
          </Link>
           }
        <button
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -right-3 bg-[#387467] w-8 h-8 flex justify-center items-center rounded-full z-30 duration-150",
            isOpen ? null : "rotate-180"
          )}
          onClick={toggleSideBar}
        >
          {icons.chevrons_left}
        </button>
      </div>
      <div
        className={cn(
          "gap-1 flex flex-col overflow-auto flex-grow px-4 ",
          isOpen ? null : "items-center"
        )}
      >
        <p
          className={cn(
            "text-normal font-bold text-sm text-dark-gray uppercase px-4",
            isOpen ? null : "px-0 text-center"
          )}
        >
          Menu
        </p>


        {mainSideBar.map((menu, index) => {
            const active = isRouteActive(menu.link);
            return (
              <Link
                key={index}
                className={cn(
                  " hover:text-900 group text-text text-sm font-medium rounded-lg py-3 px-4 flex gap-4 items-center capitalize duration-150",
                  // menu.link === pathname ? "bg-[#FEC28B]" : null,
                  // active ? "bg-[#04BA99] text-white" : null,
                  active ? "bg-[#387467] text-white " : "hover:bg-green-50",
                  isOpen ? null : "hover:bg-transparent !bg-transparent"
                )}
                href={menu.link}
                onMouseOver={() => handleHover(index)}
                onMouseOut={handleMouseOut}
              >
            <span
              className={cn(
                "shrink-0 w-8 h-8 rounded-lg border group-hover:bg-[#04BA99] group-hover:border-none duration-150 flex items-center justify-center",
                // menu.link === pathname ? "bg-[#04BA99] border-none" : null
                active ? "bg-[#04BA99] border-none" : null
              )}
            >
              {/*{hoveredIndex === index || menu.link === pathname*/}
              {/*    ? menu.active_icon*/}
              {/*    : menu.icon}*/}
              {hoveredIndex === index || active
                ? menu.active_icon
                : menu.icon}

            </span>
                {isOpen ? <span>{menu.label}</span> : null}
              </Link>
            );
          }
        )}

        <p
          className={cn(
            "text-normal text-sm font-bold text-dark-gray uppercase px-4 mt-5",
            isOpen ? null : "px-0 text-center"
          )}
        >
          general
        </p>
        {mainGeneral.map((menu, index) => (
          <Link
            key={index}
            className={cn(
              "hover:bg-green-50 group text-text text-sm font-medium rounded-lg py-3 px-4 flex gap-4 items-center capitalize duration-150",
              menu.link === pathname ? "bg-[#04BA99]" : null,
              isOpen ? null : "hover:bg-transparent !bg-transparent"
            )}
            href={menu.link}
            onMouseOver={() => handleHover(index)}
            onMouseOut={handleMouseOut}
          >
            <span
              className={cn(
                "shrink-0 w-8 h-8 rounded-lg border group-hover:bg-[#04BA99] group-hover:border-none duration-150 flex items-center justify-center",
                menu.link === pathname ? "bg-[#04BA99] border-none" : null
              )}
            >
              {hoveredIndex === index || menu.link === pathname
                ? menu.active_icon
                : menu.icon}
            </span>
            {isOpen ? <span>{menu.label}</span> : null}
          </Link>
        ))}

        <button onClick={handleRoute}
          className={cn(
            "hover:bg-secondary  text-text text-sm font-medium rounded-lg py-3 px-4 flex gap-4 items-center capitalize duration-150"
          )}
        >
          <span
            className={cn(
              "shrink-0 w-8 h-8 rounded-lg border  duration-150 flex items-center justify-center"
            )}
          >
            {sideIcons.logout}
          </span>
          {isOpen ? <span>Logout</span> : null}
        </button>

        {isOpen ? (
          <div
            className="mt-auto mx-auto w-[192px] text-white shadow-2xl border rounded-[20px] py-7 px-[23px] my-6 bg-[#04BA99] bg-[url('/assets/images/Ellipse 128.svg'),url('/assets/images/Ellipse 129.svg')] bg-[left_top,right_bottom] bg-[auto,auto] flex flex-col gap-8 items-center">
            <div className="flex flex-col items-center gap-2">
              <SecondaryLogo />
            </div>

            <ButtonComponent
              label="TMGL"
              className="bg-white text-primary hover:bg-white w-full"
            />
          </div>
        ) : (
          <button
            className="mt-auto mx-auto bg-[#FEC28B] w-12 h-12 flex items-center justify-center rounded-xl shrink-0 text-white text-3xl font-normal my-6">
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default SideBar;
