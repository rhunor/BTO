import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About  | Columbia Threadneedle Private Investments",
  description: "This is About Page for Columbia Threadneedle Private Investments",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About"
        description="Columbia Threadneedle Private Investments is a distinctive investment company offering sophisticated global investment strategies and portfolio management for private clients and institutions. Our company benefits from an extensive network of global partners, serving over 30 countries worldwide. Here at Columbia Threadneedle Private Investments."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
