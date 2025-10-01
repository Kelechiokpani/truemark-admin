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

const Exam_History_List  =  ({data}) => {
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
      header: "Assignment Id",
      accessor: "assignmentId",
      render: (row: any) => (
        <span title={row.assignmentId}>
          {row.assignmentId ? row.assignmentId.slice(0, 10) : ""}...
        </span>
      ),
    },
    { header: "Assessment score", accessor: "score" },
    {
      header: "Action",
      accessor: "action",
      render: (row: any) => (
        <button
          onClick={() => {
            router.push(`/overview/course/${course?.id}/exam-list/${row?.id}`)
            // setSelectedRow(row);
            // openModal();
          }}
          className="lowercase hover:underline"
        >
          View
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

export default Exam_History_List