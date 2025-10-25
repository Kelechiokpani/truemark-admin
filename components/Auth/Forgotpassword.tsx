"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BgImage from "../../public/images/bg.jpg"
import { useUserStore } from "@/store/useUserStore";
import { useMutation  } from "@apollo/client/react";
import {  FORGOT_USERS_PASSWORD } from "@/lib/Mutation/mutation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});



const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth, currentUser } = useUserStore()
  const router = useRouter();
  // @ts-ignore
  const [ForgetPassword, { loading, error }] = useMutation(FORGOT_USERS_PASSWORD, {
    onCompleted: async (data:any) => {
      const payload = data?.forgetPassword?.success;
      if(payload){
        toast.success("Otp has been sent to your email.", {
          style: {
            background: "#387467",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            fontWeight: 500,
            fontSize: "0.875rem",
          },
          position: "bottom-right", // 👈 this moves it to bottom-right
          duration: 3000,
        });
        router.push("/resetpassword")
      }
    },
    onError: (err: any) => {
      if (err?.graphQLErrors?.length) {
        err.graphQLErrors.forEach((graphError: any) => {
          if (graphError.extensions?.errors) {
          }
        });
      }
    }
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await ForgetPassword({
          variables: {
            email: values.email,
          }
        })
      } catch (error: any) {
        console.log(error, "error")
      }
    },
  });

  return (
    <>
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center  bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${BgImage.src})` }}
      >
        <div className="max-w-lg w-full bg-white px-10 py-16 rounded-2xl">
          <h1 className="text-center text-2xl font-semibold mb-6">Forgot Password</h1>
          <div className=" space-y-4 w-full">

            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full text-[#387467] rounded-md border  border-gray-300 mt-4 p-3  focus:outline-none focus:ring-2 focus:ring-[#387467]"
            />

            {formik.errors.email && formik.touched.email && (
              <span className="text-red-500 text-xs w-full mt-0">{formik.errors.email}</span>
            )}

            {/* Create Account Button */}
            <button
              onClick={() => formik.handleSubmit()}
              disabled={loading}
              type='button'
              className="inline-flex items-center justify-center w-full rounded-xl   text-white font-semibold px-4  shadow-md w-full  rounded-md bg-[#387467] text-white py-3 mt-4 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  please wait...
                </>
              ) : (
                "Forgot Password"
              )}
            </button>

            {error?.message && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-3 text-sm text-center">
                {error?.message}
              </div>
            )}


          </div>
          <div className="flex justify-between gap-8 mt-3">
            <p className="mt-4 text-start text-sm">
              Already have an account?

              <Link href="/auth/signin" className="ml-2 text-pink-500">
                Sign In
              </Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
