// "use client"
// import React, { useEffect } from "react";
// import SideBar from "@/components/Layout/main/sidebar";
// import Header from "@/components/Layout/main/header";
// import { useQuery } from "@apollo/client/react";
// import { GET_USERS } from "@/lib/Query/queries";
// import { useRouter } from "next/navigation";
// import { useUserStore } from "@/store/useUserStore";
// import AuthGuard from "@/AuthGuard";
// import Unauthorized from "@/components/hooks/Unauthorized";
//
//
// export default function layout({ children }: { children: any }) {
//   const { data, loading, error} = useQuery(GET_USERS, {
//     fetchPolicy: "cache-and-network",
//     // fetchPolicy: 'network-only',
//     // variables:{seasonId:seasonId},
//   }) as any;
//
//   const router = useRouter();
//   const { token, currentUser } = useUserStore()
//   const Token = typeof window !== "undefined" && localStorage.getItem("token")
//   console.log(data,"data.....");
//
//   //
//   return (
//
//     <div>
//       {data?.getUserInfo?.isAdmin === false ? (
//         <Unauthorized/>
//       ): (
//         <div className="flex w-full h-screen">
//           {/* Sidebar fixed full height */}
//           <SideBar />
//           {/* Main content area */}
//           <div className="flex-grow flex flex-col h-screen overflow-hidden">
//             {/* Sticky header at the top */}
//             <div className="shrink-0">
//               <Header data={data} />
//             </div>
//             {/* Scrollable content below header */}
//             <main className="px-6 pb-10 flex-grow mt-5 overflow-auto ">
//               {children}
//             </main>
//
//
//           </div>
//
//
//         </div>
//       )}
//     </div>
//
//
//   );
// }


"use client";
import React from "react";
import SideBar from "@/components/Layout/main/sidebar";
import Header from "@/components/Layout/main/header";
import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "@/lib/Query/queries";
import Unauthorized from "@/components/hooks/Unauthorized";
import { useUserStore } from "@/store/useUserStore";
import CenteredLoader from "@/components/utility/Loader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { token } = useUserStore();
  const { data, loading, error } = useQuery(GET_USERS, {
    fetchPolicy: "cache-and-network",
    skip: !token, // 🚀 prevents firing query if no token
  }) as any;

  // While loading — show a smooth loader instead of flicker
  if (loading) {
    return (

      <div className="flex items-center justify-center gap-6">
        <CenteredLoader />
        <h1 className="text-2xl font-bold animate-pulse text-gray-600 mb-4 text-sm">
          Checking authorization...
        </h1>
      </div>

    );
  }

  // If query errored or user not found
  if (error || !data?.getUserInfo) {
    return <Unauthorized />;
  }

  // If user exists but not admin
  if (data?.getUserInfo?.isAdmin === false) {
    return <Unauthorized />;
  }

  // ✅ Only render dashboard once user is confirmed
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar fixed full height */}
      <SideBar />

      {/* Main content area */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Sticky header at the top */}
        <div className="shrink-0">
          <Header data={data} />
        </div>

        {/* Scrollable content below header */}
        <main className="px-6 pb-10 flex-grow mt-5 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
