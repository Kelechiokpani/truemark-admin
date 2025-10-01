"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Plus, Trash2 } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { CREATE_EXAM_ASSIGNMENT } from "@/lib/Mutation/mutation";
import { GET_COURSES } from "@/lib/Query/queries";
import { toast } from "react-hot-toast";
import React from "react";
import { useParams, useRouter } from "next/navigation";

// ✅ Validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        questionText: Yup.string().required("Question is required"),
        correctAnswer: Yup.string().required("Correct answer is required"),
        options: Yup.array()
          .of(Yup.string().required("Option cannot be empty"))
          .min(2, "At least 2 options required"),
      })
    )
    .min(1, "At least 1 question required"),
});




export default function ExamSetup() {
  const params = useParams();
  const router = useRouter();

  const [CreateAssignment, { loading, error }] = useMutation(CREATE_EXAM_ASSIGNMENT, {
    awaitRefetchQueries: true, refetchQueries: [GET_COURSES],
    onCompleted: (data: any) => {
      console.log(data, "exam created");
      if(data?.createAssignment){
        toast.success("Assessment Created successfully!", {
          className:
            "bg-[#387467] text-white px-4 py-2 rounded-lg shadow-lg font-medium text-sm sm:text-base w-[calc(100vw-2rem)] sm:w-auto",
          duration: 3000,
        })
      formik.resetForm()
      }

    },
  });


  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      questions: [
        {
          questionText: "",
          correctAnswer: "",
          options: [""],
        },
      ],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await CreateAssignment({
          variables: {
            input: {
              courseId: params.id,
              description: values.description,
              title: values.title,
              questions: values.questions.map((q:any) => ({
                questionText: q.questionText,
                correctAnswer: q.correctAnswer,
                options: q.options.map((opt:any) => ({
                  optionText: opt,
                })),
              })),
            },
          },
        });
      } catch (err) {
        console.error("Assessment creation failed:", err);
      }
    },
  });

  // 🔹 Add a new question
  const addQuestion = () => {
    formik.setFieldValue("questions", [
      ...formik.values.questions,
      { questionText: "", correctAnswer: "", options: [""] },
    ]);
  };

  // 🔹 Delete a question
  const removeQuestion = (qIndex: number) => {
    const updated = [...formik.values.questions];
    updated.splice(qIndex, 1);
    formik.setFieldValue("questions", updated);
  };

  // 🔹 Add option
  const addOption = (qIndex: number) => {
    const updated = [...formik.values.questions];
    updated[qIndex].options.push("");
    formik.setFieldValue("questions", updated);
  };

  // 🔹 Remove option
  const removeOption = (qIndex: number, optIndex: number) => {
    const updated = [...formik.values.questions];
    updated[qIndex].options.splice(optIndex, 1);
    formik.setFieldValue("questions", updated);
  };

  return (

    <div>
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        ← Back
      </button>

      <header className="bg-[#387467] text-white px-6 py-8 rounded-md mb-8">
        <h1 className="text-3xl font-bold">Set-up Assessment</h1>
      </header>
      <div className="max-w-6xl mx-auto p-8 space-y-6 bg-white border shadow rounded-md">
        <div
          className="w-full flex justify-between items-center p-4 bg-gray-50"
        >
          <h2 className="font-semibold text-lg">True-mark (T.M.G.L)</h2>
          <span className="text-white bg-[#387467] px-2 py-1 rounded-full text-xs">
                  True-mark Global Exam setup
                </span>
        </div>

        <div className='flex flex-col justify-center justify-center gap-8'>
          {/* Exam Title */}
          <div>
            <label className="block font-medium mb-1">Exam Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="border px-3 py-2 rounded w-[32rem]"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.title}</p>
            )}

          </div>

          {/* Exam Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              // type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-[32rem] border px-3 py-2 rounded"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.description}</p>
            )}
          </div>
        </div>


        {/* Questions */}
        {/*<div className="space-y-6">*/}
        <div className="grid md:grid-cols-2 gap-4">
          {formik.values.questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="border p-4 rounded shadow-sm space-y-4 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <label className="font-medium">Question {qIndex + 1}</label>
                {formik.values.questions.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => removeQuestion(qIndex)}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              {/* Question Input */}
              <textarea
                // type="text"
                name={`questions[${qIndex}].questionText`}
                value={q.questionText}
                onChange={formik.handleChange}
                placeholder="Enter question"
                className="w-full border px-3 py-2 rounded bg-white"
              />
              {formik.errors.questions &&
                formik.errors.questions[qIndex] &&
                (formik.errors.questions[qIndex] as any).questionText && (
                  <p className="text-red-500 text-sm">
                    {(formik.errors.questions[qIndex] as any).questionText}
                  </p>
                )}

              {/* Options */}
              <div>
                <label className="block font-medium mb-1">Options</label>
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className="mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        name={`questions[${qIndex}].options[${optIndex}]`}
                        value={opt}
                        onChange={formik.handleChange}
                        placeholder={`Option ${optIndex + 1}`}
                        className="flex-1 border px-3 py-2 mt-2 rounded bg-white"
                      />
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => removeOption(qIndex, optIndex)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Error Message for Option */}
                    {formik.errors.questions &&
                      formik.errors.questions[qIndex] &&
                      (formik.errors.questions[qIndex] as any).options &&
                      (formik.errors.questions[qIndex] as any).options[optIndex] && (
                        <p className="text-red-500 text-sm mt-1">
                          {(formik.errors.questions[qIndex] as any).options[optIndex]}
                        </p>
                      )}

                  </div>
                ))}
                <button
                  type="button"
                  className="text-[#387467] text-sm"
                  onClick={() => addOption(qIndex)}
                >
                  + Add Option
                </button>
              </div>

              {/* Correct Answer */}
              <div>
                <label className="block font-medium mb-1">Correct Answer</label>
                <select
                  name={`questions[${qIndex}].correctAnswer`}
                  value={q.correctAnswer}
                  onChange={formik.handleChange}
                  className="w-full border px-3 py-3 rounded bg-white cursor-pointer"
                >
                  <option value="">Select correct answer</option>
                  {q.options.map((opt, i) => (
                    <option className="cursor-pointer" key={i} value={opt}>
                      {opt || `Option ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}


        </div>

        <div className="flex justify-between gap-6">

          {/* Add Question */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={addQuestion}>
            <div className="w-8 h-8 flex items-center justify-center bg-[#387467] rounded-full ">
              <Plus size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add Question</span>
          </div>

          {/* Submit */}

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
            ) : "Create Assessment"}

          </button>

        </div>
      </div>
    </div>

  );
}
