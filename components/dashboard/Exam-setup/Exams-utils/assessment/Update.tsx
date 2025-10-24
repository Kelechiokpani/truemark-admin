'use client'
import Label from "@/components/ui/form/Label";
import Button from "@/components/ui/button/Button";
import React from "react";
import * as Yup from "yup";
import { useMutation } from "@apollo/client/react";
import { UPDATE_ASSESSMENT } from "@/lib/Mutation/mutation";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { GET_ASSESSMENTS } from "@/lib/Query/queries";
import { useCourseStore } from "@/store/useCourseStore";


const validationSchema = Yup.object({
  title: Yup.string().required("Assessment title is required"),
  description: Yup.string().required("Assessment description is required"),
});


const Update_Assessment =  ({ onClose, isOpen, Assessment }) => {
  const course = useCourseStore((s) => s.selectedCourse);
  const [UpdateAssignment, { loading, error }] = useMutation(UPDATE_ASSESSMENT, {
    awaitRefetchQueries: true, refetchQueries: [GET_ASSESSMENTS], variables:{courseId:course?.id},
    onCompleted: (data: any) => {
      data?.createCourse.success === true
      toast.success("Assessment updated successfully!", {
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
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      assignmentId: Assessment?.id,
      title: Assessment.title,
      description: Assessment.description,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await UpdateAssignment({
          variables: {
            assignmentId: Assessment?.id,
            input: {
              title: values.title,
              description: values.description,
            },
          },
        });
      } catch (err) {
        console.error("Assessment update failed:", err);
      }
    },
  }) as any;

  return (
    <div
      className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
         Update Course Assessment
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          update course assessment for your audience.
        </p>
      </div>
      <div className="flex flex-col">
        <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
          <div className="mt-7">

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-2">
                <Label>Assessment Title</Label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter assessment title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  className="w-full text-[#387467] rounded-md border  border-gray-300  p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#387467]"
                />
                {formik.errors.title && formik.touched.title && (
                  <span className="text-red-500 text-xs">{formik.errors.title}</span>
                )}
              </div>

              <div className="col-span-2">
                <Label>Assessment Description</Label>
                <textarea id="description"
                          name="description"
                          placeholder="Enter course description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          className="w-full text-[#387467] rounded-md border  border-gray-300  p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#387467]"
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
            onClick={() => formik.handleSubmit()} disabled={loading}
            type="button"
            className="inline-flex items-center justify-center rounded-xl   text-white font-semibold   shadow-md px-8  rounded-md bg-[#387467] text-white py-3  disabled:opacity-60"

            // onClick={() => formik.handleSubmit()}
            // disabled={loading}
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
            ) : "Update assessment"}

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


export default Update_Assessment