import {  X } from "lucide-react";

export const Modal = () => {
  return (
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
          // onClick={toggleModal}
          className="h-10 w-10 rounded-full text-white hover:bg-slate-50 hover:text-black"
        />
      </div>
    </div>
  </div>
  );
};
