'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

type details = {
  title:string,
  description:string,
  callToAction?:string,
  to?:string,
}

const EmptyContainer = ({title, description, callToAction, to}: details) => {
  const router = useRouter();

  const handleRoute = () => {
    if (to != null) {
      router.push(to);
    }
  }


  return(
    <div>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
          className="w-40 h-40 mb-6 opacity-80"
        />
        <h2 className="text-xl font-semibold mb-2">
          {title}
        </h2>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        {/*<Link href={to}>*/}
          <button  onClick={handleRoute}
            className="bg-[#387467] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            {callToAction}
          </button>
        {/*</Link>*/}
      </div>
    </div>
  )
}

export default EmptyContainer