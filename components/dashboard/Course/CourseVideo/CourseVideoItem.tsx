"use client";
import { CourseList } from "@/types/blog";
import HlsVideoPlayer from "@/components/utility/VideoPlayer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/components/hooks/useModal";
import Update_Lesson from "@/components/dashboard/Course/course/lesson/UpdateLesson";
import Delete_Lesson from "@/components/dashboard/Course/course/lesson/DeleteLesson";


const CourseVideoItem = ({ courseListing, module }: { courseListing: CourseList, module:any }) => {
  const {image,  video, name, price, id, description } = courseListing;

  const { isUpdate,  openUpdate, closeUpdate,  isDelete, openDelete, closeDelete  } = useModal();


  return (
        <div className=" overflow-hidden  transition cursor-pointer">
             <div className="w-full aspect-video bg-transparent relative">
              <HlsVideoPlayer
                poster={module?.image}
                src={video}
                autoPlay={false}
                controls={true}
                width="100%"
                height="100%"
                hlsConfig={{
                  maxLoadingDelay: 4,
                  minAutoBitrate: 0,
                  lowLatencyMode: true
                }}
              />
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <button className="absolute top-2 right-2 bg-[#387467] p-1 rounded-full shadow text-white">
                     <MoreVertical size={18} />
                   </button>
                 </DropdownMenuTrigger>

                 <DropdownMenuContent align="end" className="w-32 ">
                   <DropdownMenuItem className="hover:bg-gray-300 "
                                     onClick={openUpdate}
                   >
                     <Pencil size={16} className="mr-2 text-blue-500" /> edit video
                   </DropdownMenuItem>

                   <DropdownMenuItem className="hover:bg-red-100 mt-3"
                                     onClick={openDelete}
                   >
                     <Trash2 size={16} className="mr-2 text-red-500" /> delete video
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
          </div>

            <div className="p-4 shadow-sm hover:shadow-md border">
              <p className="font-bold capitalize ">{name}</p>
              <span className=" text-xs">{description}</span>
              {/*<span className="font-semibold line-clamp-2">{description}</span>*/}
           </div>


    {/*Update_Lesson */}
        <div>
          <Modal isOpen={isUpdate} onClose={closeUpdate} className="max-w-[700px] m-4">
            <Update_Lesson onClose={closeUpdate} isOpen={isUpdate} courseListing={courseListing}  />
          </Modal>
        </div>

          <div>
            <Modal isOpen={isDelete} onClose={closeDelete} className="max-w-[700px] m-4">
              <Delete_Lesson isOpen={isDelete} onClose={closeDelete} courseListing={courseListing} />
            </Modal>
          </div>
    </div>
  )

};

export default CourseVideoItem;
