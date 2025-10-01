"use client";
import Overview from "@/components/dashboard/Overview";
import { useQuery } from "@apollo/client/react";
import { GET_COURSES } from "@/lib/Query/queries";
import { EcommerceMetrics } from "@/components/dashboard";


export default function OverviewPage() {
  const { data, loading, error} = useQuery(GET_COURSES, {
    fetchPolicy: "cache-and-network",
    // fetchPolicy: 'network-only',
    // variables:{seasonId:seasonId},
  });

  return (
    <div className="min-h-screen bg-white">
      <Overview data={data}/>


      <EcommerceMetrics />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">

        </div>
      </div>

    </div>
  );
}
