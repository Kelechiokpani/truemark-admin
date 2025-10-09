import { useQuery } from "@apollo/client/react";
import { GET_ASSESSMENTS } from "@/lib/Query/queries";
import CenteredLoader from "@/components/utility/Loader";
import EmptyContainer from "@/components/utility/EmptyContainer";
import React from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { useParams, useRouter } from "next/navigation";
import QuestionList from "@/components/dashboard/Exam-setup/Exams/Exam-Questions/Question-List";

const empty_details = {
  title: "Exam Assessment List Is Empty",
  description: "Looks like admin have not added any assessment yet !!.",
}


const Exams_Assessment = ()=> {
  const course = useCourseStore((s) => s.selectedCourse);
  const params = useParams();
  const router = useRouter();

  const id = params?.courseId  || course?.id

  const { data, loading, error} = useQuery(GET_ASSESSMENTS, {
    variables:{courseId:id},
    fetchPolicy: "cache-and-network",
    // fetchPolicy: 'network-only',
  }) as any;


  return(
    <div>

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
            <QuestionList data={data?.getAssignmentByCourseId} />
            // <Exam_AssessmentList data={data?.GetAssignmentByCourseId} />
          )}
        </div>


    </div>
)
}


export default Exams_Assessment