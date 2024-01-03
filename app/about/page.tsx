import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About  | Binary Trading options",
  description: "This is About Page for Binary Trading Options",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About"
        description="Binary Trading Options is a distinctive investment company offering investors access to high-growth investment opportunities in Bitcoin markets and other services. Our company benefits from an extensive network of global clients, supporting over 30 countries worldwide. Here at Binary Trading Options PLC."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
