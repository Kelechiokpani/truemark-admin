"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { mainGeneral, mainSideBar } from "@/lib/json";
import { icons, sideIcons } from "@/public/assets/icons";
import ButtonComponent from "@/components/molecules/button-component";
import { Logo, PrimaryLogo, SecondaryLogo } from "@/components/molecules/logo";
import { useUserStore } from "@/store/useUserStore";

function SideBar() {
  const router = useRouter();
  const { logout } = useUserStore();

  const [isOpen, setIsOpen] = useState(true);
  const toggleSideBar = () => setIsOpen(!isOpen);

  // 🔑 Separate hover state for each section
  const [hoveredMain, setHoveredMain] = useState<number | null>(null);
  const [hoveredGeneral, setHoveredGeneral] = useState<number | null>(null);

  const pathname = usePathname();

  const isRouteActive = (menuLink: string) => {
    if (menuLink === "/overview") return pathname === menuLink;
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
        "bg-white w-[300px] duration-150 flex flex-col shadow-lg flex-shrink-0  ",
        isOpen ? null : "w-[100px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-[95px] relative px-6 shrink-0">
        {isOpen ? (
          <Link href="/">
            <PrimaryLogo />
          </Link>
        ) : (
          <Link href="/">
            <Logo />
          </Link>
        )}
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

      {/* Sidebar Menus */}
      <div
        className={cn(
          "gap-1 flex flex-col overflow-auto flex-grow px-4",
          isOpen ? null : "items-center"
        )}
      >

        {mainSideBar.map((menu, index) => {
          const active = isRouteActive(menu.link);
          return (
            <Link
              key={index}
              className={cn(
                "group text-text text-sm font-medium rounded-lg py-3 px-4 flex gap-4 items-center capitalize duration-150 ",
                active ? "bg-[#387467] text-white" : "hover:bg-green-50",
                isOpen ? null : "hover:bg-transparent !bg-transparent"
              )}
              href={menu.link}
              onMouseOver={() => setHoveredMain(index)}
              onMouseOut={() => setHoveredMain(null)}
            >
              <span
                className={cn(
                  "shrink-0 w-8 h-8 rounded-lg border group-hover:bg-[#387467] group-hover:border-none duration-150 flex items-center justify-center",
                  active ? "bg-[#387467] border-none" : "hover:bg-green-50"
                )}
              >
                {hoveredMain === index || active
                  ? menu.active_icon
                  : menu.icon}
              </span>
              {isOpen ? <span>{menu.label}</span> : null}
            </Link>
          );
        })}

        {/* Logout */}
        <button
          onClick={handleRoute}
          className="mt-3 hover:bg-secondary text-text text-sm font-medium rounded-lg py-3 px-4 flex gap-4 items-center capitalize duration-150"
        >
          <span className="shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center">
            {sideIcons.logout}
          </span>
          {isOpen ? <span>Logout</span> : null}
        </button>

        {/* Footer CTA */}
        {/*bg-[#04BA99] */}
        {isOpen ? (
          <div className="mt-auto mx-auto w-[192px] text-white shadow-2xl border rounded-[20px] py-7 px-[23px] my-6 bg-green-50  bg-[url('/assets/images/Ellipse 128.svg'),url('/assets/images/Ellipse 129.svg')] bg-[left_top,right_bottom] bg-[auto,auto] flex flex-col gap-8 items-center">
            <SecondaryLogo />
            <ButtonComponent
              label="TMGL"
              className="bg-white text-gray-800 hover:bg-white w-full"
            />
          </div>
        ) : (
          <button className="mt-auto mx-auto bg-[#FEC28B] w-12 h-12 flex items-center justify-center rounded-xl shrink-0 text-white text-3xl font-normal my-6">
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default SideBar;
