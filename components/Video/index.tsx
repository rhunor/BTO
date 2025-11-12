"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import ModalVideo from "react-modal-video";

const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28 overflow-hidden">
      <div className="container">
        <SectionTitle
          title="Learn About Our Investment Approach"
          paragraph="Watch a short overview of our investment philosophy and how we construct portfolios for private clients"
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[800px] overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-video items-center justify-center group">
                <Image 
                  src="/images/video/video.jpg" 
                  alt="Bitcoin mining video thumbnail" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
                <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                  <button
                    aria-label="Play overview video about our investment approach"
                    onClick={() => setOpen(true)}
                    className="flex h-[80px] w-[80px] items-center justify-center rounded-full border border-gray-800 bg-white dark:bg-black text-black dark:text-white transition-all duration-300 hover:scale-110"
                  >
                    <svg
                      width="20"
                      height="22"
                      viewBox="0 0 16 18"
                      className="fill-current"
                    >
                      <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                    </svg>
                  </button>
                </div>
                
                {/* Video info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/50">
                  <h3 className="text-white text-xl font-semibold">Overview of Our Strategy</h3>
                  <p className="text-gray-200 text-sm mt-2">A concise look at our investment philosophy and portfolio construction approach</p>
                </div>
              </div>
            </div>
            
            {/* Additional information cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-black dark:text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">24/7 Mining Operations</h3>
                <p className="text-gray-600 dark:text-gray-300">Our mining facilities operate around the clock to maximize returns on your investments.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-black dark:text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Secure Infrastructure</h3>
                <p className="text-gray-600 dark:text-gray-300">Advanced security protocols protect both our mining equipment and your digital assets.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-black dark:text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Performance Monitoring</h3>
                <p className="text-gray-600 dark:text-gray-300">Real-time analytics and reporting keep you informed about your investment performance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        autoplay={true}
        start={true}
        isOpen={isOpen}
        videoId="GmOzih6I1zs"
        onClose={() => setOpen(false)}
      />

      {/* Decorative video background removed for minimal aesthetic */}
    </section>
  );
};

export default Video;