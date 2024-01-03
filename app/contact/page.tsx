import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Binary Trading Options",
  description: "This is Contact Page for Binary Trading Options",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact "
        description="Need More Information Contact us
        "
      />

      <Contact />
    </>
  );
};

export default ContactPage;
