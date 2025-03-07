"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import menuVata from "./menuVata";

const Header = () => {
  const { data: session, status } = useSession();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);
  const pathname = usePathname();

  // Determine if the user is truly authenticated
  const isAuthenticated = status === "authenticated" && session?.user != null;

  // Navbar toggle
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const handleStickyNavbar = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  // Submenu handler
  const handleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  // Simplified logging for development only
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Auth Status:", status);
    }
  }, [status]);

  // Handle sign out
  const handleSignOut = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/signin`,
    });
  };

  // Format user display name from first and last name
  const getDisplayName = () => {
    if (!session?.user) return "User";
    
    const firstName = session.user.firstName || '';
    const lastName = session.user.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    
    return fullName || session.user.email || "User";
  };

  // Common navbar items
  const renderNavItems = (items: typeof menuData) => (
    <ul className="block lg:flex lg:space-x-12">
      {items.map((menuItem) => (
        <li key={menuItem.id} className="group relative">
          {menuItem.path ? (
            <Link
              href={menuItem.path}
              className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                pathname === menuItem.path
                  ? "text-primary dark:text-white font-medium"
                  : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
              }`}
            >
              {menuItem.title}
            </Link>
          ) : (
            <>
              <p
                onClick={() => handleSubmenu(menuItem.id)}
                className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
              >
                {menuItem.title}
                <span className="pl-3">
                  <svg width="25" height="24" viewBox="0 0 25 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </p>
              <div
                className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                  openIndex === menuItem.id ? "block" : "hidden"
                }`}
              >
                {menuItem.submenu?.map((submenuItem) => (
                  <Link
                    href={submenuItem.path}
                    key={submenuItem.id}
                    className="block rounded py-2.5 text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                  >
                    {submenuItem.title}
                  </Link>
                ))}
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className={`header left-0 top-0 z-40 flex w-full items-center bg-white dark:bg-gray-dark ${
        sticky
          ? "fixed z-[9999] shadow-sticky backdrop-blur-sm transition dark:shadow-sticky-dark"
          : "relative"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`header-logo block w-full ${sticky ? "py-5 lg:py-2" : "py-8"}`}
            >
              <p className="logo_text text-xl font-bold text-black dark:text-white">
                Binary Crypto Options
              </p>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "top-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "top-[-8px] -rotate-45" : ""
                  }`}
                />
              </button>
              <nav
                id="navbarCollapse"
                className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:static lg:w-auto lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 ${
                  navbarOpen ? "top-full opacity-100" : "invisible top-[120%] opacity-0 lg:visible"
                }`}
              >
                {status === "loading" ? (
                  <div className="flex items-center py-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                    <p className="ml-2 text-dark dark:text-white">Loading...</p>
                  </div>
                ) : isAuthenticated ? (
                  renderNavItems(menuData)
                ) : (
                  renderNavItems(menuVata)
                )}

                {/* Mobile auth buttons */}
                <div className="mt-4 flex flex-col space-y-3 lg:hidden">
                  {isAuthenticated && (
                    <div className="flex items-center mb-3">
                      <Image
                        src="/images/images/avatar.jpg"
                        width={37}
                        height={37}
                        className="rounded-full mr-3"
                        alt="profile"
                      />
                      <span className="text-sm font-medium text-dark dark:text-white">
                        {getDisplayName()}
                      </span>
                    </div>
                  )}
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/Dashboard"
                        className="block w-full rounded-sm bg-gray-100 dark:bg-gray-800 py-3 px-4 text-center"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full rounded-sm bg-primary py-3 text-center text-base font-medium text-white hover:bg-opacity-90"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        className="block w-full rounded-sm border border-body-color/20 py-3 text-center text-base font-medium text-dark hover:border-primary hover:bg-primary/5 dark:border-white/20 dark:text-white"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="block w-full rounded-sm bg-primary py-3 text-center text-base font-medium text-white hover:bg-opacity-90"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                  <div className="flex justify-center">
                    <ThemeToggler />
                  </div>
                </div>
              </nav>
            </div>

            <div className="hidden items-center sm:flex">
              {status === "loading" ? (
                <div className="flex items-center mr-4">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  <span className="ml-2 text-dark dark:text-white">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <div className="flex items-center justify-end pr-16 lg:pr-0">
                  <Link href="/Dashboard" className="px-4">
                    <Image
                      src="/images/images/avatar.jpg"
                      width={37}
                      height={37}
                      className="rounded-full border-2 border-transparent hover:border-primary transition-all"
                      alt="profile"
                    />
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="ease-in-up shadow-btn hover:shadow-btn-hover rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:px-9 lg:px-6 xl:px-9"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-end pr-16 lg:pr-0">
                  <Link
                    href="/signin"
                    className="px-7 py-3 text-base font-medium text-dark hover:text-primary dark:text-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="ease-in-up shadow-btn hover:shadow-btn-hover rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:px-9 lg:px-6 xl:px-9"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              <div className="ml-4">
                <ThemeToggler />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;