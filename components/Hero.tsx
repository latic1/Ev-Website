import { AlignJustify } from "lucide-react";
const Hero = () => {
  return (
    <div className="relative h-screen bg-[url('/images/HeroBg.png')] bg-cover bg-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-5">
          <img src="/images/Logo.png" alt="" className="w-28" />
          <div className="flex gap-4 text-white">
            <p className="text-white">Account</p>
            <AlignJustify />
          </div>
        </div>
        <div className="absolute bottom-14 left-1/2 mx-auto hidden w-full max-w-6xl -translate-x-1/2 transform items-center space-x-4 rounded-xl bg-white px-5 md:flex">
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-500">0-60 mph</p>
            <p className="font-bold">3.7 s</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-500">Range</p>
            <p className="font-bold">360 mi</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-500">Charge in 30 mins</p>
            <p className="font-bold">80%</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-500">Horsepower</p>
            <p className="font-bold">564 bhp</p>
          </div>
          <img
            src="/images/Force-E-Web-Carousel-3038x1414-US_UP_glo8vf-1.png"
            className="h-[120px] w-[230px]"
            alt=""
          />
          <div className="flex flex-1 flex-col pl-5">
            <p className="mb-3 font-bold">Force E</p>
            <p className="text-sm">
              Fisker Ocean offroad package. Maximize adventure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
