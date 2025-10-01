"use client";
import React, { useState } from "react";
import CenteredLoader from "@/components/utility/Loader";
import EmptyContainer from "@/components/utility/EmptyContainer";
import { useCourseStore } from "@/store/useCourseStore";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { GET_ASSESSMENT } from "@/lib/Query/queries";
import Question_Accordion from "@/components/dashboard/Exam-setup/Exams/Exam-Questions/Question-Accordion";



const empty_details = {
  title: "Your course Assessment List is empty",
  description: "Looks like you haven’t added any courses Assessment yet.",
  callToAction: "Add New Courses Module",
}


export default function HistoryDetails() {

  const course = useCourseStore((s) => s.selectedCourse);
  const params = useParams();
  const router = useRouter();

  const { data, loading, error} = useQuery(GET_ASSESSMENT, {
    variables:{assignmentId:params?.id},
    fetchPolicy: "cache-and-network",
    // fetchPolicy: 'network-only',
  }) as any;


  return (
    <div>
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        ← Back
      </button>
      <header className="bg-[#387467] text-white px-6 py-8 rounded-md">
        <h1 className="text-2xl font-bold capitalize">{data?.getAssignment?.title}</h1>
      </header>

     <div className="flex-1  bg-white shadow rounded-lg p-8 mt-8 shadow-md border">
       {loading ? (
         <div className="flex items-center justify-center min-h-[300px] w-full">
           <CenteredLoader />
         </div>
       ) : data?.getAssignment?.length === 0 ? (
         <EmptyContainer
           title={empty_details.title}
           description={empty_details.description}
         />
       ) : (
         <Question_Accordion course={course} modules={data?.getAssignment} />
       )}
     </div>


    </div>
  );
}
