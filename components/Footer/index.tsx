"use client";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

const Footer = () => {
  // Load crypto widget script once component is mounted
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://price-static.crypto.com/latest/public/static/widget/index.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-white dark:bg-gray-dark pt-10 border-t border-gray-200 dark:border-gray-800">
      {/* Crypto price widget */}
      <div className="container mx-auto mb-6">
        <div 
          id="crypto-widget-CoinMarquee" 
          data-transparent="false" 
          data-design="modern" 
          data-coin-ids="29,1,166,136,382,1986,1120,2180"
          className="rounded-md overflow-hidden"
        ></div>
      </div>

      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-between">
          {/* Company info column */}
          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
            <div className="mb-8 lg:mb-10 max-w-[360px]">
              <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Our Location
              </h2>
              
              <div className="mb-4 rounded-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2348.6220590260627!2d-90.21919513273438!3d32.296063481133885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86282b7f90741b21%3A0x713cde441f038a0!2sJackson%2C%20MS%2C%USA!5e0!3m2!1sen!2sng!4v1719825540980!5m2!1sen!2sng"
                  width="100%"
                  height="120"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location Map"
                  className="w-full"
                />
              </div>

              <p className="mb-3 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                Start Investing Today - Change Your Life
              </p>
              
              <p className="mb-4 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                Helpline: +1(622)4822576
              </p>
               
              <div className="flex items-center">
                <a
                  href="http://t.me/binarycryptooptionssupport"
                  aria-label="Telegram support channel"
                  className="flex items-center text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="fill-current mr-2"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                  </svg>
                  Contact us via Telegram
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links column */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/3 lg:w-2/12 xl:w-2/12">
            <div className="mb-8 lg:mb-10">
              <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Quick Links
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/Plans"
                    className="text-sm text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Investment Plans
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.binance.com/en/crypto/buy"
                    className="text-sm text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Buy Cryptocurrency
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-sm text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support & Help column */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/3 lg:w-2/12 xl:w-2/12">
            <div className="mb-8 lg:mb-10">
              <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Support & Help
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Open Support Ticket
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Terms"
                    className="text-sm text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Accepted payments */}
          <div className="w-full px-4 sm:w-1/2 md:w-1/3 lg:w-3/12 xl:w-2/12">
            <div className="mb-8 lg:mb-10">
              <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
                We Accept
              </h2>
              <div className="flex flex-wrap gap-2">
                {['Bitcoin', 'Ethereum', 'USDT', 'BNB'].map((crypto, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400"
                  >
                    {crypto}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
        
        {/* Copyright section */}
        <div className="py-6 text-center">
          <p className="text-sm text-body-color dark:text-body-color-dark">
            © {currentYear} Binary Crypto Options. All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative elements - reduced opacity */}
      <div className="absolute right-0 top-14 z-[-1] opacity-20">
        <svg
          width="55"
          height="99"
          viewBox="0 0 55 99"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
          <mask
            id="mask0_94:899"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="99"
            height="99"
          >
            <circle
              opacity="0.8"
              cx="49.5"
              cy="49.5"
              r="49.5"
              fill="#4A6CF7"
            />
          </mask>
          <g mask="url(#mask0_94:899)">
            <circle
              opacity="0.8"
              cx="49.5"
              cy="49.5"
              r="49.5"
              fill="url(#paint0_radial_94:899)"
            />
            <g opacity="0.8" filter="url(#filter0_f_94:899)">
              <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_f_94:899"
              x="12.4852"
              y="-15.1763"
              width="82.7646"
              height="82.7646"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="10.5"
                result="effect1_foregroundBlur_94:899"
              />
            </filter>
            <radialGradient
              id="paint0_radial_94:899"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
            >
              <stop stopOpacity="0.47" />
              <stop offset="1" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-10 left-0 z-[-1] opacity-20">
        <svg
          width="79"
          height="94"
          viewBox="0 0 79 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-41"
            y="26.9426"
            width="66.6675"
            height="66.6675"
            transform="rotate(-22.9007 -41 26.9426)"
            fill="url(#paint0_linear_94:889)"
          />
          <rect
            x="-41"
            y="26.9426"
            width="66.6675"
            height="66.6675"
            transform="rotate(-22.9007 -41 26.9426)"
            stroke="url(#paint1_linear_94:889)"
            strokeWidth="0.7"
          />
          <path
            opacity="0.3"
            d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
            fill="url(#paint2_linear_94:889)"
          />
          <path
            d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
            stroke="url(#paint3_linear_94:889)"
            strokeWidth="0.7"
          />
          <path
            opacity="0.3"
            d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
            fill="url(#paint4_linear_94:889)"
          />
          <path
            d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
            stroke="url(#paint5_linear_94:889)"
            strokeWidth="0.7"
          />
          <defs>
            <linearGradient
              id="paint0_linear_94:889"
              x1="-41"
              y1="21.8445"
              x2="36.9671"
              y2="59.8878"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0.62" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_94:889"
              x1="25.6675"
              y1="95.9631"
              x2="-42.9608"
              y2="20.668"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_94:889"
              x1="20.325"
              y1="-3.98039"
              x2="90.6248"
              y2="25.1062"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0.62" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_94:889"
              x1="18.3642"
              y1="-1.59742"
              x2="113.9"
              y2="80.6826"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_94:889"
              x1="61.1098"
              y1="62.3249"
              x2="-8.82468"
              y2="58.2156"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0.62" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_94:889"
              x1="65.4236"
              y1="65.0701"
              x2="24.0178"
              y2="41.6598"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;