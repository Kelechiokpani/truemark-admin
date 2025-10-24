"use client";
import React from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ANALYTICS } from "@/lib/Query/queries";
import {
  User,
  BookOpen,
  ClipboardList,
  MessageSquare,
  DollarSign,
  CreditCard,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import CenteredLoader from "@/components/utility/Loader";


type StatCard = {
  title: string;
  value: number;
  icon: React.ElementType;
  gradient: string;
  textColor: string;
};

export default function AnalyticsOverview() {
  const { data, loading, error } = useQuery(GET_ANALYTICS, {
    fetchPolicy: "cache-and-network",
  }) as any;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-400 w-full">
        {/*<Loader2 className="animate-spin size-5 mr-2" />*/}
        <CenteredLoader />  Loading analytics...
      </div>

)
  ;

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load analytics data.
      </div>
    );

  const stats = data?.getAdminStats || {};

  // Convert the API data into chart format
  const chartData = [
    { name: "Users", value: stats.totalUsers ?? 0 },
    { name: "Courses", value: stats.totalCourses ?? 0 },
    { name: "Assignments", value: stats.totalAssignments ?? 0 },
    { name: "Enquiries", value: stats.totalEnquiries ?? 0 },
    { name: "Payments", value: stats.totalPayments ?? 0 },
    { name: "Paid Courses", value: stats.totalPaidCourses ?? 0 },
  ];

  const cards: StatCard[] = [
    {
      title: "Registered Users",
      value: stats.totalUsers,
      icon: User,
      gradient: "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700",
      textColor: "text-emerald-600",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      gradient: "from-blue-50 to-blue-100 border-blue-200 text-blue-700",
      textColor: "text-blue-600",
    },
    {
      title: "Assignments Added",
      value: stats.totalAssignments,
      icon: ClipboardList,
      gradient: "from-amber-50 to-amber-100 border-amber-200 text-amber-700",
      textColor: "text-amber-600",
    },
    {
      title: "Customer Enquiries",
      value: stats.totalEnquiries,
      icon: MessageSquare,
      gradient: "from-rose-50 to-rose-100 border-rose-200 text-rose-700",
      textColor: "text-rose-600",
    },
    {
      title: "Total Payments",
      value: stats.totalPayments,
      icon: () => <span className="text-2xl font-bold text-purple-600">₦</span>,
      gradient: "from-purple-50 to-purple-100 border-purple-200 text-purple-700",
      textColor: "text-purple-600",
    },
    {
      title: "Paid Courses",
      value: stats.totalPaidCourses,
      icon: CreditCard,
      gradient: "from-teal-50 to-teal-100 border-teal-200 text-teal-700",
      textColor: "text-teal-600",
    },
  ];

  return (
    <div className="p-6">
      <header className="bg-[#387467] text-white px-6 py-8 rounded-md">
        <h1 className="text-2xl font-bold">
          Analytics Overview
        </h1>
      </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10 mt-8">
          {cards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl border ${item.gradient} bg-gradient-to-br p-6 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl bg-white/70 backdrop-blur-sm`}
                    >
                      <Icon className={`size-6 ${item.textColor}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {item.title}
                      </p>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {item.value?.toLocaleString() ?? 0}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Section */}
        <div className=" p-6 rounded-md  border border-gray-200 ">
          <h3 className="text-lg font-semibold text-gray-800  mb-4">
            Platform Overview (Total Counts)
          </h3>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
              barGap={4}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" stroke="#387467" tick={{ fontSize: 12 }} />
              <YAxis stroke="#387467" tick={{ fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                contentStyle={{
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  border: "1px solid #387467",
                  color: "#111827",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="value"
                fill="#387467"
                radius={[8, 8, 0, 0]}
                barSize={30} // smaller bars
                // className="transition-transform duration-300 hover:scale-105"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>
    </div>
);
}

