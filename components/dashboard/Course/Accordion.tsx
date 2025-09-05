"use client";
import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import Create_Lesson from "@/components/dashboard/Course/course/lesson/CreateLesson";
import { useModal } from "@/components/hooks/useModal";
import CourseVideoListing from "@/components/dashboard/Course/CourseVideo/CourseVideoListing";
import Update_Module from "@/components/dashboard/Course/course/module/UpdateModule";
import {  Pencil, Trash2 } from "lucide-react";
import Delete_Module from "@/components/dashboard/Course/course/module/DeleteModule";


 const Accordion =({course, modules})=> {
   const [id, setId] = useState('')
   const { isOpen, openModal, closeModal, isUpdate, openUpdate, closeUpdate, isDelete, openDelete, closeDelete  } = useModal();

   const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => {
      setOpenId(openId === id ? null : id);
     };


  return (
    <div>

      <div
        id="accordion-flush"
        className="border border-gray-200 rounded-lg divide-y divide-gray-200 rounded-2xl mt-2"
      >
        {modules?.map((module: any) => (
          <div key={module?.id}
               onClick={() => setId(module?.id)}
               className="">
            <div className="flex justify-between gap-2">
              <button
                type="button"
                className="px-8 flex items-center bg-gray-300 justify-between w-full py-4 font-medium text-gray-700 gap-3"
                onClick={() => toggle(module?.id)}
              >
                <span>{module?.name}</span>
                <div>
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      openId === module?.id ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </div>
              </button>

            </div>

            {openId === module?.id && (
              <div className="text-gray-500 dark:text-gray-400">
                <div className="flex py-8 px-4 justify-end">
                  {/*<h3 className="font-bold capitalize">{module?.name}</h3>*/}
                  <div className="flex justify-end gap-6">
                    <button
                      onClick={openModal}
                      className="bg-[#387467] text-white px-6 py-2   rounded-lg"
                    >
                      Add Lesson
                    </button>

                    <button className="hover:bg-gray-300 text-blue-500 bg-gray-300 px-3 py-2 flex rounded-lg"
                            onClick={openUpdate}
                    >
                      <Pencil size={16} className="mt-1 mr-2 text-blue-500" /> edit module
                    </button>
                    <button className="hover:bg-red-300 bg-red-200 px-3 text-red-600  py-2 flex rounded-lg"
                      onClick={openDelete}
                    >
                      <Trash2 size={16} className="mt-1 mr-2 text-red-600" /> delete module
                    </button>
                  </div>

                </div>
                <CourseVideoListing id={id} module={module} />
                <div className="flex justify-start bg-gray-200 py-8 px-3">
                  <span className=" capitalize">{module?.description}</span>
                </div>

                <div>
                  <Modal isOpen={isUpdate} onClose={closeUpdate} className="max-w-[700px] m-4">
                    <Update_Module isOpen={isUpdate} onClose={closeUpdate} course={course} module={module} />
                  </Modal>
                </div>


                {/*delete module*/}
                <div>
                  <Modal isOpen={isDelete} onClose={closeDelete} className="max-w-[700px] m-4">
                    <Delete_Module isOpen={isDelete} onClose={closeDelete} course={course} module={module} />
                  </Modal>
                </div>

              </div>
            )}



            {/*create new lesson*/}
            <div>
              <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <Create_Lesson onClose={closeModal} isOpen={isOpen} modules={module} />
              </Modal>
            </div>


          </div>


        ))}

      </div>


    </div>

  );
 }

export default Accordion