"use client";
import React from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { useParams, useRouter } from "next/navigation";
import Question_Accordion from "@/components/dashboard/Exam-setup/Exams/Exam-Questions/Question-Accordion";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";


export default function QuestionList({data}) {

  const course = useCourseStore((s) => s.selectedCourse);
  const params = useParams();
  const router = useRouter();
  const id = params?.courseId  || course?.id

  return (
    <div>
      <div className='flex justify-between mt-3'>
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          ← Back
        </button>

        {/*<Link href={`/overview/course/${id}/assessment/assessment-history`}>*/}

        <Link
            href={{
              pathname: `/overview/course/${id}/assessment/assessment-history`,
              query: { dataId: data?.id },
            }}
          >
          <button
            className="lowercase bg-[#387467] flex text-white text-sm  px-4 py-2 rounded-md ">
            <Eye size={16} className="mt-0.5 mr-2" /> assessment history
          </button>
        </Link>
      </div>

      <header className="bg-[#387467] text-white px-6 py-8 rounded-md">
        <h1 className="text-2xl font-bold capitalize">{data?.title}</h1>
      </header>

      <div className="flex gap-2 justify-end mt-3">
        <button
          className="p-2 rounded-lg hover:bg-gray-100 text-yellow-600"
          title="Edit"
        >
          <Edit size={22} />
        </button>

        <button
          className="p-2 rounded-lg hover:bg-gray-100 text-red-600"
          title="Delete"
        >
        <Trash2 size={22} />
        </button>
      </div>

      <div className="flex-1  bg-white shadow rounded-lg p-8 mt-8 shadow-md border">
        <Question_Accordion course={course} modules={data} />
      </div>


    </div>
  );
}
