"use client";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

const Footer = () => {
  // Crypto widget removed — not used for GQG aesthetic

  const currentYear = new Date().getFullYear();

  return (
  <footer className="relative z-10 bg-white dark:bg-black pt-10 border-t border-gray-200/10 dark:border-gray-700">
      {/* Remove crypto widget - not needed for GQG */}

      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-between">
          {/* Company info column */}
          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
            <div className="mb-8 lg:mb-10 max-w-[360px]">
              <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
                Global Presence
              </h2>
              
              <p className="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                Serving institutional and private clients worldwide with sophisticated investment management.
              </p>
              
              <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                Client Support: +1 (800) GQG-INVS
              </p>
               
              <div className="flex items-center space-x-4">
                <a
                  href="https://linkedin.com/company/gqgpartners"
                  aria-label="LinkedIn"
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/gqgpartners"
                  aria-label="Twitter"
                  className="flex items-center text-gray-200 dark:text-body-color-dark hover:text-accent dark:hover:text-accent transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M23.953 4.57a10 10 0 002.856-5.718v-1c-1.26.855-2.59 1.59-4 2.165-.746.418-1.478.799-2.23 1.135a6.96 6.96 0 00-2.828-4.32zm-7.08 2.07a11 11 0 016.12-1.87c.855.104 1.695.305 2.5.6a9.96 9.96 0 01-6.62 1.27zm9.08-3.37a10 10 0 01-1.785 4.2 10 10 0 01-4.215 2.785 10 10 0 01-4.2 1.785h-2a10 10 0 01-4.2-1.785 10 10 0 01-2.785-4.215A10 10 0 011 5.57a10 10 0 011.785-4.2A10 10 0 015.57 1 10 10 0 019.77.215 10 10 0 0114 1a10 10 0 014.215 2.785A10 10 0 0121 8.57"/>
                  </svg>
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
                    className="text-sm text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    Investment Plans
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-white dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-sm text-white dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
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
                    className="text-sm text-white dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    Open Support Ticket
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Terms"
                    className="text-sm text-white dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-white dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
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
                Contact
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Email: contact@gqgprivateinvest.com
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Phone: +1 (800) GQG-INVS
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
  <div className="h-px w-full bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Copyright section */}
        <div className="py-6 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            © {currentYear} GQG Private Investments. All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative elements removed for clean white/black aesthetic */}
    </footer>
  );
};

export default Footer;