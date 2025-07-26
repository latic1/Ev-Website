import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-black py-10 text-white sm:pt-16 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-12 gap-y-16 md:col-span-3 lg:grid-cols-6">
          <div className="">
            <img
              className="h-20 w-20"
              src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/q9zoawz14ajtpd0vrsqm"
              alt=""
            />
          </div>

          <div>
            <ul className="space-y-4">
              <li>
                <a className="text-white hover:text-gray-300">Configure</a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Brand</a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Our Values</a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Account </a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Fisker Ocean </a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Fleet Sales </a>
              </li>
            </ul>
          </div>

          <div>
            <ul className="space-y-4">
              <li>
                <a className="text-white hover:text-gray-300">
                  Retail Partnerships
                </a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Newsroom</a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Investors</a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Fisker Shop</a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Contact</a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">F.A.Q.</a>
              </li>
            </ul>
          </div>
          <div>
            {" "}
            <ul className="space-y-4">
              <li>
                <a className="text-white hover:text-gray-300">Legal</a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Imprint</a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Careers</a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Find Us</a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">
                  Owners Manual{" "}
                </a>
              </li>
              <li>
                <a className="text-white hover:text-gray-300">Awards </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <div className="flex gap-4">
              <img
                src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/kixnfngt93r0hvnkaqz6"
                className="h-7 w-7"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/up3av2zaezfwija24hda"
                className="h-7 w-7"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/wdwcvgkwcqpcgzenhf3m"
                className="h-7 w-7"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/ul4exeytgitivnx4mtqq"
                className="h-7 w-7"
                alt=""
              />
            </div>
            <div className="mt-12 flex w-full">
              <button
                type="button"
                className="flex h-14 w-48 items-center justify-center rounded-xl border border-white text-white"
              >
                <div className="mr-3">
                  <svg viewBox="0 0 384 512" width="30">
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="-mt-1 font-sans text-2xl font-semibold">
                    App Store
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <hr className="mb-10 mt-16 border-gray-200" />

        <p className="text-center text-sm text-gray-600 flex justify-center">
          © Copyright {new Date().getFullYear()}, All Rights Reserved by {" "}
          <Link
            href="linkedin.com/in/latif-musah"
            target="_blank"
            className="text-blue-400 flex"
          >
            
            Latif Musah <span className="relative flex h-3 w-3 ml-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
            </span>
          </Link>
        </p>
      </div>
    </footer>
  );
};

