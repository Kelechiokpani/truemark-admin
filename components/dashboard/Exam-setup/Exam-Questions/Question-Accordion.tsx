"use client";
import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Update_Question_and_Options from "@/components/dashboard/Exam-setup/Exams-utils/Question/Update";



const Question_Accordion = ({ course, modules }) => {
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [screen, setScreen] = useState(false);


  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };


  return (
     <div>
       <div className="py-8">
        <p className="text-md font-bold">Description:</p>
        <span className="text-sm">{modules?.description}</span>
       </div>


          <div>
           <p className="text-md font-bold">Questions:</p>
           <div id="accordion-flush" className="border border-gray-200 rounded-lg divide-y divide-gray-200 rounded-2xl mt-2">
             {modules?.questions?.map((question, idx) => (
                 <div key={question.id} onClick={() => setSelectedModuleId(question?.id)}>
                 <div className="flex justify-between gap-2">
                   <button
                     type="button"
                     className="px-8 flex items-center bg-gray-300 justify-between w-full py-3 font-medium text-gray-700 gap-3"
                     onClick={() => toggle(question.id)}
                   >
                     {/*<span className="text-xs"> {idx + 1}. {question.questionText}</span>*/}
                     <span className="text-xs"> Question {idx + 1}. </span>

                     <div className="flex gap-4">
                       <svg
                         className={`w-3 h-3 mt-2 transition-transform ${
                           openId === question.id ? " " : "rotate-180"
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
                 {openId === question.id && (
                   <div className="text-gray-500 p-4">
                     <div className="text-md font-semibold px-4"> {idx + 1}. {question.questionText}</div>

                     {openId && screen ? (
                       <div className='pt-8 px-6'>
                         <div className="flex  justify-between mb-4 ">
                           <h1 className="font-bold ">Update Question and Options</h1>
                           <button
                             onClick={() => setScreen(false)}
                             type="button"
                             className="inline-flex items-center justify-center rounded-2xl   text-white font-semibold   shadow-md px-4  bg-[#387467] text-white py-1  disabled:opacity-60"
                           > close form
                           </button>
                         </div>
                         <Update_Question_and_Options question={question} />
                       </div>
                     ) : (
                       <div className="px-6 space-y-8">
                         <div className="flex justify-end">
                           <button
                             className=" flex py-1 text-sm gap-1  rounded-lg hover:bg-gray-100 text-[#387467] font-bold px-4"
                             title="Update"
                             onClick={() => setScreen(true)}
                           >
                             <Edit size={18} /> update
                           </button>

                         </div>
                         <div className="space-y-4">
                           {question.options.map((opt) => (
                             <label key={opt.id}
                                    className="flex items-center gap-2 text-sm">
                               <input type="checkbox"
                                      disabled
                                      className="w-4 h-4"
                                      checked={opt.optionText === question.correctAnswer}
                               />
                               {/*{opt.optionText}*/}
                               <span className="gap-6">
                                    {opt.optionText}{" "}
                                 {opt.optionText === question.correctAnswer && (
                                   <span className="text-[#387467] ml-2 font-medium">
                                           (Correct Answer)
                                      </span>
                                 )}
                                  </span>
                             </label>
                           ))}
                         </div>
                       </div>
                     )}


                   </div>
                 )}
                 </div>
             ))}
           </div>
          </div>


     </div>
  );
};

export default Question_Accordion;
