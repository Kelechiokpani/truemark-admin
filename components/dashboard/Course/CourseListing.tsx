"use client";
import React, { useMemo, useState } from "react";
import CourseItem from "@/components/dashboard/Course/CourseItem";
import { Search } from "lucide-react";
import EmptyContainer from "@/components/utility/EmptyContainer";
import { useModal } from "@/components/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Create_Course from "@/components/dashboard/Course/course/course/CreateCourse";
import { useQuery } from "@apollo/client/react";
import { GET_COURSES } from "@/lib/Query/queries";
import CenteredLoader from "@/components/utility/Loader";


const empty_details = {
  title: "Your course List is empty",
  description: "Looks like you haven’t added any courses yet.",
  callToAction: "Add New Courses",
  to:"/overview/course"
}

export default function CourseListing() {
  const { data, loading, error} = useQuery(GET_COURSES, {
    fetchPolicy: "cache-and-network",
  }) as any;


  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, openModal, closeModal } = useModal();


  const filteredCourses = useMemo(() => {
    let List: any = data?.getCourses || [];

    if (searchTerm.trim() !== "") {
      List = List.filter((c: any) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return List;
  }, [searchTerm, data]);

  return (
    <div className="bg-white w-full px-6">
      {/* Header */}
      <header className="bg-[#387467] text-white px-6 py-8  rounded-md  flex justify-between">
        <h1 className="text-3xl font-bold">Certification Courses</h1>
        <button
          onClick={openModal}
          className="bg-[#ffff] text-black px-6  rounded-md hover:bg-gray-300"
        >
          Add Course
        </button>
      </header>

      <div className=" py-8 max-w-7xl mx-auto">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-end items-center mb-6 gap-4">

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search courses"
              className="w-full border rounded-lg px-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-500"
              size={20}
            />
          </div>
        </div>

       <div className="w-full">
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
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
             {filteredCourses.map((post, key) => (
               <CourseItem key={key} courseListing={post} />
             ))}
           </div>
         )}
       </div>

      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <Create_Course onClose={closeModal} isOpen={isOpen} />
      </Modal>
    </div>
  );
}



