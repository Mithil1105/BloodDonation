import React, { useEffect } from "react";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";

import logo from "../Images/Logo2.svg";

const Navbar = () => {
  const [isloggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.accessToken !== undefined) {
      setLoggedIn(true);
    }
  }, [auth]);

  return (
    <div>
      <nav className="font-cust1 bg-transparent mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="flex">
                  <img src={logo}></img>
                  <h1 className="text-4xl ml-2 inline-block font-bold text-red-600">
                    DonateNow
                  </h1>
                </Link>
              </div>
              <div className="hidden md:block md:ml-96">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/about"
                    className=" hover:bg-[#FA9884] px-3 py-2 rounded-md"
                  >
                    About
                  </Link>
                  <Link
                    to="/dashboard"
                    className=" hover:bg-[#FA9884]  px-3 py-2 rounded-md"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/admin/dash"
                    className=" hover:bg-[#FA9884]  px-3 py-2 rounded-md"
                  >
                    Admin
                  </Link>
                  <Link
                    to="/feed"
                    className=" hover:bg-[#FA9884]  px-3 py-2 rounded-md animate-pulse"
                  >
                    Donate
                  </Link>

                  {isloggedIn ? (
                    <Link
                      to="/logout"
                      className="bg-[#FF7878] hover:bg-[#FA9884]  py-2 px-4 rounded"
                    >
                      Log Out
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-[#FF7878] hover:bg-[#FA9884]  py-2 px-4 rounded"
                    >
                      Log In
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div
                ref={ref}
                className="px-2 pt-2 pb-3 space-y-1 sm:px-4 sm:flex sm:flex-col"
              >
                <Link
                  to="/about"
                  className=" hover:bg-[#FA9884] px-3 py-2 rounded-md"
                >
                  About
                </Link>
                <Link
                  to="/dashboard"
                  className=" hover:bg-[#FA9884]  px-3 py-2 rounded-md"
                >
                  Profile
                </Link>
                <Link
                  to="/admin/dash"
                  className=" hover:bg-[#FA9884]  px-3 py-2 rounded-md sm:hidden"
                >
                  Admin
                </Link>
                <Link
                  to="/feed"
                  className=" hover:bg-[#FA9884]  px-3 py-2 rounded-md animate-pulse"
                >
                  Donate
                </Link>

                {isloggedIn ? (
                  <Link
                    to="/logout"
                    className="bg-[#FF7878] hover:bg-[#FA9884]  py-2 px-4 rounded"
                  >
                    Log Out
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="bg-[#FF7878] hover:bg-[#FA9884]  py-2 px-4 rounded"
                  >
                    Log In
                  </Link>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};

export default Navbar;
