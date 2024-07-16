"use client";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/swiper-bundle.css"; // Uncomment if using Swiper

const Hero = () => {
  const [page, setPage] = useState<number>(3);

  useEffect(() => {
    const int = setInterval(() => {
      setPage((prev) => (prev + 1) >= 8 ? 1 : prev + 1);
    }, 4000);

    return () => clearInterval(int);
  }, []);

  const handlePrevPage = () => {
    setPage((prev) => (prev - 1) <= 0 ? 7 : prev - 1);
  };

  const handleNextPage = () => {
    setPage((prev) => (prev + 1) >= 8 ? 1 : prev + 1);
  };

  return (
    <>
      <Head>
        <title>Your Hero Title</title>
        <meta name="description" content="Description of your hero section" />
      </Head>
      <section id="home" className="relative z-10 overflow-hidden bg-white pb-16 pt-[20px] dark:bg-gray-dark md:pb-[120px] md:pt-[30px]">
        <div className="relative flex h-[calc(100vh-70px)] w-full flex-col justify-center items-center">
          <div className="absolute w-full h-full">
            <Image
              className="w-full h-full object-cover object-center"
              sizes="100vw"
              fill
              alt={`Image for page ${page}`}
              src={`/images/images/${page}.JPG`}
              onError={(e) => console.error("Error loading image:", e)}
            />
            <div className="absolute bottom-8 left-10 py-3 px-6 bg-[#0000007c] rounded-lg">
              <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white">
                Best Trading Options in The World
              </h1>
              <p className="text-2xl mt-4 text-purple-200 pb-8">
                Binary Crypto Options is a distinctive investment company offering investors access to high-growth investment opportunities in Bitcoin markets and other services.
              </p>
              <Link href="/signup" className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80">
                Get Started
              </Link>
            </div>
            {/* Left Arrow */}
            <div className="z-10 absolute bottom-1/2 left-4 text-2xl">
              <span
                onClick={handlePrevPage}
                className="inline-block transition-transform hover:-translate-x-1 cursor-pointer hover:text-blue-500"
                aria-label="Previous Image"
              >
                &lt;-
              </span>
            </div>
            {/* Right Arrow */}
            <div className="z-10 absolute bottom-1/2 right-4 text-2xl">
              <span
                onClick={handleNextPage}
                className="inline-block transition-transform hover:translate-x-1 cursor-pointer hover:text-blue-500"
                aria-label="Next Image"
              >
                -&gt;
              </span>
            </div>
          </div>

          {/* Background SVGs */}
          <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
            {/* First SVG */}
            <svg width="450" height="556" viewBox="0 0 450 556" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG circles */}
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
            {/* Second SVG */}
            <svg width="364" height="201" viewBox="0 0 364 201" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* SVG paths */}
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
