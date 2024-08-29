import { Search } from "lucide-react";

const TestDrive = () => {
  return (
    <section className="bg-black py-16 md:py-24 lg:h-svh">
      <div className="container mx-auto h-full rounded-xl px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="h-[300px] rounded-xl bg-[url('/images/Fisker-Ocean-Toronto-3840x2190-1.png')] bg-cover bg-center lg:h-full">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between rounded-lg bg-gradient-to-b from-gray-600 to-transparent p-5 lg:p-10">
            <div className="mb-4 w-full text-white">
              <h4 className="mb-4 text-5xl font-bold orbitron">Make It Yours</h4>{" "}
              <p className="text-lg font-semibold">
                Book a test drive near you.
              </p>
            </div>
            <div className="flex w-full items-center gap-1 text-black">
              <input
                type="text"
                placeholder="Search address or postal code"
                className="block w-full rounded-lg border-0 bg-white py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none md:py-5"
              />

              <div></div>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 text-white md:h-16 md:w-16">
                {" "}
                <Search size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestDrive;
