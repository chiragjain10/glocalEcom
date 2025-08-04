import React from "react";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    text: "Best shopping experience I’ve had in years. The website is clean and easy to use, the quality of the products is top-notch, and the delivery was super fast!",
    name: "Anjali Sharma",
    role: "Happy Customer",
  },
  {
    text: "Absolutely loved the art pieces. They were even more beautiful in real life. I’ll definitely be recommending this to my friends and family!",
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
    dots: true,
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

    <section className="testimonial-section p-4  bg-gray-50">
      <h2 className="testimonial-title text-center text-3xl  font-bold  ">What Our Customers Say</h2>
      <Slider {...settings} className="testimonial-slider ">
        {testimonials.map((item, index) => (
          <div key={index} className="testimonial-slide bg-gray-50">
            <div className="testimonial-card ">
              <FaQuoteLeft className="quote-icon" />

              <p className="review-text">"{item.text}"</p>
              <h4 className="reviewer-name text-amber-500">{item.name}</h4>
              <span className="reviewer-role">{item.role}</span>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  
  );
};

export default TestimonialSlider;
