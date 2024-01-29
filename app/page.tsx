import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import CoinPrices from "@/components/CoinPrices";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import Widget from "@/components/Widget";

export const metadata: Metadata = {
  title: "Binary Trading Options",
  description: " ",
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
