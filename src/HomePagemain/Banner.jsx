import React from 'react';
import Slider from 'react-slick';
import { FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import { GiIndiaGate, GiHand, GiJewelCrown } from 'react-icons/gi';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const settings = {
    dots: true,
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
    customPaging: () => (
      <div className="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-amber-400 transition-all duration-300"></div>
    ),
    appendDots: dots => (
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-2 sm:space-x-3">{dots}</ul>
      </div>
    ),
  };

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1609444074870-2860a9a613e3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "शाही हस्तशिल्प | Royal Artisan Legacy",
      subtitle: "Museum-grade collectibles handcrafted by 5th-generation master artisans from Jaipur, Varanasi & Mysore",
      highlight: "Certified Heritage • Limited Editions",
      buttonText: "Explore Masterpieces",
      icon: <GiHand className="text-amber-500 text-3xl sm:text-4xl" />,
      testimonial: {
        text: "These pieces belong in the collections of connoisseurs and royalty alike.",
        author: "— Dr. Vikram Rathore, Curator, National Museum"
      }
    },
    {
      img: "https://images.unsplash.com/photo-1539077982779-d62f6cd9e23a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNhbmN0aWZpZWQlMjBDb2xsZWN0aW9uc3xlbnwwfHwwfHx8MA%3D%3D",
      title: "दिव्य प्राणप्रतिष्ठा | Sanctified Collections",
      subtitle: "Temple-quality idols & puja essentials blessed by Vedic priests in Varanasi and Ujjain",
      highlight: "Ritually Consecrated • Panchdhatu Crafted",
      buttonText: "Discover Sacred Art",
      icon: <GiIndiaGate className="text-white text-3xl sm:text-4xl" />,
      testimonial: {
        text: "The spiritual energy in these pieces rivals that of ancient temple artifacts.",
        author: "— Shankaracharya Jyotishpeeth"
      }
    },
    {
      img: "https://images.unsplash.com/photo-1554583797-69a28298654c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "कोहिनूर वस्त्र | Regal Textiles",
      subtitle: "Heirloom-quality Banarasi silks & gold-zari brocades once woven exclusively for Maharajas",
      highlight: "22K Gold Zari • Patron's Collection",
      buttonText: "View Royal Fabrics",
      icon: <GiJewelCrown className="text-amber-500 text-3xl sm:text-4xl" />,
      testimonial: {
        text: "Each thread tells the story of India's textile aristocracy.",
        author: "— Lakshmi Kumari, Former Princess of Jaipur"
      }
    },
  ];

  return (
    <section className="relative w-[94%] max-w-[2000px] mx-auto mt-8 py-12 h-[90vh] sm:h-[95vh] lg:h-[80vh] overflow-hidden border border-gray-400 shadow-md rounded-lg">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] bg-cover opacity-5 z-0"></div>

      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <div className="h-[70vh] sm:h-[85vh] w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover object-center z-0"
              />
            </div>

            <div className="absolute inset-0 flex items-center px-4 sm:px-8 z-20">
              <div className="max-w-2xl bg-black/70 backdrop-blur-sm p-6 sm:p-10 rounded-lg border-l-4 border-amber-500 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-500/10 rounded-full border border-amber-500/30">
                    {slide.icon}
                  </div>
                  <p className="text-xs sm:text-sm text-amber-400 uppercase tracking-wide font-semibold">
                    {slide.highlight}
                  </p>
                </div>

                <h2 className="text-xl sm:text-3xl lg:text-5xl text-white font-bold mb-3 leading-tight">
                  {slide.title}
                </h2>

                <p className="text-sm sm:text-base text-white/90 mb-5">
                  {slide.subtitle}
                </p>

                <button className=" bg-gradient-to-r from-amber-400 to-amber-500  cursor-pointer hover:bg-amber-600 text-white px-5 py-2.5 rounded-md font-semibold text-sm sm:text-base flex items-center gap-2">
                  {slide.buttonText} <FaArrowRight className="text-sm" />
                </button>

                <div className="text-white/80 text-xs sm:text-sm italic mt-4">
                  <FaQuoteLeft className="inline mr-2 text-amber-400/70 text-base" />
                  {slide.testimonial.text}
                  <div className="mt-1 text-amber-300 font-medium">
                    {slide.testimonial.author}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 hidden md:block z-10">
              <div className="text-amber-400/20 text-6xl font-serif italic font-bold select-none">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
