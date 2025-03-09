import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color dark:text-body-color-dark">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Diverse Trading Options"
                paragraph="Binary Trading Options provides a comprehensive trading platform with a wide variety of instruments including CFDs on Forex, Cryptocurrency, Stocks, Commodities, Indices, and ETFs, all designed to maximize your investment potential."
                mb="44px"
              />

              <div
                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Advanced Security Protocols" />
                    <List text="100% Money Back Guarantee" />
                    <List text="Lifetime Account Access" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Life-Changing Investment Returns" />
                    <List text="Comprehensive Documentation" />
                    <List text="24/7 Expert Support" />
                  </div>
                </div>
                
                <div className="mt-8">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-7 text-center text-base font-medium text-white hover:bg-opacity-90 transition-all duration-300"
                  >
                    Start Investing Today
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0 overflow-hidden rounded-2xl shadow-lg"
                data-wow-delay=".2s"
              >
                <div className="relative h-full w-full">
                  <Image
                    src="/images/images/1.JPG"
                    alt="Cryptocurrency trading platform"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110 dark:hidden"
                  />
                  <Image
                    src="/images/images/2.JPG"
                    alt="Cryptocurrency trading platform"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110 hidden dark:block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">Industry-Leading Trading Platform</h3>
                    <p className="text-gray-200 mt-2">Experience the best tools and instruments in the market</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;