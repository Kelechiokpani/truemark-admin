import { Metadata } from "next";
import ForgotPassword from "@/components/Auth/Forgotpassword";

export const metadata: Metadata = {
  title: "True-Mark Global Standards & Solutions Limited",
  description: "Explore True-Mark Global expert services in E-Learning, ISO Certification, Auditing, Outsourcing, and Inspection — delivering quality, compliance, and professional excellence."
};

const SigninPage = () => {
  return (
    <>
      <ForgotPassword />
    </>
  );
};

export default SigninPage;
