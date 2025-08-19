import React, { useState, useEffect } from "react";

const OfferSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownTo = new Date().getTime() + 1000 * 60 * 60 * 24 * 3;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownTo - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 bg-gray-50 text-black font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Image Grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-xl">
          {/* Main Image */}
          <div className="relative col-span-1 row-span-2 group rounded-xl overflow-hidden border border-gray-200">
            <img
              src="https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg"
              alt="Handcrafted"
              loading="lazy"
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-md"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                Premium Handmade Collection
              </h3>
              <p className="text-sm sm:text-base text-amber-100 mb-2">
                Crafted with passion using ancient techniques
              </p>
              <span className="inline-block  text-white bg-amber-400 text-black px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm font-medium">
                Limited Stock Available
              </span>
            </div>
          </div>

          {/* Small Image 1 */}
          <div className="relative col-span-1 row-span-1 group rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src="https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg"
              alt="Handcrafted"
              loading="lazy"
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-md"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center">
              <span className="text-xs sm:text-sm font-semibold text-amber-300">
                Artisan's Touch
              </span>
            </div>
          </div>

          {/* Small Image 2 */}
          <div className="relative col-span-1 row-span-1 group rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src="https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg"
              alt="Handcrafted"
              loading="lazy"
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-md"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-center">
              <span className="text-xs sm:text-sm font-semibold text-amber-300">
                Unique Craftsmanship
              </span>
            </div>
          </div>
        </div>

        {/* Right: Countdown Section */}
        <div className="p-6 sm:p-8 flex flex-col justify-center items-center space-y-6 border border-amber-400/50 rounded-2xl bg-white backdrop-blur-sm text-gray-800">
          <div className="text-center space-y-3">
            <span className="text-amber-600 font-medium tracking-wide text-sm sm:text-base">
              FLASH SALE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Summer Collection
            </h2>
            <p className="text-gray-700 text-sm sm:text-base max-w-md">
              Don't miss our exclusive limited-time offer on premium handmade
              products. Every piece is crafted with care and attention to
              detail.
            </p>
          </div>

          <div className="w-full">
            <h3 className="text-base sm:text-lg font-semibold text-amber-600 text-center mb-4">
              Deal Ends In
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => {
                const value = [
                  timeLeft.days,
                  timeLeft.hours,
                  timeLeft.minutes,
                  timeLeft.seconds,
                ][idx];
                return (
                  <div
                    key={label}
                    className="bg-gray-100 p-2 sm:p-4 rounded-lg border border-gray-300"
                  >
                    <p className="text-xs text-gray-600 uppercase tracking-wider mb-1 sm:mb-2">
                      {label}
                    </p>
                    <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                      {String(value).padStart(2, "0")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center space-y-3 pt-2">
            <p className="text-sm text-gray-700">
              <span className="line-through text-gray-500 mr-2">
                ₹16,699.16
              </span>
              <span className="text-xl sm:text-2xl font-bold text-amber-600">
                ₹12,524.16
              </span>
              <span className="ml-2 text-green-600 text-xs sm:text-sm">
                (25% OFF)
              </span>
            </p>
            <button className="mt-2 px-5 text-white py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-md text-sm sm:text-base font-semibold hover:from-amber-500 hover:to-amber-600 transition-all shadow-md shadow-amber-400/20 hover:shadow-amber-400/30">
              Grab the Deal Now
            </button>
            <p className="text-xs text-gray-600">
              Only 12 items left at this price!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
