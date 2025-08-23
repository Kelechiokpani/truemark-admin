"use client";
import React, { useState, useMemo } from "react";
import { Search, MoreVertical } from "lucide-react";
import CourseItem from "@/components/dashboard/Course/CourseItem";
import CertificationData from "@/components/data/CertificationData";

const tabs = ["All courses", "My Learning", "Certifications"];

const categories = [
  "All",
  "Quality, Health & Environment Mgt",
  "Info. Tech Mgt",
  "Cyber & Privacy",
  "Business Management",
  "MS Audit",
];

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState("All courses");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // filtering logic
  const filteredCourses = useMemo(() => {
    let data = CertificationData;

    // filter by tab
    if (activeTab === "My Learning") {
      data = data.filter((c) => c.status === "paid");
      // data = data.slice(0, 5);
    } else if (activeTab === "Certifications") {
      data = []; // show all certs
    }

    // filter by category
    if (activeCategory !== "All") {
      data = data.filter((c) => c.category === activeCategory);
    }

    // filter by search term
    if (searchTerm.trim() !== "") {
      data = data.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return data;
  }, [activeTab, activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#387467] text-white px-6 py-8 rounded-lg">
        <h1 className="text-3xl font-bold">Overview</h1>
        <nav className="flex flex-wrap mt-8 space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 border-b-2 transition ${
                activeTab === tab
                  ? "border-white font-semibold"
                  : "border-transparent hover:border-gray-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-3 items-center">
            <select
              className="border px-3 py-2 rounded-lg"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {categories.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>

            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchTerm("");
              }}
              className="text-purple-600 text-sm"
            >
              Reset
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search my courses"
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

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No courses found.
            </p>
          ) : (
            filteredCourses.map((post, key) => (
              <CourseItem key={key} courseListing={post} />
            ))
            // filteredCourses.map((course, i) => (
            //   <div
            //     key={course._id || i}
            //     className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            //   >
            //     <div className="relative">
            //       <Image
            //         src={
            //           activeTab === "Certifications"
            //             ? cert2 // use random static image for Certifications
            //             : course.mainImage
            //         }
            //         alt={course.title}
            //         className="w-full h-40 object-cover"
            //         width={400}
            //         height={160}
            //       />
            //       <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
            //         <MoreVertical size={18} />
            //       </button>
            //     </div>
            //     <div className="p-4">
            //       <h3 className="font-semibold line-clamp-2">{course.title}</h3>
            //       {course.metadata && (
            //         <p className="text-sm text-gray-600">{course.metadata}</p>
            //       )}
            //     </div>
            //   </div>
            // ))
          )}
        </div>
      </main>
    </div>
  );
}


