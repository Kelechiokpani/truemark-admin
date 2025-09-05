'use client'
import Accordion from "@/components/dashboard/Course/Accordion";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/components/hooks/useModal";
import Create_Module from "@/components/dashboard/Course/course/module/CreateModule";
import { useCourseStore } from "@/store/useCourseStore";
import { useQuery } from "@apollo/client/react";
import { GET_COURSES_MODULES } from "@/lib/Query/queries";
import CenteredLoader from "@/components/utility/Loader";
import EmptyContainer from "@/components/utility/EmptyContainer";
import CourseItem from "@/components/dashboard/Course/CourseItem";

const empty_details = {
  title: "Your course Module List is empty",
  description: "Looks like you haven’t added any courses module yet.",
  callToAction: "Add New Courses Module",
}


const CourseModules = () => {
  const course = useCourseStore((s) => s.selectedCourse);
  const params = useParams();

  const { data, loading, error} = useQuery(GET_COURSES_MODULES, {
    fetchPolicy: "cache-and-network",
    variables:{courseId:params?.id},
    // fetchPolicy: 'network-only',
  }) as any;

  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();


    return (
      <div>
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          ← Back
        </button>

        <header className="bg-[#387467] text-white px-6 py-8  rounded-lg  flex justify-between mt-2">
          <h1 className="text-3xl font-bold">Course Modules</h1>
          {/*<h1 className="text-1xl font-bold">{data?.getCourseModules?.name}</h1>*/}
          <button
            onClick={openModal}
            className="bg-[#ffff] text-black px-6 py-2  rounded-2xl hover:bg-gray-300"
          >
            Add Module
          </button>
        </header>

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px] w-full">
            <CenteredLoader/>
          </div>
        ) : data?.getCourseModules.length === 0 ? (
          <EmptyContainer
            title={empty_details.title}
            description={empty_details.description}
          />
        ) : (
          <Accordion course={course} modules={data?.getCourseModules}/>
        )}

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <Create_Module onClose={closeModal} isOpen={isOpen} course={course} />
        </Modal>

      </div>
    )
}
export default CourseModules;