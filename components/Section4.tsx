import React from "react";

const Section4 = () => {
  return (
    <section className="container mx-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="h-full rounded-xl bg-black p-7 text-white">
            <p className="pb-4">PULSE AUDIO SYSTEM</p>
            <p className="pb-4">
              Fisker Pulse 3D audio system immerses the driver and passengers in
              an experience like no other.
            </p>
            <button className="underline">Learn more</button>
            <img
              src="/images/Extreme_Features_Hypersound_1080x1920_ykr5bw.png"
              alt=""
            />
          </div>
          <div className="flex h-full flex-col space-y-5">
            <img
              src="/images/Fisker_Ocean_PDP_Images_Resized_SustainableMaterials_1038x1296_zgbmem-1.png"
              alt=""
              className="flex-1 rounded-xl"
            />
            <img
              src="/images/Fisker_Ocean_PDP_Images_Resized_ModernSUVDesign_1038x1296_nkz2ni-1.png"
              alt=""
              className="flex-1 rounded-xl"
            />
          </div>
          <div className="flex h-full flex-col space-y-5">
            <img
              src="/images/Fisker_Ocean_PDP_Images_Resized_SpaciousInterior_1038x1296_vsrysb-1.png"
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
