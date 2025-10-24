"use client";
import React from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { useParams, useRouter } from "next/navigation";
import Question_Accordion from "@/components/dashboard/Exam-setup/Exam-Questions/Question-Accordion";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useModal } from "@/components/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Delete_Assessment from "@/components/dashboard/Exam-setup/Exams-utils/assessment/Delete";
import Update_Assessment from "@/components/dashboard/Exam-setup/Exams-utils/assessment/Update";


export default function QuestionList({data}) {
  const { isOpen, openModal, closeModal,  isDelete, openDelete, closeDelete  } = useModal();
  const course = useCourseStore((s) => s.selectedCourse);
  const { setSelectedAssessment, selectedAssessment} = useCourseStore()

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
        <Link
          onClick={()=> setSelectedAssessment(data)}
            href={{
              pathname:`/overview/course/course-details/assessment/assessment-history`,
              // pathname:`/overview/course/${id}/assessment/assessment-history`,
              // query: { dataId: data?.id },
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

      <div className="flex gap-2 justify-between mt-3 px-4 gap-4">
     <h1 className='mt-2 font-bold'> Assessment</h1>
        <div className='flex '>
          <button
            className="p-2 flex px-4 text-sm  gap-1 rounded-lg hover:bg-gray-100 text-gray-600"
            title="Edit"
            onClick={openModal}
          >
            <Edit size={22} />update assessment
          </button>

          <button
            className="p-2 flex px-4 text-sm gap-1 rounded-lg hover:bg-gray-100 text-red-600"
            title="Delete"
            onClick={openDelete}
          >
            <Trash2 size={21} />delete assessment
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white shadow rounded-lg p-8 mt-4 shadow-md border">
        <Question_Accordion course={course} modules={data} />
      </div>


      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <Update_Assessment onClose={closeModal} isOpen={isOpen} Assessment={data} />
      </Modal>

      <div>
        <Modal isOpen={isDelete} onClose={closeDelete} className="max-w-[700px]">
          <Delete_Assessment isOpen={isDelete} onClose={closeDelete} Assessment={data} />
        </Modal>
      </div>

    </div>
  );
}
