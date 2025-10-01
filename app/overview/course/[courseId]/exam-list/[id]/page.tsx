"use client";
import React, { useState } from "react";
import QuestionList from "@/components/dashboard/Exam-setup/Exams/Exam-Questions/Question-List";

export default function MyLearningPage() {

  return (
    <div className="min-h-screen bg-white">
      <QuestionList/>
    </div>
  );
}



