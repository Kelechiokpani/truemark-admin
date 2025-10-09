import { useQuery } from "@apollo/client/react";
import { GET_USER_SUBMISSION } from "@/lib/Query/queries";
import CenteredLoader from "@/components/utility/Loader";
import EmptyContainer from "@/components/utility/EmptyContainer";
import React from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Exam_History_List from "@/components/dashboard/Exam-setup/Exam-Submission/Exam-History-List";


const empty_details = {
  title: "Assessment Submission is empty",
  description: "Looks like users haven’t Submitted any Assessment Yet!!.",
}


const Course_Exams_History = ()=> {
  const course = useCourseStore((s) => s.selectedCourse);
  const params = useParams();
  const router = useRouter();
  const id = params?.courseId  || course?.id

  const searchParams = useSearchParams();
  const dataId = searchParams.get("dataId");

  const { data, loading, error} = useQuery(GET_USER_SUBMISSION, {
    variables:{assignmentId:dataId},
    fetchPolicy: "cache-and-network",
    // fetchPolicy: 'network-only',
  }) as any;

  console.log(data, "data......");

  return(
    <div>
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        ← Back
      </button>
      <header className="bg-[#387467] text-white px-6 py-8 rounded-md">
        <h1 className="text-2xl font-bold">Course Assessment Submission History</h1>
      </header>

        <div>
          {loading ? (
            <div className="flex items-center justify-center min-h-[300px] w-full">
              <CenteredLoader />
            </div>
          ) : data?.getAssignmentByCourseId?.length === 0 ? (
          // ) : data?.getAssignmentSubmissionsByAssignmentId?.length === 0 || "undefined" ? (
            <EmptyContainer
              title={empty_details.title}
              description={empty_details.description}
            />
          ) : (
            <Exam_History_List data={data?.getAssignmentSubmissionsByAssignmentId} />
          )}
        </div>


    </div>
)
}


export default Course_Exams_History