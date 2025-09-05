"use client"
import React, { useEffect } from "react";
import SideBar from "@/components/Layout/main/sidebar";
import Header from "@/components/Layout/main/header";
import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "@/lib/Query/queries";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import AuthGuard from "@/AuthGuard";


export default function layout({ children }: { children: any }) {
  const { data, loading, error} = useQuery(GET_USERS, {
    fetchPolicy: "cache-and-network",
    // fetchPolicy: 'network-only',
    // variables:{seasonId:seasonId},
  });
  const router = useRouter();
  const { token, currentUser } = useUserStore()
  const Token = typeof window !== "undefined" && localStorage.getItem("token")


  return (

      <div className="flex w-full h-screen">
        {/* Sidebar fixed full height */}
        <SideBar />
        {/* Main content area */}
        <div className="flex-grow flex flex-col h-screen overflow-hidden">
          {/* Sticky header at the top */}
          <div className="shrink-0">
            <Header data={data} />
          </div>
          {/* Scrollable content below header */}
          <main className="px-6 pb-10 flex-grow mt-5 overflow-auto ">
            {children}
          </main>
        </div>
      </div>


  );
}
