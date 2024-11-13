import { Navigation } from "lucide-react";

const Blog = () => {
  return (
    <section className="text-whit bg-black py-12 md:py-24">
      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 text-white md:grid-cols-3 lg:gap-20">
          <div className="flex flex-col justify-center">
            <h2 className="orbitron mb-3 text-3xl font-bold lg:mb-5 lg:text-5xl">
              READ THE BLOG
            </h2>
            <p className="mb-3 lg:mb-5 lg:text-lg">
              Stay up to date on Fisker news, updates, investments, and more.
            </p>
            <div>
              <button className="rounded-full bg-white px-3 py-2 text-black hover:bg-gray-300 hover:text-white">
                Learn More
              </button>
            </div>
          </div>
          <div className="col-span-2">
            <img
              src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/vrarsediavqy8urqhgki"
              alt=""
            />
          </div>
          <div className="col-span-2">
            <img
              src="https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/njzuvzzts4b2dkfbqcyg"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center">
            {" "}
            <h3 className="orbitron mb-3 text-3xl font-bold lg:mb-5 lg:text-5xl">
              EXTREME E SERIES
            </h3>
            <p className="mb-5 md:mb-3 lg:text-lg">
              Learn about this new extreme sport, and how Fisker is
              participating in it.
            </p>
            <div>
              <button className="rounded-full bg-white px-3 py-2 text-black hover:bg-gray-300 hover:text-white">
                Learn More
              </button>
            </div>
          </div>{" "}
        </div>
        <div className="mx-auto flex w-full flex-wrap items-center justify-between pt-20 md:flex-nowrap md:px-20">
          <div className="text-white">
            <h4 className="orbitron text-xl font-semibold md:text-3xl lg:text-5xl">
              NEWSLETTER
            </h4>
            <p>Sign up. Stay in touch.</p>
          </div>
          <div className="flex items-center gap-2 text-black md:w-1/2">
            <input
              type="text"
              placeholder="example@company.com"
              className="block w-full rounded-md border-0 bg-white py-2 text-gray-900 placeholder:text-gray-400 md:py-5"
            />

            <button className="inline-flex h-10 w-12 items-center justify-center rounded-md bg-orange-500 text-white md:h-16 md:w-20">
              {" "}
              <Navigation />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
