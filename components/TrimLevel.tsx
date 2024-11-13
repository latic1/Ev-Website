"use client";

import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { Modal } from "./Modal";

export const TrimLevel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <section className="container mx-auto py-14">
      <div className="relative mx-auto pl-2 sm:px-6 lg:px-8">
        <div className="flex h-[500px] w-full grid-cols-3 gap-3 overflow-y-hidden overflow-x-scroll md:gap-10">
          <div>
            <p className="mb-2 font-semibold">Fisker Ocean</p>
            <h2 className="orbitron mb-6 text-7xl font-bold">SPORT</h2>
            <div className="">
              <p>
                Striking a balance of performance, range, and affordability, the
                Fisker Ocean Sport trim level is your beautiful gateway to
                electric mobility.
              </p>
              <button className="mt-4 inline-flex" onClick={toggleModal}>
                Specs
                <ChevronRight />
              </button>
              <p className="orbitron mb-5 mt-28">45000 CAD</p>
              <div className="z-50 h-96 transform rounded-xl bg-[url('https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/tifg6xdh5mm9pq2nfbhs')] bg-cover bg-center duration-500 hover:-translate-y-72"></div>
            </div>
          </div>
          <div>
            <p className="mb-2 font-semibold">Fisker Ocean</p>
            <h2 className="orbitron mb-6 text-7xl font-bold">ULTRA</h2>
            <div className="">
              <p className="tracking-tight">
                This premium level comes well-equipped with all-wheel drive, the
                Hyper Range battery, and an impressive array of high-performance
                features. 
              </p>
              <button className="mt-4 inline-flex" onClick={toggleModal}>
                Specs
                <ChevronRight />
              </button>
              <div>
                {" "}
                <button
                  disabled
                  className="mt-4 rounded-full bg-[#EA4201] px-4 py-1 text-sm font-semibold text-white lg:text-lg"
                >
                  Force E Package Avaliable{" "}
                </button>
              </div>
              <p className="orbitron mb-5 mt-[60px]">65000 CAD</p>
              <div className="z-50 h-96 transform rounded-xl bg-[url('https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/dalugdhrbz0dhfskgzt3')] bg-cover bg-center duration-500 hover:-translate-y-72"></div>
            </div>
          </div>
          <div>
            <p className="mb-2 font-semibold">Fisker Ocean</p>
            <h2 className="orbitron mb-6 text-6xl font-bold lg:text-7xl">
              EXTREME
            </h2>
            <div className="">
              <p>
                Extreme luxury. Extreme performance. Extreme thrills. The Fisker
                Ocean Extreme lives up to its name in all the right ways.
              </p>
              <button className="mt-4 inline-flex" onClick={toggleModal}>
                Specs
                <ChevronRight />
              </button>
              <div>
                {" "}
                <button
                  disabled
                  className="mt-4 rounded-full bg-[#EA4201] px-4 py-1 text-sm font-semibold text-white lg:text-lg"
                >
                  Force E Package Avaliable{" "}
                </button>
              </div>
              <p className="orbitron mb-5 mt-[60px]">80000 CAD</p>
              <div className="z-50 h-96 w-full transform rounded-xl bg-[url('https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/tpzipk7pgjxgkwynypjo')] bg-cover bg-center duration-500 hover:-translate-y-72"></div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <>
            <div className="absolute -bottom-28 z-50 h-full w-full rounded-xl bg-[url('/images/Force-E-Web-Carousel-3038x1414-US_UP_glo8vf-1.png')] bg-cover bg-center">
              <div className="flex justify-between">
                {" "}
                <div className="w-1/3 rounded-xl bg-gradient-to-r from-[#00000066] to-transparent py-10 pl-10 text-white">
                  <p className="mb-3 font-bold">Fisker Ocean</p>
                  <h2 className="orbitron mb-6 text-6xl font-bold">
                    FORCE E PACKAGE
                  </h2>
                  <p className="tracking-wider">
                    The Fisker Ocean Force E is a special off-road package
                    developed to maximize adventure in the Fisker Ocean. The
                    Force E package is dynamic and durable, built for a new kind
                    of driving we call Electric Off-Road. 
                  </p>
                  <button className="mt-5 rounded-full bg-white px-6 py-2 text-black">
                    Configure Your Vehicle
                  </button>
                </div>
                <div className="p-10">
                  <X
                    size={36}
                    onClick={toggleModal}
                    className="h-10 w-10 rounded-full text-white hover:bg-slate-50 hover:text-black"
                  />
                </div>
              </div>
            </div>
            {/* <Modal/> */}
          </>
        )}
      </div>
    </section>
  );
};
