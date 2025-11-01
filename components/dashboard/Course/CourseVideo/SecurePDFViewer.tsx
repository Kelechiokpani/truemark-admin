"use client";
import React, { useEffect, useRef, useState } from "react";
import { useModal } from "@/components/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { CourseList } from "@/types/blog";
import dynamic from "next/dynamic";







const SecurePDFViewer = ({ courseListing, module }: { courseListing: CourseList, module:any }) => {
  const {image,  video, name, price, id, description } = courseListing;
  const [error, setError] = useState(false);
  const {isOpen, openModal, closeModal , isUpdate,  openUpdate, closeUpdate,  isDelete, openDelete, closeDelete  } = useModal();


  const handleOpenPdf = () => {
    const pdfUrl = video; // Replace with the actual path to your PDF
    const newWindow = window.open('', '_blank'); // Open a new blank tab

    if (newWindow) {
      // Create a div and append the PdfViewer component to it
      const container = newWindow.document.createElement('div');
      newWindow.document.body.appendChild(container);

      // Render the PdfViewer component into the container
      newWindow.document.title = name; // Set the new tab's title
      newWindow.document.body.style.margin = '0'; // Remove default body margin
      newWindow.document.body.style.overflow = 'hidden'; // Hide body overflow

      // You would typically use ReactDOM.render here, but for simplicity
      // and to avoid needing a full React environment in the new window,
      // we'll directly inject the iframe.
      container.innerHTML = `<iframe src="${pdfUrl}" width="100%" height="100%" style="border: none;" title="PDF Viewer"></iframe>`;
    }
  };

  return (
    <div className="border p-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-all relative">

      {/*<p className="font-medium mb-3 text-gray-800 truncate">{name}</p>*/}

      <div className="flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="34"
          height="34"
          fill="currentColor"
          className="text-red-600"
        >
          <path
            d="M6 4h24l12 12v28a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm26 2H6v36h36V18H32V6zM17 34v-9h3a3 3 0 0 1 0 6h-1v3h-2zm7 0v-9h4a2.5 2.5 0 1 1 0 5h-2v4h-2zm7 0v-9h6v2h-4v2h3v2h-3v3h-2zm-4-7h2a.5.5 0 0 0 0-1h-2v1zm-8-2v3h1a1.5 1.5 0 0 0 0-3h-1z" />
        </svg>

        <p className="font-medium text-gray-800 text-sm truncate">{name}</p>

      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute top-2 right-2 bg-[#387467] p-1 rounded-full shadow text-white">
            <MoreVertical size={18} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-32 ">
          <DropdownMenuItem className="hover:bg-gray-300" onClick={openUpdate}
          >
            <Pencil size={16} className="mr-2 text-blue-500" /> edit
          </DropdownMenuItem>

          <DropdownMenuItem className="hover:bg-red-100 mt-3"
                            onClick={openDelete}
          >
            <Trash2 size={16} className="mr-2 text-red-500" /> delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <button
        // onClick={openModal}
        onClick={handleOpenPdf}
        className="bg-[#387467] text-white px-6 py-1 rounded-md hover:bg-[#1f2937] transition mt-4"
      >
        Open Course
      </button>


      {/*<Modal isOpen={isOpen} onClose={closeModal} className="max-w-6xl m-4">*/}
      {/*  <div className="bg-white rounded-lg overflow-hidden shadow-lg">*/}

      {/*    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">*/}
      {/*      <h2 className="font-semibold text-md text-gray-900">{name}</h2>*/}
      {/*    </div>*/}


      {/*    <div className="p-4">*/}
      {/*            <PdfViewerClient file={video}/>*/}
      {/*      <embed*/}
      {/*        // src={video}*/}
      {/*        src={`/api/proxy-file?url=${encodeURIComponent(video)}`}*/}
      {/*        type="application/pdf"*/}
      {/*        width="100%"*/}
      {/*        height="900px"*/}
      {/*        onError={() => setError(true)}*/}
      {/*        className="rounded-md border"*/}
      {/*        style={{ pointerEvents: "auto" }}*/}
      {/*      />*/}


      {/*      <iframe*/}
      {/*        src={`/api/proxy-file?url=${encodeURIComponent(video)}`}*/}
      {/*        width="100%"*/}
      {/*        height="900"*/}
      {/*        className="rounded-md border"*/}
      {/*        style={{ pointerEvents: "auto" }}*/}
      {/*        sandbox="allow-same-origin allow-scripts allow-popups"*/}
      {/*        onError={() => setError(true)}*/}
      {/*      />*/}


      {/*      <iframe*/}
      {/*        // src={`${video}#toolbar=0`}*/}
      {/*        src={`${video}#toolbar=0&navpanes=0&scrollbar=0`}*/}
      {/*        width="100%"*/}
      {/*        height="600px"*/}
      {/*        className="rounded-md border"*/}
      {/*        sandbox="allow-scripts allow-same-origin"*/}
      {/*        style={{ pointerEvents: "auto" }}*/}
      {/*        onError={() => setError(true)}*/}
      {/*      ></iframe>*/}

      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Modal>*/}


    </div>
  )
    ;
};

export default SecurePDFViewer;
