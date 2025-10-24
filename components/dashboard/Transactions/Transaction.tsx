import { useQuery } from "@apollo/client/react";
import { GET_ALL_TRANSACTION } from "@/lib/Query/queries";
import CenteredLoader from "@/components/utility/Loader";
import EmptyContainer from "@/components/utility/EmptyContainer";
import React from "react";
import {  useRouter } from "next/navigation";
import Transaction_List from "@/components/dashboard/Transactions/Transaction-List";



const empty_details = {
  title: "Transaction is empty",
  description: "Looks like users haven’t made  any Payments Yet!!.",
}


const Transactions = ()=> {
  const router = useRouter();

  const { data, loading, error} = useQuery(GET_ALL_TRANSACTION, {
    variables:{page:1, pageSize:100},
    fetchPolicy: "cache-and-network",
  }) as any;


  console.log(data, "transaction.....");
  return(
    <div>
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        ← Back
      </button>
      <header className="bg-[#387467] text-white px-6 py-8 rounded-md">
        <h1 className="text-2xl font-bold">Transaction History</h1>
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
          <Transaction_List data={data?.getPaymentsForAdmin?.payments} />
        )}
      </div>
    </div>
  )
}


export default Transactions