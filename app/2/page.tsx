import React from "react";

const Page = () => {
  return (
    <section className="relative h-screen">
      {/* Navbar */}
      <nav className="fixed left-0 top-0 z-20 w-full bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="#" className="text-xl font-bold text-black">
            Myna UI
          </a>
          <button
            className="block text-gray-700 focus:outline-none md:hidden"
            id="menu-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <ul className="hidden space-x-6 md:flex lg:items-center" >
            <li>
              <a
                href="#"
                className="font-medium text-gray-700 hover:text-black"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-medium text-gray-700 hover:text-black"
              >
                Communities
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-medium text-gray-700 hover:text-black"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-medium text-gray-700 hover:text-black"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-medium text-gray-700 hover:text-black"
              >
                Login
              </a>
            </li>
            <li>
              {" "}
              <button className="hidden lg:inline-flex items-center rounded-full bg-black px-6 py-2 text-center font-semibold text-white hover:bg-gray-800">
                <p className="mr-3">Join for Free</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M12.043 7.5L9.396 4.854l.708-.708L13.957 8l-3.853 3.854l-.708-.707L12.043 8.5H3v-1z" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Heading Section */}
      <div className="bg-[#fcfeff] pt-40">
        <div className="z-10 mx-auto -mb-36 w-full max-w-lg px-4 text-center">
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl">
            Find Your Tribe, Build Your Network
          </h1>
          <p className="mx-auto mb-5 max-w-lg text-xl md:text-2xl lg:mb-8">
            Connect with like-minded students for fun, friendships, and future
            opportunities.
          </p>
          {/* Button Section */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-black px-6 py-2 text-center font-semibold text-white hover:bg-gray-800"
            >
              <p className="mr-3">Join for Free</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M12.043 7.5L9.396 4.854l.708-.708L13.957 8l-3.853 3.854l-.708-.707L12.043 8.5H3v-1z" />
              </svg>
            </a>
            <a
              href="#"
              className="flex items-center justify-center rounded-full border px-6 py-2 font-semibold hover:bg-gray-100"
            >
              <img
                src="https://loremfaces.net/96/id/1.jpg"
                alt="Profile"
                className="mr-2 h-6 w-6 rounded-full"
              />
              <p className="text-black">Explore Communities</p>
            </a>
          </div>
        </div>
      </div>

      {/* Background Image Section */}
      <div
        className="h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.midjourney.com/40c7f122-800a-490f-acdf-8bb5eecc7f8c/0_0.png')",
        }}
      ></div>
    </section>
  );
};

export default Page;
