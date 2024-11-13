import { ArrowUpRight } from "lucide-react";

export const Mission = () => {
  return (
    <section className="container mx-auto py-12 md:h-svh md:py-24">
      <div className="mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="h-[300px] rounded-xl bg-[url('https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/rogkrccufxqdsu17ze5h')] bg-cover bg-center p-5 md:h-full lg:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="mb-2 font-bold lg:mb-4">Our Mission</h4>{" "}
              <p className="orbitron text-2xl font-semibold md:text-5xl lg:text-7xl">
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
