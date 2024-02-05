import PaymentSectionOne from "@/components/payment/PaymentSectionOne";
import PaymentSectionTwo from "@/components/payment/PaymentSectionTwo";

// import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deposit  | Binary crypto options",
  description: "This is About Page for Binary Trading Options",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      {/* <Breadcrumb
        pageName="About"
        description="Binary Trading Options is a distinctive investment company offering investors access to high-growth investment opportunities in Bitcoin markets and other services. Our company benefits from an extensive network of global clients, supporting over 30 countries worldwide. Here at Binary Trading Options PLC."
      /> */}
      <PaymentSectionOne />
      <PaymentSectionTwo />
    </>
  );
};

export default AboutPage;
