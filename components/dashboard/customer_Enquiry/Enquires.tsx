import { useQuery } from "@apollo/client/react";
import { GET_CUSTOMER_ENQUIRY } from "@/lib/Query/queries";
import EnquiryList from "@/components/dashboard/customer_Enquiry/Enquiry-List";
import CenteredLoader from "@/components/utility/Loader";
import EmptyContainer from "@/components/utility/EmptyContainer";
import React from "react";

const empty_details = {
  title: "Customer enquiry is empty",
  description: "Looks like user  haven’t sent and compliant yet.",
}

const Customer_Enquiry = ()=> {

  const { data, loading, error} = useQuery(GET_CUSTOMER_ENQUIRY, {
    variables:{page: 1, limit:100},
    fetchPolicy: "cache-and-network",
    // fetchPolicy: 'network-only',
  }) as any;

  return(
    <div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px] w-full">
          <CenteredLoader/>
        </div>
      ) : data?.getEnquiries?.length === 0 ? (
        <EmptyContainer
          title={empty_details.title}
          description={empty_details.description}
        />
      ) : (
        <EnquiryList data={data?.getEnquiries}/>
      )}

    </div>
  )
}


export default Customer_Enquiry