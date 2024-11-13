import React from "react";

const Section4 = () => {
  return (
    <section className="container mx-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="h-full rounded-xl bg-black text-white">
            <div className="p-7">
              {" "}
              <p className="pb-4">PULSE AUDIO SYSTEM</p>
              <p className="pb-4">
                Fisker Pulse 3D audio system immerses the driver and passengers
                in an experience like no other.
              </p>
              <button className="underline">Learn more</button>
            </div>

            <img
              src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/bifhrv4cm2uvtyjuwujy"
              alt=""
              className=""
            />
          </div>
          <div className="flex h-full flex-col space-y-5">
            <img
              src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/dy1a6vhu8sz91sipvvyp"
              alt=""
              className="flex-1 rounded-xl"
            />
            <img
              src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/pvearhlf2noviolqmju1"
              alt=""
              className="flex-1 rounded-xl"
            />
          </div>
          <div className="flex h-full flex-col space-y-5">
            <img
              src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/qae2ssljrqkzks4ez4dw"
              alt=""
              className="flex-1 rounded-xl"
            />
            <div className="flex-1 rounded-xl bg-gradient-to-bl from-[#C3B9A4] to-[#938B7B] p-7 text-white">
              <h4 className="mb-5">SPACIOUS INTERIOR</h4>
              <p className="mb-5 lg:text-xl">
                With an electric drivetrain, the Fisker Ocean for an
                impressively spacious cabin, seating for five adults, and
                flexible storage for surfboards, camping gear, pet carriers, and
                more
              </p>
              <button>Learn more</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
