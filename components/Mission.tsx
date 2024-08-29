import { ArrowUpRight } from "lucide-react";

export const Mission = () => {
  return (
    <section className="container mx-auto py-12 md:py-24 md:h-svh">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="h-[300px] rounded-xl bg-[url('/images/miss.png')] bg-cover bg-center p-5 md:h-full lg:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="mb-2 font-bold lg:mb-4">Our Mission</h4>{" "}
              <p className="md:text-5xl  lg:text-7xl text-2xl font-semibold orbitron">
                A Clean Future For All
              </p>
            </div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black lg:h-20 lg:w-20">
              {" "}
              <ArrowUpRight size={40} />{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
