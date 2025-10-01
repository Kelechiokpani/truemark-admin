'use client'
import {ListIcons} from "@/public/assets/icons";
import React, {useEffect, useMemo, useState} from "react";
import { SearchInput } from "@/components/utility/SearchInput";
import { useDebouncedValue } from "@/components/utility/useDebouncedSearch";
import { Pagination } from "@/components/utility/Pagination";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/components/hooks/useModal";
import BaseTable from "@/components/utility/Base-Table";
import DetailsCard from "@/components/dashboard/customer_Enquiry/details";
import { useCourseStore } from "@/store/useCourseStore";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";



const Exam_AssessmentList  =  ({data}) => {
  const course = useCourseStore((s) => s.selectedCourse);
  const params = useParams();
  const router = useRouter();

  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { isOpen, openModal, closeModal,  isDelete, openDelete, closeDelete  } = useModal();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);


  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return data;
    return data.filter((contact:any) =>
      contact?.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [data, debouncedSearchTerm]);


  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);


  const ITEMS_PER_PAGE = 20;
  const totalItems = data?.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedList = filteredData?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optional: Scroll to top of table
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns = [
    { header: "#", accessor: "icon",
      render: () => <span>{ListIcons.dashboard}</span>,
    },
    {
      header: "Course Id",
      accessor: "courseId",
      render: (row: any) => (
        <span title={row.courseId}>
          {row.courseId ? row.courseId.slice(0, 10) : ""}...
        </span>
      ),
    },
    { header: "Assessment title", accessor: "title" },
    {
      header: "View Question",
      accessor: "action",
      render: (row: any) => (
        <button
          onClick={() => {
            router.push(`/overview/course/${course?.id}/exam-list/${row?.id}`)
            // setSelectedRow(row);
            // openModal();
          }}
          className="text-[#387412] lowercase hover:underline flex gap-2"
        >
          Assessment
          <ArrowRight size={15} className="font-bold mt-1" />
        </button>
      ),
    },
    {
      header: "View Submission",
      accessor: "action",
      render: (row: any) => (
        <button
          onClick={() => {
            router.push(`/overview/course/${course?.id}/exam-list/${row?.id}/exam-submission`)
            // setSelectedRow(row);
            // openModal();
          }}
          className="text-[#387467] flex gap-2  lowercase hover:underline"
        >
          Submission
          <ArrowRight size={15} className="font-bold mt-1" />
        </button>
      ),
    },
  ];


  return (
    <div>
      <div className="p-4 min-h-screen">
        <div className="flex flex-col md:flex-row justify-end items-center gap-4 mb-6">
          <div className="w-full md:w-1/3">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name"
            />
          </div>
        </div>
        <BaseTable columns={columns} data={paginatedList}/>

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of {totalItems} contacts
            {debouncedSearchTerm && ` matching "${debouncedSearchTerm}"`}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <div>

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px]">
          <DetailsCard selected={selectedRow}/>
        </Modal>

      </div>

    </div>

  )
}

export default Exam_AssessmentList