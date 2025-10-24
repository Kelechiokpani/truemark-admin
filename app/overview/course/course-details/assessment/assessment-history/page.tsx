"use client";
import React, { Suspense } from "react";
import Course_Exams_History from "@/components/dashboard/Exam-setup/Exam-Submission-History/History";

export default function MyLearningPage() {

  return (
    <div className="min-h-screen bg-white">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <p className="text-gray-500 text-sm animate-pulse">
              Loading exam history...
            </p>
          </div>
        }
      >
        <Course_Exams_History />
      </Suspense>
    </div>
  );
}



