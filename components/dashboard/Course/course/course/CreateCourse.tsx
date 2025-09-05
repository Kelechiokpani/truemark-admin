'use client'
import Label from "@/components/ui/form/Label";
import Button from "@/components/ui/button/Button";
import React, { useState } from "react";
import * as Yup from "yup";
import { useMutation } from "@apollo/client/react";
import { CREATE_COURSE } from "@/lib/Mutation/mutation";
import { useFormik } from "formik";
import useUploader from "@/lib/useUploader";
import { toast } from "react-hot-toast";
import { GET_COURSES } from "@/lib/Query/queries";


const validationSchema = Yup.object({
  name: Yup.string().required("Course name is required"),
  price: Yup.number().typeError("Price must be a number").required("Price is required"),
  description: Yup.string().required("Course description is required"),
  image: Yup.mixed<File>()
    .required("Course image is required")
    // .test("fileType", "Unsupported file type", (value) => {
    //   return value && ["image/jpeg", "image/png"].includes(value.type);
    // })
    // .test("fileSize", "File is too large (max 50MB)", (value) => {
    //   return value instanceof File && value.size <= 50 * 1024 * 1024;
    // }),
});

const Create_Course =  ({ onClose, isOpen }) => {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [CreateCourse, { loading, error }] = useMutation(CREATE_COURSE, {
    awaitRefetchQueries: true, refetchQueries: [GET_COURSES],
    onCompleted: (data: any) => {
      data?.createCourse.success === true
      toast.success("Course created successfully!", {
        className:
          "bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg font-medium text-sm sm:text-base w-[calc(100vw-2rem)] sm:w-auto",
        duration: 3000,
      })
      console.log(data, "course created");
      onClose(); // close modal only after success
    },
  });

  const { upload, uploadPercentage, loading: uploadLoading } = useUploader({
    onCompleted: (res) => {
      console.log("Uploaded to Cloudinary:", res)
      setFileUrl(res?.secure_url);
      formik.setFieldValue("image", res?.secure_url); // ✅ bind to formik
      toast.success("Image uploaded successfully!");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      image: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await CreateCourse({
          variables: {
            input: {
              name: values.name,
              price: parseFloat(values.price),
              description: values.description,
              image: values.image || fileUrl,
            },
          },
        });
      } catch (err) {
        console.error("Course creation failed:", err);
      }
    },
  });

  return (
    <div
      className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Create New Course
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          create new course for your audience.
        </p>
      </div>
      <div className="flex flex-col">
        <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
          <div className="mt-7">

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <Label>Course Name</Label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter course name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="w-full text-[#387467] rounded-md border  border-gray-300  p-3 bg-[#fff9d9] focus:outline-none focus:ring-2 focus:ring-[#387467]"
                />
                {formik.errors.name && formik.touched.name && (
                  <span className="text-red-500 text-xs">{formik.errors.name}</span>
                )}
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Course Price</Label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  placeholder="Enter course price"
                  value={
                    formik.values.price
                      ? new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                        minimumFractionDigits: 0 // no .00 unless you want it
                      }).format(Number(formik.values.price))
                      : ""
                  }
                  onChange={(e) => {
                    // remove everything that's not a digit
                    const rawValue = e.target.value.replace(/\D/g, "");
                    formik.setFieldValue("price", rawValue);
                  }}
                  className="w-full text-[#387467] rounded-md border  border-gray-300  p-3 bg-[#fff9d9] focus:outline-none focus:ring-2 focus:ring-[#387467]"
                />
                {formik.errors.price && formik.touched.price && (
                  <span className="text-red-500 text-xs">{formik.errors.price}</span>
                )}
              </div>

              <div className="col-span-2 lg:col-span-2">
                <Label>Course Image</Label>
                <input id="image"
                       name="image"
                       placeholder="Insert image"
                       type="file"
                       accept="image/*"
                       className="w-full text-[#387467] rounded-md border  border-gray-300  p-3 bg-[#fff9d9] focus:outline-none focus:ring-2 focus:ring-[#387467]"
                       onChange={async (event) => {
                         const file = event.currentTarget.files?.[0];
                         if (file) {
                           try {
                             await upload(file, "truemark", "dee0xvh2c");
                           } catch (err) {
                             toast.error("Image upload failed!");
                             console.error("Image upload error:", err);
                           }
                         }
                       }}
                />
                {formik.errors.image && formik.touched.image && (
                  <span className="text-red-500 text-xs">{formik.errors.image}</span>
                )}
              </div>


              <div className="col-span-2">
                <Label>Course Description</Label>
                <textarea id="description"
                          name="description"
                          placeholder="Enter course description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          className="w-full text-[#387467] rounded-md border  border-gray-300  p-3 bg-[#fff9d9] focus:outline-none focus:ring-2 focus:ring-[#387467]"
                />
                {formik.errors.description && formik.touched.description && (
                  <span className="text-red-500 text-xs">{formik.errors.description}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>

          <button
            onClick={() => formik.handleSubmit()} disabled={loading || uploadLoading}
            type="button"
            className="inline-flex items-center justify-center rounded-xl   text-white font-semibold   shadow-md px-8  rounded-md bg-[#387467] text-white py-3  disabled:opacity-60"
            // onClick={() => formik.handleSubmit()}
            // disabled={loading}
          >
            {loading || uploadLoading ? (
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
            ) : "Create Course"}

          </button>
        </div>
        {error?.message && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-3 text-sm text-center">
            {error?.message}
          </div>
        )}
      </div>
    </div>
  )
}


export default Create_Course