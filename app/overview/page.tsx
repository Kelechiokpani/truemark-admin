"use client";
import Overview from "@/components/dashboard/Overview";
import { useQuery } from "@apollo/client/react";
import { GET_COURSES } from "@/lib/Query/queries";


export default function OverviewPage() {
  const { data, loading, error} = useQuery(GET_COURSES, {
    fetchPolicy: "cache-and-network",
    // fetchPolicy: 'network-only',
    // variables:{seasonId:seasonId},
  });

  return (
    <div className="min-h-screen bg-white">
      <Overview data={data}/>
    </div>
  );
}
