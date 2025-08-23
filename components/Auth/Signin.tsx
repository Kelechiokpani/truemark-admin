"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BgImage from "@/public/images/bg.jpg";


const Signin = () => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleRoute = () => {
    router.push("/overview");
  }

  return (
    <>
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center  bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${BgImage.src})` }}
      >
        <div className="max-w-md bg-white px-10 py-10 rounded-2xl">
          <h1 className="text-center text-2xl font-semibold mb-6">Sign In</h1>
          <form className="space-y-4 ">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-[#387467] rounded-md border border-gray-300 mt-4 p-3 bg-[#fff9d9] focus:outline-none focus:ring-2 focus:ring-[#387467]"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-[#387467] rounded-md border border-gray-300 mt-4 p-3 bg-[#fff9d9] focus:outline-none focus:ring-2 focus:ring-[#387467]"
            />
            <button
              type="submit"
              onClick={handleRoute}
              className="w-full rounded-md bg-[#387467] text-white py-3 mt-4 "
            >
              Login Account
            </button>
          </form>

          <div className="flex justify-between gap-8 mt-3">
            <p className="mt-4 text-start text-sm">
              Do not have an account?{" "}
              <br/>
              <Link href="/signup" className="text-pink-500">
                Sign up
              </Link>
            </p>
            <p className="mt-4 text-center text-sm">
              <Link href="/forgotpassword" className="text-pink-500">
                Forgot password?
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Signin;
