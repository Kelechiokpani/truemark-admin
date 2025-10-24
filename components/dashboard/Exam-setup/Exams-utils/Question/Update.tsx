"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Plus, Trash2 } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import {
  UPDATE_QUESTIONS,
  DELETE_QUESTIONS,
  UPDATE_QUESTION_OPTION,
  DELETE_QUESTION_OPTIONS,
} from "@/lib/Mutation/mutation";
import { GET_COURSES } from "@/lib/Query/queries";
import { toast } from "react-hot-toast";
import React from "react";

// ✅ Validation schema
const validationSchema = Yup.object().shape({
  questionText: Yup.string().required("Question text is required"),
  correctAnswer: Yup.string().required("Correct answer is required"),
  options: Yup.array()
    .of(Yup.string().required("Option cannot be empty"))
    .min(2, "At least 2 options required"),
});

export default function UpdateSingleQuestion({ question }) {
  // ✅ GraphQL Mutations
  const [UpdateQuestion] = useMutation(UPDATE_QUESTIONS, {
    refetchQueries: [GET_COURSES],
  });
  const [DeleteQuestion] = useMutation(DELETE_QUESTIONS, {
    refetchQueries: [GET_COURSES],
  });
  const [UpdateOption] = useMutation(UPDATE_QUESTION_OPTION, {
    refetchQueries: [GET_COURSES],
  });
  const [DeleteOption] = useMutation(DELETE_QUESTION_OPTIONS, {
    refetchQueries: [GET_COURSES],
  });

  console.log(question, "question");

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      questionText: question?.questionText || "",
      correctAnswer: question?.correctAnswer || "",
      options: question?.options?.map((opt) => opt.optionText) || [],
      optionIds: question?.options?.map((opt) => opt.id) || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await UpdateQuestion({
          variables: {
            questionId: question.id,
            input: {
              questionText: values.questionText,
              correctAnswer: values.correctAnswer,
            },
          },
        });
        toast.success("Question updated successfully!", {
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
      } catch (error) {
        toast.error("Failed to update question");
      }
    },
  });

  // 🔹 Add option (local only)
  const addOption = () => {
    formik.setFieldValue("options", [...formik.values.options, ""]);
    formik.setFieldValue("optionIds", [...formik.values.optionIds, ""]);
  };

  // // 🔹 Update single option
  // const handleUpdateOption = async (index, text) => {
  //   const optionId = formik.values.optionIds[index];
  //   if (!optionId) return;
  //
  //   try {
  //     await UpdateOption({
  //       variables: { optionId, input: { optionText: text } },
  //     });
  //     toast.success("Question Option updated successfully!", {
  //       style: {
  //         background: "#387467",
  //         color: "#fff",
  //         padding: "0.5rem 1rem",
  //         borderRadius: "0.5rem",
  //         boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  //         fontWeight: 500,
  //         fontSize: "0.875rem",
  //       },
  //       position: "bottom-right", // 👈 this moves it to bottom-right
  //       duration: 3000,
  //     });
  //   } catch {
  //     toast.error("Failed to update option");
  //   }
  // };
  //
  // // 🔹 Delete single option
  // const handleDeleteOption = async (index) => {
  //   const optionId = formik.values.optionIds[index];
  //
  //   const newOptions = [...formik.values.options];
  //   const newOptionIds = [...formik.values.optionIds];
  //   newOptions.splice(index, 1);
  //   newOptionIds.splice(index, 1);
  //   formik.setFieldValue("options", newOptions);
  //   formik.setFieldValue("optionIds", newOptionIds);
  //
  //   if (optionId) {
  //     try {
  //       await DeleteOption({ variables: { optionId } });
  //       toast.success("Question Option deleted successfully!", {
  //         style: {
  //           background: "#387467",
  //           color: "#fff",
  //           padding: "0.5rem 1rem",
  //           borderRadius: "0.5rem",
  //           boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  //           fontWeight: 500,
  //           fontSize: "0.875rem",
  //         },
  //         position: "bottom-right", // 👈 this moves it to bottom-right
  //         duration: 3000,
  //       });
  //     } catch {
  //       toast.error("Failed to delete option");
  //     }
  //   }
  // };
  //
  //

  // 🔹 Update single option (server + local)
  const handleUpdateOption = async (index, text) => {
    const optionId = formik.values.optionIds[index];

    await formik.setFieldValue(
      "options",
      formik.values.options.map((opt, i) => (i === index ? text : opt))
    );
    // if optionId exists, update on backend
    if (optionId) {
      try {
        await UpdateOption({
          variables: {
            optionId:optionId,
            input: { optionText: text },
          },
        });
        toast.success("Option updated successfully!", {
          style: {
            background: "#387467",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            fontWeight: 500,
            fontSize: "0.875rem",
          },
          position: "bottom-right",
          duration: 3000,
        });
      } catch (error) {
        toast.error("Failed to update option");
      }
    }
  };

  // 🔹 Delete option (both local + backend if saved)
  const handleDeleteOption = async (index) => {
    const optionId = formik.values.optionIds[index];

    // remove from local formik state
    const newOptions = formik.values.options.filter((_, i) => i !== index);
    const newOptionIds = formik.values.optionIds.filter((_, i) => i !== index);

    formik.setFieldValue("options", newOptions);
    formik.setFieldValue("optionIds", newOptionIds);

    // if it exists on backend, delete it
    if (optionId) {
      try {
        await DeleteOption({ variables: { optionId } });
        toast.success("Option deleted successfully", {
          style: {
            background: "#387467",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            fontWeight: 500,
            fontSize: "0.875rem",
          },
          position: "bottom-right",
          duration: 3000,
        });
      } catch (error) {
        toast.error("Failed to delete option");
      }
    }
  };


  // 🔹 Delete entire question
  const handleDeleteQuestion = async () => {
    try {
      await DeleteQuestion({ variables: { questionId: question.id } });
      toast.success("Question deleted successfully!", {
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

    } catch {
      toast.error("Failed to delete question");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-[#387467] shadow space-y-6 mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Edit Question</h2>
        <button
          type="button"
          className="text-red-500 flex items-center gap-1"
          onClick={handleDeleteQuestion}
        >
          <Trash2 size={16} />
          Delete Question
        </button>
      </div>

      {/* Question Text */}
      <div>
        <label className="block font-medium mb-1">Question</label>
        <textarea
          name="questionText"
          value={formik.values.questionText}
          onChange={(e) => {
            formik.handleChange(e);
            UpdateQuestion({
              variables: {
                questionId: question.id,
                input: {
                  questionText: e.target.value,
                  correctAnswer: formik.values.correctAnswer,
                },
              },
            }).then(r => {});
          }}
          className="w-full border px-3 py-6 rounded bg-white h-full"
        />
      </div>

      {/* Options */}
      <div>
        <label className="block font-medium mb-2">Options</label>
        {formik.values.options.map((opt, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={opt}
              onChange={(e) => {
                const newOptions = [...formik.values.options];
                newOptions[index] = e.target.value;
                formik.setFieldValue("options", newOptions);
                handleUpdateOption(index, e.target.value).then(r => {});
              }}
              className="flex-1 border px-3 py-3 rounded bg-white"
              placeholder={`Option ${index + 1}`}
            />
            <button
              type="button"
              className="text-red-500"
              onClick={() => handleDeleteOption(index)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={addOption}
        >
          <div className="w-8 h-8 flex items-center justify-center bg-[#387467] rounded-full hover:bg-green-900">
            <Plus size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            Add Option
          </span>
        </div>
      </div>

      {/* Correct Answer */}
      <div>
        <label className="block font-medium mb-1">Correct Answer</label>
        <select
          name="correctAnswer"
          value={formik.values.correctAnswer}
          onChange={(e) => {
            formik.handleChange(e);
            UpdateQuestion({
              variables: {
                questionId: question.id,
                input: {
                  questionText: formik.values.questionText,
                  correctAnswer: e.target.value,
                },
              },
            }).then(r => {});
          }}
          className="w-full border px-3 py-3 rounded bg-white cursor-pointer"
        >
          <option value="" className='bg-white'>Select correct answer</option>
          {formik.values.options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
