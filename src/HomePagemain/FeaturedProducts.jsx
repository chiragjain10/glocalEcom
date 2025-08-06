import React, { useState } from 'react';
import Slider from 'react-slick';
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

  const products = [
    {
      id: 1,
      title: 'Handmade Pot',
      description: 'Handcrafted by Indian artisans',
      price: '₹899',
      rating: 4.8,
      image: 'https://cdn.pixabay.com/photo/2017/03/27/14/33/ancient-2179091_1280.jpg',
    },
    {
      id: 2,
      title: 'Decorative Plate',
      description: 'Painted with cultural motifs',
      price: '₹499',
      rating: 4.5,
      image: 'https://di2ponv0v5otw.cloudfront.net/posts/2024/10/07/67042fecf8ede7766a0d4b0c/m_670438882d829ae2f368b890.jpeg',
    },
    {
      id: 3,
      title: 'Terracotta Mug',
      description: 'Eco-friendly and elegant',
      price: '₹349',
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/I/71a+1jseHVL.jpg',
    },
    {
      id: 4,
      title: 'Artisan Vase',
      description: 'Traditional design and texture',
      price: '₹799',
      rating: 4.7,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXb2_K3vluQzr5AkNu263uZRnNrom71NtMg&s',
    },
  ];

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

    <div>
      <div className="product-card">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.title} className="best-seller-image" />
          <div className="icon-overlay">
            <Link to='/wishlist'>
              <FaHeart className="icon heart-icon text-rose-500" />
            </Link>
            <Link to='/cart'>
              <FaShoppingCart className="icon cart-icon text-amber-600" />
            </Link>


            <Link to={'/quickview'}>
              <FaEye className="icon eye-icon text-gray-700" />
            </Link>


          </div>
        </div>
        <div className="product-content">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <div className="product-footer">
            <p className="product-price">{product.price}</p>
            <div className="product-rating">
              <FaStar className="star-icon text-yellow-500" />
              <span>{product.rating}</span>
            </div>
          </div>
        </div>
      </div >
    </div >
  );

  return (

    <div className="slider-section bg-gary-50">
      {/* Header */}
      <div className="slider-top">
        <div className="slider-heading-row">
          <div className="slider-icon">
            <FaCrown className="icon-star text-white" />
          </div>
          <h2 className="slider-heading">Featured Products</h2>

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
