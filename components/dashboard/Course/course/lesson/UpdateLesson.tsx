import Label from "@/components/ui/form/Label";
import Button from "@/components/ui/button/Button";
import React, { useState } from "react";
import * as Yup from "yup";
import { useMutation } from "@apollo/client/react";
import { UPDATE_COURSE_LESSON } from "@/lib/Mutation/mutation";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { GET_COURSES_LESSONS } from "@/lib/Query/queries";
import useUploader from "@/lib/useUploader";


const validationSchema = Yup.object({
  name: Yup.string().required("Course name is required"),
  description: Yup.string().required("Course description is required"),
  video: Yup.mixed()
    .required("Course video is required")

});

const Update_Lesson =({ onClose, courseListing,  isOpen })=> {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"video" | "pdf" | null>(null);


  const [UpdateCourseLesson, { loading, error }] = useMutation(UPDATE_COURSE_LESSON, {
    awaitRefetchQueries: true, refetchQueries:[GET_COURSES_LESSONS], variables:{moduleId:courseListing?.id},
    onCompleted: (data:any) => {
      data?.updateCourseLesson?.success === true
      toast.success("Lesson updated successfully!", {
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
      onClose(); // close modal only after success
    },
  });

  const { upload, uploadPercentage, loading: uploadLoading } = useUploader({
    onCompleted: (res) => {
      console.log("Video Uploaded to Cloudinary:", res)
    },
  });

  const formik = useFormik({
    initialValues: {
      courseModuleId: courseListing?.courseModuleId,
      id: courseListing?.id,
      name: courseListing.name,
      video: courseListing.video,
      description: courseListing.description,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await UpdateCourseLesson({
          variables: {
            input: {
              courseModuleId: courseListing?.courseModuleId,
              id: courseListing?.id,
              name: values.name,
              video: values.video || file,
              description: values.description,
            },
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
          Update Lesson
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          update the details of this Lesson.
        </p>
      </div>
      <div className="flex flex-col">
        <div className="custom-scrollbar h-[350px] overflow-y-auto px-4 pb-3">
          <div className="mt-7">

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-2">
                <Label>Update Lesson Name</Label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Lesson name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className="w-full text-[#387467] rounded-md border  border-gray-300  p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#387467]"
                />
                {formik.errors.name && formik.touched.name && (
                  <span className="text-red-500 text-xs">{formik.errors.name}</span>
                )}
              </div>

              <div className="col-span-2 lg:col-span-2 space-y-3">
                {/* File Type Selector */}
                <Label>Lesson Type</Label>
                <select
                  value={fileType ?? ""}
                  onChange={(e) => {
                    setFileType(e.target.value as "video" | "pdf");
                    formik.setFieldValue("video", "");
                    formik.setFieldValue("pdf", "");
                    setFile(null);
                  }}
                  className="w-full text-[#387467] rounded-md border border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#387467]"
                >
                  <option value="video">Video</option>
                  <option value="pdf">PDF</option>
                </select>

              </div>

              {fileType === "video" && (<div className="col-span-2 lg:col-span-2">
                <Label>Module Lesson Video</Label>
                <input
                  id="video"
                  name="video"
                  placeholder="Insert Lesson video"
                  type="file"
                  accept="video/*"
                  onChange={async (event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      formik.setFieldValue("video", file);
                      try {
                        // Start uploading immediately
                        // const uploadRes = await upload(file, "truemark_video", "dee0xvh2c");
                        const uploadRes = await upload(file);
                        console.log(uploadRes?.data?.url, "uploadRes.....");
                        if (uploadRes?.data?.url) {
                          formik.setFieldValue("video", uploadRes?.data?.url);
                          setFile(uploadRes?.data?.url);
                        }
                      } catch (err) {
                        toast.error("Video upload failed!");
                        console.error("Video upload error:", err);
                      }


                    }
                  }}
                  className="w-full text-[#387467] rounded-md border  border-gray-300  p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#387467]"
                />
                {formik.errors.video && formik.touched.video && (
                  <span className="text-red-500 text-xs">{formik.errors.video}</span>
                )}
              </div>)}

              {fileType === "pdf" && (<div className="col-span-2 lg:col-span-2">
                <Label>Module Lesson PDF - File</Label>
                <input
                  id="video"
                  name="video"
                  placeholder="Insert Lesson pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={async (event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      formik.setFieldValue("video", file);
                      try {
                        // Start uploading immediately
                        // const uploadRes = await upload(file, "truemark_video", "dee0xvh2c");
                        const uploadRes = await upload(file);
                        console.log(uploadRes?.data?.url, "uploadRes.....");
                        if (uploadRes?.data?.url) {
                          formik.setFieldValue("video", uploadRes?.data?.url);
                          setFile(uploadRes?.data?.url);
                        }
                      } catch (err) {
                        toast.error("PDF upload failed!");
                        console.error("Pdf upload error:", err);
                      }}
                  }}
                  className="w-full text-[#387467] rounded-md border  border-gray-300  p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#387467]"
                />
                {formik.errors.video && formik.touched.video && (
                  <span className="text-red-500 text-xs">{formik.errors.video}</span>
                )}
              </div>)}


              <div className="col-span-2">
                <Label>Update Lesson Description</Label>
                <textarea id="description"
                          name="description"
                          placeholder="Enter Lesson description"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          className="w-full text-[#387467] rounded-md border border-gray-300  p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#387467]"
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

          {uploadLoading ? (
              <button disabled
                      className="inline-flex items-center justify-center rounded-xl text-white font-semibold shadow-md px-8 rounded-md bg-[#387467] text-white py-3 disabled:opacity-60">
                uploading video please wait.....
              </button>)
            : (
              <button
                onClick={() => formik.handleSubmit()}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl text-white font-semibold shadow-md px-8 rounded-md bg-[#387467] text-white py-3 disabled:opacity-60"
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
                  "Update Lesson"
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


export default Update_Lesson