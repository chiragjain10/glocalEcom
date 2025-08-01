import React from 'react';
import Slider from 'react-slick';
import { FaArrowRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSlider = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  const slides = [
    {
      img: "https://media.istockphoto.com/id/1200452868/photo/religious-paintings-on-the-wall-of-sri-dalada-maligawa-or-the-temple-of-the-sacred-tooth.jpg?s=1024x1024&w=is&k=20&c=R5OAkMW_Xj8vg_HolMisHKzxQrNrwPBqCtgW17mfNgQ=",
      title: "Experience the Richness of Indian Art",
      subtitle: "Shop authentic cultural creations from artisans across India",
      highlight: "Unique. Traditional. Handmade."
    },
    {
      img: "https://media.istockphoto.com/id/177129641/photo/chinese-new-year-ornaments-traditional-dancing-dragon.jpg?s=1024x1024&w=is&k=20&c=W-Rqlsy0ifdsEKlW8ttNGHi7qibwDPWH2JPqB6xgVC8=",
      title: "Celebrate Tradition with Style",
      subtitle: "Handpicked heritage products for modern living",
      highlight: "Colors of Culture. Touch of Class."
    },
    {
      img: "https://media.istockphoto.com/id/483613330/photo/buddha-statue-candle-holder-for-fragrant-oils-beads.jpg?s=1024x1024&w=is&k=20&c=_7qIEDdmD7rPQRMNAeP1i8pCol31Aqvw0lK-d-bWgig=",
      title: "Find Peace in Artistic Expressions",
      subtitle: "Spiritual & decor elements to elevate your space",
      highlight: "Calm. Inspire. Decorate."
    },
  ];

  return (
    <section className="w-full h-screen overflow-hidden">
  <div className="w-full h-[80vh]">
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="relative w-full h-screen">
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover brightness-[.6]"
          />
          <div className="absolute inset-0 px-6 md:px-16 pb-14 py-10 flex flex-col justify-end text-white z-10">
            <p className="text-sm md:text-base font-semibold text-yellow-300 mb-1 tracking-wide uppercase">
              {slide.highlight}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow mb-2">
              {slide.title}
            </h2>
            <p className="text-md md:text-lg mb-5 max-w-xl drop-shadow">
              {slide.subtitle}
            </p>
            <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition duration-300 shadow-md w-fit">
              Shop Now <FaArrowRight />
            </button>
          </div>
        </div>
      ))}
    </Slider>
  </div>
</section>

  );
};

export default BannerSlider;
