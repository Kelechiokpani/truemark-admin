"use client";
import React, { useMemo, useState } from "react";
import EmptyContainer from "@/components/utility/EmptyContainer";
import { useQuery } from "@apollo/client/react";
import { GET_COURSES_LESSONS } from "@/lib/Query/queries";
import CenteredLoader from "@/components/utility/Loader";
import CourseVideoItem from "@/components/dashboard/Course/CourseVideo/CourseVideoItem";


const empty_details = {
  title: "Your course List is empty",
  description: "Looks like you haven’t added any courses yet.",
  callToAction: "Add New Courses",
  to:"/overview/course"
}

export default function CourseVideoListing({id, module}) {

  const { data, loading, error} = useQuery(GET_COURSES_LESSONS, {
    fetchPolicy: "cache-and-network",  variables:{moduleId:id},
    // fetchPolicy: 'network-only',
  }) as any;

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    let List: any = data?.getCourseLessions || [];

    if (searchTerm.trim() !== "") {
      List = List.filter((c: any) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return List;
  }, [searchTerm, data]);

  return (
    <div className=" bg-white">
      <div className="px-6 py-8 max-w-7xl mx-auto">

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px] w-full">
            <CenteredLoader/>
          </div>
        ) : filteredCourses.length === 0 ? (
          <EmptyContainer
            title={empty_details.title}
            description={empty_details.description}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((post, key) => (
              <CourseVideoItem key={key} courseListing={post} module={module} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}



