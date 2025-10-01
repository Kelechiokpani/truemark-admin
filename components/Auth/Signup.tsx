"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BgImage from "../../public/images/bg.jpg"
import { useUserStore } from "@/store/useUserStore";
import { useMutation  } from "@apollo/client/react";
import { CREATE_USERS } from "@/lib/Mutation/mutation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation"; // Next.js 13+ app router

const validationSchema = Yup.object({
  fullname: Yup.string()
    .min(2, "Full name must be at least 2 characters long")
    .max(50, "Full name must be less than 50 characters")
    .required("Full name is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .required("Password is required"),
});



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useUserStore()
  const router = useRouter();
  // @ts-ignore
  const [CreateAccount, { loading, error }] = useMutation(CREATE_USERS, {
    onCompleted: async (data:any) => {
      const payload = data?.createAccount;
      if (payload?.success && payload?.user) {
        const user = {
          id: payload.user.id,
          email: payload.user.email,
          fullname: payload.user.fullname,
          isAdmin: payload.user.isAdmin,
        };
        // Optional: if token is returned from server, use it
        const token = payload?.token ?? null;

        setAuth(user, token)
        router.push("/signin");
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
      fullname: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await CreateAccount({
          variables: {
            input: {
              fullname: values.fullname,
              email: values.email,
              password: values.password,
            }
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
        <div className="max-w-lg bg-white px-10 py-10 rounded-2xl">
          <h1 className="text-center text-2xl font-semibold mb-6">Sign Up</h1>
          <div className=" space-y-4 w-full">

            <input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Full Name"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              className="w-full text-[#387467] rounded-md border  border-gray-300 mt-4 p-3  focus:outline-none focus:ring-2 focus:ring-[#387467]"
            />

            {formik.errors.fullname && formik.touched.fullname && (
              <span className="text-red-500 text-xs w-full mt-0">{formik.errors.fullname}</span>
            )}


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
            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full text-[#387467] rounded-md border  border-gray-300 mt-4 p-3  focus:outline-none focus:ring-2 focus:ring-[#387467] pr-10"
              />

              {/* Toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 "
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              {formik.errors.password && formik.touched.password && (
                <span className="text-red-500 text-xs w-full mt-0">{formik.errors.password}</span>
              )}
            </div>

            {/* Create Account Button */}
            <button
              onClick={() => formik.handleSubmit()}
              disabled={loading}
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
                "Create Account"
              )}
            </button>

            {error?.message && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-3 text-sm text-center">
                {error?.message}
              </div>
            )}


          </div>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-pink-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
