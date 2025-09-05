"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import Signin from "@/components/Auth/Signin";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, currentUser, fetchUsers } = useUserStore();
  // const Token = localStorage.getItem("token")
  const Token = typeof window !== "undefined" && localStorage.getItem("token")


  return (
    <div>
      {!Token ? <Signin /> : (<div>{children}</div>)}
      {/*{Token ? <>{children}</> : <Signin /> }*/}
    </div>
  );
}


