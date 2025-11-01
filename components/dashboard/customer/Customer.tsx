import { useQuery } from "@apollo/client/react";
import { ADMIN_GET_ALL_USERS } from "@/lib/Query/queries";
import CenteredLoader from "@/components/utility/Loader";
import EmptyContainer from "@/components/utility/EmptyContainer";
import React from "react";
import {  useRouter } from "next/navigation";
import Customer_List from "@/components/dashboard/customer/Customer-List";



const empty_details = {
  title: "Customer List is empty",
  description: "Looks like users haven’t Registered yet!!.",
}


const Customers = ()=> {
  const router = useRouter();

  const { data, loading, error} = useQuery(ADMIN_GET_ALL_USERS, {
    variables:{page:1, limit:100},
    fetchPolicy: "cache-and-network",
  }) as any;


  console.log(data, "customers.....");

  return(
    <div>
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        ← Back
      </button>
      <header className="bg-[#387467] text-white px-6 py-8 rounded-md">
        <h1 className="text-2xl font-bold">Registered Customers</h1>
      </header>

      <div>
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px] w-full">
            <CenteredLoader />
          </div>
        ) : data?.getPaymentsForAdmin?.payments?.length === 0 ? (
          <EmptyContainer
            title={empty_details.title}
            description={empty_details.description}
          />
        ) : (
          <Customer_List data={data?.getUsers?.users} />
        )}
      </div>
    </div>
  )
}


export default Customers