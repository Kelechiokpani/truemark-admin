"use client";

import { HashLoader } from "react-spinners";

export default function CenteredLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <HashLoader size={60} color="#387467" />
    </div>
  );
}
