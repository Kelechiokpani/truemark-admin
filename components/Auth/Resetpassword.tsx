"use client";
import { useState } from "react";
import BgImage from "@/public/images/bg.jpg";


const ResetPassword = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center  bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${BgImage.src})` }}
      >
        <div className="max-w-md bg-white px-10 py-10 rounded-2xl">
          <h1 className="text-center text-2xl font-semibold mb-6">Reset Password</h1>
          <form className="space-y-4 ">

            <input
              type="password"
              placeholder="New Password"
              className="w-full text-[#387467] rounded-md border border-gray-300 mt-4 p-3 bg-[#fff9d9] focus:outline-none focus:ring-2 focus:ring-[#387467]"
            />

            <input
              type="password"
              placeholder="Comfirm Password"
              className="w-full text-[#387467] rounded-md border border-gray-300 mt-4 p-3 bg-[#fff9d9] focus:outline-none focus:ring-2 focus:ring-[#387467]"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-[#387467] text-white py-3 mt-4 "
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
