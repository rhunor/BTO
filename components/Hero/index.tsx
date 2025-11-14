"use client";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

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
        <title>Columbia Threadneedle Private Investments - Premium Global Investment Management</title>
        <meta name="description" content="Columbia Threadneedle Private Investments - Premium global investment management for private clients and institutions" />
      </Head>
      <section id="home" className="relative z-10 overflow-hidden bg-white dark:bg-black">
        <div className="relative w-full h-[90vh] md:h-[85vh] lg:h-[90vh]">
          <div className="absolute inset-0 w-full h-full">
            <Image
              className="w-full h-full object-cover object-center transition-opacity duration-500"
              sizes="100vw"
              fill
              priority
              alt={`Columbia Threadneedle investment background ${page}`}
              src={`/images/images/${page}.JPG`}
              onError={(e) => console.error("Error loading image:", e)}
            />
            {/* Gradient overlay for modern depth and readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/60"></div>
            
            <div className="absolute bottom-4 left-0 right-0 px-4 py-6 sm:px-6 md:top-1/2 md:left-10 md:-translate-y-1/2 md:translate-x-0 md:right-auto md:max-w-2xl max-w-[95%] sm:max-w-[90%] bg-black/40 backdrop-blur-sm rounded-lg transform transition-all duration-300">
              <h1 className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Global Quality Growth For Private Clients
              </h1>
              <p className="text-base sm:text-lg md:text-xl mt-4 text-gray-100 pb-6 md:pb-8">
                Your Strategic Partner in Bitcoin Markets
Navigate Bitcoin’s dynamic landscape with confidence. BQB provides curated access to premium investment opportunities, combining rigorous portfolio management with strategies refined through real market cycles.
              </p>
              <Link href="/signup" className="inline-block rounded-md bg-accent px-6 py-3 md:px-8 md:py-4 text-base font-semibold text-primary transition-all duration-300 ease-in-out hover:bg-accent_light hover:shadow-lg transform hover:-translate-y-1">
                Start Investing Now
              </Link>
            </div>
            
            {/* Navigation Arrows: Hidden on very small, visible and touch-friendly otherwise */}
            <div className="absolute top-1/2 hidden sm:block left-4 transform -translate-y-1/2 z-10">
              <button
                onClick={handlePrevPage}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-accent transition-all duration-300"
                aria-label="Previous Image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6 md:w-6 md:h-6">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            </div>
            
            <div className="absolute top-1/2 hidden sm:block right-4 transform -translate-y-1/2 z-10">
              <button
                onClick={handleNextPage}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-accent transition-all duration-300"
                aria-label="Next Image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6 md:w-6 md:h-6">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
            
            {/* Slide indicators/dots: Responsive spacing */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-1 sm:space-x-2">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    page === num ? 'bg-accent scale-125' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${num}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;