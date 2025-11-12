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
        <title>GQG Private Investments - Global Quality Growth</title>
        <meta name="description" content="GQG Private Investments - Premium global investment management for private clients and institutions" />
      </Head>
      <section id="home" className="relative z-10 overflow-hidden bg-white dark:bg-black">
        <div className="relative w-full h-[90vh] md:h-[85vh] lg:h-[90vh]">
          <div className="absolute inset-0 w-full h-full">
            <Image
              className="w-full h-full object-cover object-center transition-opacity duration-500"
              sizes="100vw"
              fill
              priority
              alt={`GQG investment background ${page}`}
              src={`/images/images/${page}.JPG`}
              onError={(e) => console.error("Error loading image:", e)}
            />
            {/* Overlay (reduced to simple translucent black for clean aesthetic) */}
            <div className="absolute inset-0 bg-black/50"></div>
            
            <div className="absolute bottom-8 left-0 right-0 md:left-10 px-6 py-8 max-w-[90%] md:max-w-[600px] lg:max-w-[650px] bg-black/40 backdrop-blur-sm rounded-lg transform transition-all duration-300">
              <h1 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Global Quality Growth For Private Clients
              </h1>
              <p className="text-lg md:text-xl mt-4 text-gray-100 pb-6 md:pb-8">
                GQG Private Investments offers sophisticated investment opportunities with professional management and proven global strategies aligned with your wealth objectives.
              </p>
              <Link href="/signup" className="inline-block rounded-md bg-accent px-6 py-3 md:px-8 md:py-4 text-base font-semibold text-primary transition-all duration-300 ease-in-out hover:bg-accent_light hover:shadow-lg transform hover:-translate-y-1">
                Start Investing Now
              </Link>
            </div>
            
            {/* Navigation Arrows with improved styling */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
              <button
                onClick={handlePrevPage}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-accent transition-all duration-300"
                aria-label="Previous Image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            </div>
            
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
              <button
                onClick={handleNextPage}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-accent transition-all duration-300"
                aria-label="Next Image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
            
            {/* Slide indicators/dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    page === num ? 'bg-accent scale-125' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${num}`}
                />
              ))}
            </div>
          </div>

          {/* Background SVGs removed for clean aesthetic */}
        </div>
      </section>
    </>
  );
};

export default Hero;