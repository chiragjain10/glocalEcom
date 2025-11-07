import React from "react";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    text: "Best shopping experience I've had in years. The website is clean and easy to use, the quality of the products is top-notch, and the delivery was super fast!",
    name: "Anjali Sharma",
    role: "Happy Customer",
  },
  {
    text: "Absolutely loved the art pieces. They were even more beautiful in real life. I'll definitely be recommending this to my friends and family!",
    name: "Ravi Mehra",
    role: "Verified Buyer",
  },
  {
    text: "The customer service was very helpful. I had a few queries before buying, and they patiently answered everything. Great experience!",
    name: "Sanya Verma",
    role: "Art Collector",
  },
];

const TestimonialSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (

    <div className=" bg-gray-50">
    <section className=" max-w-7xl mx-auto py-16   bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-serif">
                                 What Our Customers Say
                        </h2>
                        <div className="w-32 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full shadow-lg" />

                    </div>
        
        <Slider {...settings} className="testimonial-slider">
          {testimonials.map((item, index) => (
            <div key={index} className="px-4 bg-gray-50">
              <div className="testimonial-card bg-white p-8 rounded-lg shadow-md h-full border-b-4 border-amber-500 transition-all duration-300 hover:shadow-lg">
                <FaQuoteLeft className="text-4xl mb-6 text-amber-500" />
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  "{item.text}"
                </p>
                <div className="mt-auto">
                  <h4 className="text-xl font-semibold text-amber-500">
                    {item.name}
                  </h4>
                  <span className="text-gray-500 text-sm">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
    </div>
  );
};

export default TestimonialSlider;