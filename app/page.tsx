//app/page.tsx
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";

import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";

import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import Widget from "@/components/Widget";

export const metadata: Metadata = {
  title: "GQG Private Investments - Global Quality Growth",
  description: "Sophisticated wealth management and global investment strategies for private clients and institutions",
  // other metadata
};

export default function Home() {
  
  return (
    <>
      <ScrollUp />
      <Widget/>
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      {/* <CoinPrices/> */}
      {/* <Blog /> */}
      <Contact />
    </>
  );
}
