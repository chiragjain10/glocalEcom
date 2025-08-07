// src/components/FeaturedProducts.jsx
import React, { useContext } from 'react';
import Slider from 'react-slick';
import { ProductContext } from '../HomePagemain/ProductContext';
import {
  FaStar,
  FaCrown,
  FaHeart,
  FaEye,
  FaShoppingCart,
  FaArrowRight,
} from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const { products } = useContext(ProductContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const ProductCard = ({ product }) => (
    <div className="slider-card relative">
      <div className="slider-image-wrapper">
       <img
  src={product.imgs?.[0]}
  alt={product.title}
  className="slider-image"
/>
        <div className="slider-icon-overlay">
          <FaHeart className="icon heart-icon" />
          <FaShoppingCart className="icon cart-icon" />
          <Link to={`/product/${product.id}`}>
            <FaEye className="icon eye-icon cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="slider-content">
        <h2 className="slider-title">{product.title}</h2>
        <p className="slider-description">{product.description}</p>
        <div className="slider-footer">
          <p className="slider-price">{product.price}</p>
          <div className="slider-rating">
            <FaStar className="star-icon" />
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="slider-section bg-[#F4F2E9]">
      {/* Header */}
      <div className="slider-top">
        <div className="slider-heading-row">
          <div className="slider-icon">
            <FaCrown className="icon-star text-white" />
          </div>
          <h2 className="slider-heading">Best Seller</h2>
        </div>
        <p className="slider-subtext">
          Discover the latest additions to our collection, carefully curated for your unique style.
        </p>
      </div>

      {/* Slider Section */}
      <div className="slider-wrapper">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="slider-slide">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-10">
        <button className="relative text-white overflow-hidden px-6 py-3 rounded-md flex items-center gap-2 font-semibold text-black 
          bg-gradient-to-r from-amber-400 to-amber-500 
          transition-all duration-500 ease-in-out 
          hover:from-yellow-400 hover:to-orange-500 
          hover:shadow-xl group">
          <span className="relative z-10">View All</span>
          <FaArrowRight className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
          <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-lg rounded-md"></span>
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
