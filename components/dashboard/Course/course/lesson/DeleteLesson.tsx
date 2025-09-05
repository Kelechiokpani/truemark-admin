'use client'
import Button from "@/components/ui/button/Button";
import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {  DELETE_COURSE_LESSON, UPDATE_COURSE_LESSON } from "@/lib/Mutation/mutation";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import useVideoUploader from "@/lib/useVideoUploder";
import { GET_COURSES_LESSONS } from "@/lib/Query/queries";


const Delete_Lesson =({ onClose, courseListing,  isOpen })=> {
  const [file, setFile] = useState<File | null>(null);
  const [DeleteCourseLesson, { loading, error }] = useMutation(DELETE_COURSE_LESSON, {
    awaitRefetchQueries: true, refetchQueries:[GET_COURSES_LESSONS], variables:{moduleId:courseListing?.id},
    onCompleted: (data:any) => {
      data?.deleteCourseLesson?.success === true
      toast.success("Course Lesson Deleted successfully!", {
        className:
          "bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg font-medium text-sm sm:text-base w-[calc(100vw-2rem)] sm:w-auto",
        duration: 3000,
      })
      onClose(); // close modal only after success
    },
  });

  const { upload, uploadPercentage, loading: uploadLoading } = useVideoUploader({
    onCompleted: (res) => {
      console.log("Video Uploaded to Cloudinary:", res)
    },
  });

  const formik = useFormik({
    initialValues: {
      deleteCourseLessonId: courseListing?.id,
    },

    onSubmit: async (values) => {
      try {
        await DeleteCourseLesson({
          variables: {
            deleteCourseLessonId: courseListing?.id,
          },
        });
      } catch (err) {
        console.error("Course creation failed:", err);
      }
    },
  }) as any;

  return (
    <div
      className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Delete Lesson Video
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Are you sure you want to delete this lesson from this module. ?
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>

          {uploadLoading ? (
              <button disabled
                      className="inline-flex items-center justify-center rounded-xl text-white font-semibold shadow-md px-8 rounded-md bg-[#387467] text-white py-3 disabled:opacity-60">
                uploading video please wait.....
              </button>)
            : (
              <button
                onClick={() => formik.handleSubmit()}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl text-white font-semibold shadow-md px-8 rounded-md bg-red-600 text-white py-3 disabled:opacity-60"
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
                  "Delete Lesson"
                )}
              </button>
            )}
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


export default Delete_Lesson