import { Metadata } from "next";
import ResetPassword from "@/components/Auth/Resetpassword";

export const metadata: Metadata = {
  title: "True-Mark Global Standards & Solutions Limited",
  description: "Explore True-Mark Global expert services in E-Learning, ISO Certification, Auditing, Outsourcing, and Inspection — delivering quality, compliance, and professional excellence."
};

const SigninPage = () => {
  return (
    <>
      <ResetPassword />
    </>
  );
};

export default SigninPage;
