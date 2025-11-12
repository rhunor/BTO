import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-white dark:bg-black">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0 overflow-hidden rounded-2xl shadow-lg group"
              data-wow-delay=".15s"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/images/3.JPG"
                  alt="Global investment strategies"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 dark:hidden"
                />
                <Image
                  src="/images/images/4.JPG"
                  alt="Global investment strategies"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 hidden dark:block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white">Advanced Investment Solutions</h3>
                  <p className="text-gray-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Powered by cutting-edge technology and market expertise</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full px-4 lg:w-1/2">
            <div className="wow fadeInUp max-w-[500px]" data-wow-delay=".2s">
              <h2 className="mb-8 text-3xl font-bold text-black dark:text-white sm:text-4xl">
                Our Investment Philosophy
              </h2>
              
              <div className="mb-9 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <span className="flex h-[50px] w-[50px] items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold text-black dark:text-white">Insurance & Security</h3>
                </div>
                <p className="text-base font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                  We navigate market volatility with disciplined risk management to pursue consistent, long-term returns aligned with client objectives.
                </p>
              </div>
              
              <div className="mb-9 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <span className="flex h-[50px] w-[50px] items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold text-black dark:text-white">Flexibility</h3>
                </div>
                <p className="text-base font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                  We offer customizable investment plans that adapt to your financial goals and risk tolerance, ensuring flexibility and tailored solutions.
                </p>
              </div>
              
              <div className="mb-9 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <span className="flex h-[50px] w-[50px] items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold text-black dark:text-white">Client-Focused Approach</h3>
                </div>
                <p className="text-base font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                  We emphasize understanding our clients&apos; requirements and providing tailored solutions that meet their investment criteria. Our team of specialists focuses on achieving client goals responsibly.
                </p>
              </div>
              
              <div className="text-center lg:text-left mt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-md border border-gray-800 dark:border-gray-300 py-3 px-7 text-center text-base font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Schedule a Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;