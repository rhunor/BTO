// app/Payment/page.tsx
import PaymentSectionOne from "@/components/payment/PaymentSectionOne";
import PaymentSectionTwo from "@/components/payment/PaymentSectionTwo";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Deposit | Binary crypto options",
  description: "This is About Page for Binary Trading Options",
};

// Server component that handles authentication check
const PaymentPage = async () => {
  // Check authentication server-side
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }

  return (
    <>
      <PaymentSectionOne />
      <PaymentSectionTwo />
    </>
  );
};

export default PaymentPage;