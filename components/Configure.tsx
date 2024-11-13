const Configure = () => {
  return (
    <section className="container mx-auto py-14">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-wrap justify-between gap-10 lg:flex-nowrap">
          {" "}
          <div className="w-full">
            <h2 className="mb-4 text-4xl font-medium">Shop Inventory</h2>
            <div className="relative h-[300px] w-full rounded-xl bg-[url('https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/sxe13ie1wbmroc1wo8c2')] bg-cover bg-center p-10">
              <button className="absolute bottom-7 left-1/2 w-4/5 -translate-x-1/2 transform rounded-full bg-white py-3 font-bold hover:bg-gray-300 hover:text-white">
                Shop Now
              </button>
            </div>
          </div>
          <div className="w-full">
            <h2 className="mb-4 text-4xl font-medium">Configure Yours</h2>
            <div className="relative h-[300px] rounded-xl bg-[url('https://res.cloudinary.com/dcrvuwr7t/image/upload/f_auto,q_auto/v1/evlanding/za4e1b5yxgc6u9xy275i')] bg-cover bg-center p-10">
              <button className="absolute bottom-7 left-1/2 w-4/5 -translate-x-1/2 transform rounded-full bg-white py-3 font-bold hover:bg-gray-300 hover:text-white">
                Make It Yours
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Configure;
