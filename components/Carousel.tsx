import { ArrowLeft, ArrowRight } from "lucide-react";

export const Carousel = () => {
  return (
    <section className="container mx-auto h-screen py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold">Future Forward Features</p>{" "}
          <div className="flex">
            <span>
              <ArrowLeft />
            </span>
            1/4
            <span>
              <ArrowRight />
            </span>
          </div>
        </div>
        <div className="mb-5 md:flex w-full items-center justify-between">
          <h4 className="orbitron text-3xl font-bold lg:text-6xl">SOLAR SKY</h4>{" "}
          <div className="w-full lg:w-2/5">
            <p className="text-xs">
              When fully exposed to the sun, the Fisker Ocean
              Extreme’s SolarSky can produce up to 1,500 clean, emissions-free
              miles per year, and under ideal conditions may increase to beyond
              2,000 miles
            </p>
          </div>
        </div>
        <img
          className="h-full w-full rounded-xl"
          src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/ztgtaeo2dj1gx1ghjecr"
          alt=""
        />
        <div></div>
      </div>
    </section>
  );
};
