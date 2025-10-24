'use client'
import Accordion from "@/components/dashboard/Course/Accordion";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/components/hooks/useModal";
import Create_Module from "@/components/dashboard/Course/course/module/CreateModule";
import { useCourseStore } from "@/store/useCourseStore";
import { useQuery } from "@apollo/client/react";
import { GET_ASSESSMENTS, GET_COURSES_MODULES } from "@/lib/Query/queries";
import CenteredLoader from "@/components/utility/Loader";
import EmptyContainer from "@/components/utility/EmptyContainer";
import { Plus, Eye } from "lucide-react";
import Link from "next/link";

const empty_details = {
  title: "Your course Module List is empty",
  description: "Looks like you haven’t added any courses module yet.",
  callToAction: "Add New Courses Module",
}


const CourseModules = () => {
  const course = useCourseStore((s) => s.selectedCourse);
  const params = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const id = params?.courseId  || course?.id


  const { data, loading, error} = useQuery(GET_COURSES_MODULES, {
    fetchPolicy: "cache-and-network",
    variables:{courseId:id},
    // fetchPolicy: 'network-only',
  }) as any;


  const { data:quiz, loading:quizLoading} = useQuery(GET_ASSESSMENTS, {
    variables:{courseId:id},
    fetchPolicy: "cache-and-network",
    // fetchPolicy: 'network-only',
  }) as any;


  const handleRoute = () => {
    router.push(`/overview/course/course-details/assessment-setup`)
    // router.push(`/overview/course/${id}/assessment-setup`)
   }

    return (
      <div className="p-6">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          ← Back
        </button>

        <header className="bg-[#387467] text-white px-6 py-8 rounded-md  flex justify-between mt-2">
          <h1 className="text-3xl font-bold">Course Modules</h1>
          {/*<h1 className="text-1xl font-bold">{data?.getCourseModules?.name}</h1>*/}
          <div className="gap-4 flex">
            <button
              onClick={openModal}
              className="bg-[#ffff] text-black px-5 py-2 flex rounded-md hover:bg-gray-300"
            >
              <Plus size={16} className="mt-1 mr-2" />
              Add Module
            </button>
          </div>
        </header>

        <div className="py-6 px-6 flex justify-between gap-6">
          <h1 className="text-1xl font-bold mt-2">Course Assessment</h1>
          {quizLoading ? (<div>Loading....</div>) : (
            <div className="flex gap-6 uppercase">
              {quiz?.getAssignmentByCourseId ? (
                  <Link href={`/overview/course/course-details/assessment`}>
                    {/*<Link href={`/overview/course/${id}/assessment`}>*/}
                    <button
                      className="lowercase bg-[#387467] flex text-white text-sm  px-4 py-2 rounded-md ">
                      <Eye size={16} className="mt-0.5 mr-2" /> View assessment
                    </button>
                  </Link>
              ) : (
                <button
                  onClick={handleRoute}
                  className=" lowercase bg-[#387467] flex text-white px-4 py-2 rounded-md text-sm ">
                  <Plus size={16} className="mt-0.5 mr-2" />Add assessment
                </button>
              )}


            </div>
          )}

        </div>

        <div className="py-6 px-6">
          {course?.description}
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px] w-full">
          <CenteredLoader />
          </div>
        ) : data?.getCourseModules.length === 0 ? (
          <EmptyContainer
            title={empty_details.title}
            description={empty_details.description}
          />
        ) : (
          <Accordion course={course} modules={data?.getCourseModules} />
        )}


        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <Create_Module onClose={closeModal} isOpen={isOpen} course={course} />
        </Modal>
      </div>
    )
}
export default CourseModules;