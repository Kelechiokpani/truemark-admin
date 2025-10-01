"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Student = {
  id: number;
  name: string;
  status: "Passed" | "Failed";
  score: string;
  percent: string;
  grade: "Excellent" | "Average" | "Poor";
  timeSpent: string;
  submitted: string;
};

const students: Student[] = [
  {
    id: 1,
    name: "Anaru Hakopa",
    status: "Passed",
    score: "45/50",
    percent: "85%",
    grade: "Excellent",
    timeSpent: "22 MIN",
    submitted: "09 Nov 2019, 9:00 AM",
  },
  {
    id: 2,
    name: "Balveer Bhadiar",
    status: "Passed",
    score: "35/50",
    percent: "68%",
    grade: "Average",
    timeSpent: "22 MIN",
    submitted: "09 Nov 2019, 9:00 AM",
  },
  {
    id: 3,
    name: "Sanne Viscall",
    status: "Passed",
    score: "45/50",
    percent: "85%",
    grade: "Excellent",
    timeSpent: "22 MIN",
    submitted: "09 Nov 2019, 9:00 AM",
  },
  {
    id: 4,
    name: "Tua Manuera",
    status: "Failed",
    score: "15/50",
    percent: "28%",
    grade: "Poor",
    timeSpent: "22 MIN",
    submitted: "09 Nov 2019, 9:00 AM",
  },
];

export default function ExamHistory() {
  const params = useParams();
  const router = useRouter();

  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = students.filter(
    (s) => statusFilter === "all" || s.status === statusFilter
  );

  return (
    <div className="p-6">

      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        ← Back
      </button>


      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <p className="text-gray-600 font-medium">
          Exam results aren’t published yet.
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm">
            Publish without Feedback
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm">
            Publish with Feedback
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search name or e-mail..."
          className="border rounded-lg px-3 py-2 w-full md:w-1/3"
        />
        <select
          className="border rounded-lg px-6 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Status: All</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse text-sm">
          <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-3">Student name</th>
            <th className="px-4 py-3">Passed / Failed</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Grade</th>
            <th className="px-4 py-3">Time Spent</th>
            <th className="px-4 py-3">Submitted</th>
            <th className="px-4 py-3">Details</th>
          </tr>
          </thead>
          <tbody>
          {filtered.map((student) => (
            <tr
              key={student.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3">{student.name}</td>
              <td
                className={`px-4 py-3 font-semibold ${
                  student.status === "Passed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {student.status}
              </td>
              <td className="px-4 py-3">
                {student.score} ({student.percent})
              </td>
              <td
                className={`px-4 py-3 ${
                  student.grade === "Excellent"
                    ? "text-green-600"
                    : student.grade === "Average"
                      ? "text-blue-600"
                      : "text-red-600"
                }`}
              >
                {student.grade}
              </td>
              <td className="px-4 py-3">{student.timeSpent}</td>
              <td className="px-4 py-3">{student.submitted}</td>
              <td className="px-4 py-3 text-blue-600 cursor-pointer">
                See Detail
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
