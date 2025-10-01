"use client";
import React, { useState } from "react";



const Question_Accordion = ({ course, modules }) => {
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
     <div>
       <div className="py-8">
        <p className="text-md font-bold">Description:</p>
        <span className="text-sm">{modules?.description}</span>
      </div>
       <p className="text-md font-bold">Questions:</p>
       <div id="accordion-flush" className="border border-gray-200 rounded-lg divide-y divide-gray-200 rounded-2xl mt-2">
        {modules?.questions?.map((module, idx) => (
          <div key={module.id} onClick={() => setSelectedModuleId(module?.id)}>
            {/* Accordion Header */}
            <div className="flex justify-between gap-2">
              <button
                type="button"
                className="px-8 flex items-center bg-gray-300 justify-between w-full py-4 font-medium text-gray-700 gap-3"
                onClick={() => toggle(module.id)}
              >
                <span className="text-xs"> {idx + 1}. {module.questionText}</span>
                <svg
                  className={`w-3 h-3 transition-transform ${
                    openId === module.id ? "rotate-180" : ""
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
              </button>
            </div>

            {openId === module.id && (
              <div className="text-gray-500 p-4">
                <div className="px-6 space-y-8">
                  <div className="space-y-4">
                    {module.options.map((opt) => (
                      <label key={opt.id}
                             className="flex items-center gap-2 text-sm">
                        <input type="checkbox" disabled
                               className="w-4 h-4 " />
                        {opt.optionText}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
     </div>
  );
};

export default Question_Accordion;
