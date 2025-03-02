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
        <title>Binary Crypto Options - Best Trading Platform</title>
        <meta name="description" content="Binary Crypto Options - The best trading platform for Bitcoin and cryptocurrency investments" />
      </Head>
      <section id="home" className="relative z-10 overflow-hidden bg-white dark:bg-gray-dark">
        <div className="relative w-full h-[90vh] md:h-[85vh] lg:h-[90vh]">
          <div className="absolute inset-0 w-full h-full">
            <Image
              className="w-full h-full object-cover object-center transition-opacity duration-500"
              sizes="100vw"
              fill
              priority
              alt={`Bitcoin trading background ${page}`}
              src={`/images/images/${page}.JPG`}
              onError={(e) => console.error("Error loading image:", e)}
            />
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
            
            <div className="absolute bottom-8 left-0 right-0 md:left-10 px-6 py-8 max-w-[90%] md:max-w-[600px] lg:max-w-[650px] bg-black/40 backdrop-blur-sm rounded-lg transform transition-all duration-300">
              <h1 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Premium Trading Options Worldwide
              </h1>
              <p className="text-lg md:text-xl mt-4 text-gray-100 pb-6 md:pb-8">
                Binary Crypto Options offers investors access to high-growth investment opportunities in Bitcoin markets with professional management and proven strategies.
              </p>
              <Link href="/signup" className="inline-block rounded-md bg-primary px-6 py-3 md:px-8 md:py-4 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary/90 hover:shadow-lg transform hover:-translate-y-1">
                Start Trading Now
              </Link>
            </div>
            
            {/* Navigation Arrows with improved styling */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
              <button
                onClick={handlePrevPage}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-primary transition-all duration-300"
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
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-primary transition-all duration-300"
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
                    page === num ? 'bg-primary scale-125' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${num}`}
                />
              ))}
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