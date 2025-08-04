import React from 'react';
import Slider from 'react-slick';
import { FaArrowRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
   cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    pauseOnFocus: false,
    pauseOnDotsHover: false 
  };

  const slides = [
    {
      img: "https://media.istockphoto.com/id/813581504/photo/manual-labor-and-art-artistic-in-india-mumba.jpg?s=2048x2048&w=is&k=20&c=LLXtVaqR8dtqOkYXBxrlb1Vup-GbBbRwSxsPAni5TFU=",
      title: "Experience the Richness of Indian Art",
      subtitle: "Discover authentic cultural creations handcrafted by skilled artisans from across India.",
      highlight: "Unique • Traditional • Handmade",
      buttonText: "Explore Collection"
    },
    {
      img: "https://media.istockphoto.com/id/609722026/vector/indian-god-rama-and-sita-for-dussehra-festival-celebration-in.jpg?s=2048x2048&w=is&k=20&c=gqYALaWNRDVm_ljPItmu0uKg-FdkX4hPp8KSoGaf8RU=",
      title: "Celebrate Tradition with Modern Style",
      subtitle: "Curated heritage products that blend seamlessly with contemporary living.",
      highlight: "Colors of Culture • Touch of Class",
      buttonText: "View Gallery"
    },
    {
      img: "https://media.istockphoto.com/id/2217828780/photo/statue-of-lord-brahma-at-wat-saman-rattanaram-thailand.jpg?s=2048x2048&w=is&k=20&c=CWyZr-Nlz4OpIzSZpp5YHMcnz1Vo1sxLEGBYGwgqVZw=",
      title: "Find Peace in Artistic Expressions",
      subtitle: "Spiritual decor elements that bring harmony to your surroundings.",
      highlight: "Calm • Inspire • Decorate",
      buttonText: "Discover More"
    },
  ];

  return (
    <section className="w-full relative pt-16 md:pt-14 ">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative outline-none">
            {/* Image container with responsive height */}
            <div className="h-[70vh] sm:h-[80vh] md:h-[100vh] w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-black/40 z-0"></div>
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/1920x1080?text=Banner+Image";
                }}
              />
            </div>

            {/* Content overlay with better mobile positioning */}
            <div className="absolute inset-0 flex items-center z-10 px-4 sm:px-6">
              <div className="container mx-auto mt-8 sm:mt-0"> {/* Added margin-top for mobile */}
                <div className="max-w-2xl bg-black/30 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-lg border border-amber-400/20">
                  <p className="text-xs sm:text-sm md:text-base font-medium text-amber-300 mb-2 tracking-widest">
                    {slide.highlight}
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2 sm:mb-3 text-white">
                    {slide.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 text-white/90 max-w-xl">
                    {slide.subtitle}
                  </p>
                  <button className="flex items-center cursor-pointer; gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-md text-xs sm:text-sm md:text-base font-semibold hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
                    {slide.buttonText} <FaArrowRight className="text-xs sm:text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;