// app/Payment/page.tsx
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DepositClient from "@/components/payment/DepositClient";

export const metadata: Metadata = {
  title: "Deposit Funds | Binary Crypto Options",
  description: "Deposit funds into your Binary Crypto Options account",
};

// Server component that handles authentication check
const PaymentPage = async () => {
  // Check authentication server-side
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Payment");
  }

  // Bank account details (in production, these would come from a secure source)
  const accountDetails = {
    bitcoin: {
      address: "bc1qcw3l8nl9s29lv7cv8ykxvk9w8xkwltfy6t3zk6"
    },
    ach: {
      bankName: "JPMorgan Chase Bank",
      accountName: "Binary Crypto Options LLC",
      routingNumber: "021409169",
      accountNumber: "289991897484",
      accountType: "Checking"
    },
    wire: {
      bankName: "JPMorgan Chase Bank, N.A. - New York",
      recepientName: "Robinhood Securities LLC",
      routingNumber: "021000021",
      accountNumber: "10000043774399",
      swiftCode: "CHASUS33",
      bankAddress: "4 New York Plaza Floor 15, New York, NY 10004",
      bankCountry: "United States",
      recepientAddress: "500 COLONIAL CENTER PARKWAY, SUITE 100, LAKEMARY, FL 32746",
    }
  };

  return <DepositClient accountDetails={accountDetails} />;
};

export default PaymentPage;