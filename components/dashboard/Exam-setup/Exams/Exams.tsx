import { useQuery } from "@apollo/client/react";
import { GET_CUSTOMERS_ASSESSMENT } from "@/lib/Query/queries";
import CenteredLoader from "@/components/utility/Loader";
import EmptyContainer from "@/components/utility/EmptyContainer";
import React from "react";
import Exam_AssessmentList from "@/components/dashboard/Exam-setup/Exams/Exam-List";
import { useCourseStore } from "@/store/useCourseStore";
import { useParams, useRouter } from "next/navigation";

const empty_details = {
  title: "Exam Assessment List Is Empty",
  description: "Looks like admin have not added any assessment yet !!.",
}

const Exams_Assessment = ()=> {
  const course = useCourseStore((s) => s.selectedCourse);
  const params = useParams();
  const router = useRouter();

  const { data, loading, error} = useQuery(GET_CUSTOMERS_ASSESSMENT, {
    variables:{courseId:params?.courseId},
    fetchPolicy: "cache-and-network",
    // fetchPolicy: 'network-only',
  }) as any;


  return(
    <div>

      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        ← Back
      </button>
      <header className="bg-[#387467] text-white px-6 py-8 rounded-md">
        <h1 className="text-3xl font-bold">True mark Assessment</h1>
      </header>

        <div>
          {loading ? (
            <div className="flex items-center justify-center min-h-[300px] w-full">
              <CenteredLoader />
            </div>
          ) : data?.getAssignmentsByCourseId?.length === 0 ? (
            <EmptyContainer
              title={empty_details.title}
              description={empty_details.description}
            />
          ) : (
            <Exam_AssessmentList data={data?.getAssignmentsByCourseId} />
          )}
        </div>


    </div>
)
}


export default Exams_Assessment